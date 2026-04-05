import { Textbox } from "../../components/Textbox";
import "./login.scss";

import { ComponentChild } from "preact";

export async function loader() {}

export type LoaderData = Awaited<ReturnType<typeof loader>>;

export function Page(): ComponentChild {
  return (
    <div class="card">
      <h1>Login</h1>
      <form>
        <Textbox placeholder="Username" type="text" />
        <Textbox placeholder="Password" type="password" />
        <div class="submit-row">
          <a tabIndex={0} href="./register">
            Register
          </a>
          <input type="submit" value="Go" />
        </div>
      </form>
    </div>
  );
}
