import "./reset.scss";
import "./global.scss";

import App from "./app/App";
import { hydrate } from "preact";

hydrate(<App />, document.getElementById("root")!);
