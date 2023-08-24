import { Eta } from "eta";
import ReactDOMServer from "react-dom/server";
import { dangerouslySkipEscape } from "vite-plugin-ssr/server";
import template from "./index.eta?raw";
import { PageContext } from "./types";

export const passToClient = ["documentProps", "pageProps"];

const eta = new Eta();
export const render = ({ exports, Page, pageProps }: PageContext) => ({
  documentHtml: dangerouslySkipEscape(
    eta.renderString(template, {
      contents: ReactDOMServer.renderToString(<Page {...pageProps} />),
      title: exports.title ?? "AGAB",
    })
  ),
  pageContext: {
    exports,
  },
});
