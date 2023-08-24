import { FunctionComponent } from "react";

export type PageContext = {
  exports: { title?: string };
  isHydration: boolean;
  Page: FunctionComponent;
  pageProps: any;
};
