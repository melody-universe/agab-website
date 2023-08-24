import { Eta } from "eta";
import { fileURLToPath } from "url";
import ReactDOMServer from "react-dom/server";
import { dangerouslySkipEscape } from "vite-plugin-ssr/server";
import { PageContext } from "./types";

export const passToClient = ["documentProps", "pageProps"];

const eta = new Eta({ views: fileURLToPath(new URL(".", import.meta.url)) });
export const render = ({ exports, Page, pageProps }: PageContext) => ({
  documentHtml: dangerouslySkipEscape(
    eta.render("./index", {
      contents: ReactDOMServer.renderToString(<Page {...pageProps} />),
      title: exports.title ?? "AGAB",
    })
  ),
  pageContext: {
    exports,
  },
});
