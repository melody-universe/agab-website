import "./login.scss";

import { ComponentChild } from "preact";

export async function loader() {}

export type LoaderData = Awaited<ReturnType<typeof loader>>;

export function Page(): ComponentChild {
  return (
    <div class="card">
      <h1>Login</h1>
      <form>
        <input placeholder="Username" type="text" />
        <input placeholder="Password" type="password" />
        <input type="submit" value="Go" />
      </form>
    </div>
  );
}
