import { renderToString } from "react-dom/server";
import { dangerouslySkipEscape } from "vite-plugin-ssr/server";
import { PageContext } from "./types";

export const passToClient = ["documentProps", "pageProps"];

export const render = ({ Page, pageProps }: PageContext) => ({
  documentHtml: dangerouslySkipEscape(
    `<!DOCTYPE html>${renderToString(
      <html lang="en">
        <head>
          <meta charSet="UTF-8" />
          <link rel="icon" type="image/svg+xml" href="/agab.svg" />
          <meta
            name="viewport"
            content="width=device-width, initial-scale=1.0"
          />
          <title>AGAB</title>
        </head>
        <body>
          <div id="root">
            <Page {...pageProps} />
          </div>
        </body>
      </html>
    )}`
  ),
});
