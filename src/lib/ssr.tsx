import { MiddlewareHandler } from "hono";
import { prerender } from "preact-iso";
import { locationStub, PrerenderResult } from "preact-iso/prerender";
import { Route, InitialData } from "../route";

export function ssr<TLoaderData>(
  route: Route<TLoaderData>,
): MiddlewareHandler<{ Bindings: Env }> {
  return async (context) => {
    const path = new URL(context.req.url).pathname;
    locationStub(path);

    let html: string;
    if (route.loader) {
      const data = await route.loader(context);

      const result = await prerender(<route.Page data={data} />);

      html = await wrapWithHtmlTemplate(result);

      html = html.replace(
        "</head>",
        `<script>window.__INITIAL_DATA__=${JSON.stringify({
          path: route.path,
          data,
        } satisfies InitialData<typeof route>)}</script></head>`,
      );
    } else {
      const result = await prerender(<route.Page />);

      html = await wrapWithHtmlTemplate(result);
    }

    return context.html(html);

    async function wrapWithHtmlTemplate(prerenderResult: PrerenderResult) {
      const response = await context.env.ASSETS.fetch(
        new URL("/index.html", context.req.url),
      );
      const view = await response.text();

      return view.replace(
        /<div id="root"><\/div>/,
        `<div id="root">${prerenderResult.html}</div>`,
      );
    }
  };
}
