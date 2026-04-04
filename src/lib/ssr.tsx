import { Context, MiddlewareHandler } from "hono";
import { CloudflareBindings } from "../server";
import type { JSX } from "preact";
import { prerender } from "preact-iso";
import { locationStub } from "preact-iso/prerender";

export function ssrWithLoader<TLoaderData extends object>(
  route: RouteModule<TLoaderData>,
): MiddlewareHandler<{ Bindings: CloudflareBindings }> {
  return async (context) => {
    const path = new URL(context.req.url).pathname;
    locationStub(path);

    const data: TLoaderData = await route.loader(context);

    const { html: content } = await prerender(<route.Page {...data} />);

    const response = await context.env.ASSETS.fetch(
      new URL("/index.html", context.req.url),
    );
    const view = await response.text();

    const html = view
      .replace(/<div id="root"><\/div>/, `<div id="root">${content}</div>`)
      .replace(
        "</head>",
        `<script>window.__INITIAL_DATA__ = ${JSON.stringify(data)}</script></head>`,
      );

    return context.html(html);
  };
}

export type RouteModule<TLoaderData> = {
  loader(
    context: Context<{ Bindings: CloudflareBindings }>,
  ): Promise<TLoaderData>;
  Page(props: TLoaderData): JSX.Element;
};
