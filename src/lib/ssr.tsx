import { MiddlewareHandler } from "hono";
import { prerender } from "preact-iso";
import { locationStub, PrerenderResult } from "preact-iso/prerender";
import { Route, InitialData } from "../route";
import App from "../app/App";

export function ssr<TLoaderData>(
  route: Route<TLoaderData>,
): MiddlewareHandler<{ Bindings: Env }> {
  return async (context) => {
    const path = new URL(context.req.url).pathname;
    locationStub(path);

    let html: string;
    if (route.loader) {
      const data = await route.loader(context);
      const initialData: InitialData<typeof route> = {
        path: route.path,
        data,
      };

      const result = await prerender(<App initialData={initialData} />);

      html = await wrapWithHtmlTemplate(result);

      html = html.replace(
        "</head>",
        `<script>window.__INITIAL_DATA__=${JSON.stringify(
          initialData,
        )}</script></head>`,
      );
    } else {
      const result = await prerender(<App />);

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
