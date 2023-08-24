import React from "react";
import ReactDOM from "react-dom/client";
import { PageContext } from "./types";
import "./global.css";
import "./setViewHeight";

export const clientRouting = true;

let root: ReactDOM.Root;
export const render = ({
  exports,
  isHydration,
  Page,
  pageProps,
}: PageContext) => {
  const container = document.getElementById("root")!;
  const page = (
    <React.StrictMode>
      <Page {...pageProps} />
    </React.StrictMode>
  );
  if (isHydration) {
    root = ReactDOM.hydrateRoot(container, page);
  } else {
    if (!root) {
      root = ReactDOM.createRoot(container);
    }
    root.render(page);
  }
  document.title = exports.title ?? "AGAB";
};
