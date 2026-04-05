import { Card } from "../../components/Card";
import { Form } from "../../components/Form";
import { Textbox } from "../../components/Textbox";

import { ComponentChild } from "preact";

export async function loader() {}

export type LoaderData = Awaited<ReturnType<typeof loader>>;

export function Page(): ComponentChild {
  return (
    <Card>
      <h1>Login</h1>
      <Form>
        <Textbox autoFocus tabIndex={1} placeholder="Username" type="text" />
        <Textbox tabIndex={2} placeholder="Password" type="password" />
        <div class="submit-row">
          <a tabIndex={4} href="./register">
            Register
          </a>
          <input tabIndex={3} type="submit" value="Go" />
        </div>
      </Form>
    </Card>
  );
}
