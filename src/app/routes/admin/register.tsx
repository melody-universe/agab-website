import { ComponentChild } from "preact";
import { Card } from "../../components/Card";
import { Form } from "../../components/Form";
import { Textbox } from "../../components/Textbox";

export function loader() {}

export function Page(): ComponentChild {
  return (
    <Card>
      <h1>Register</h1>
      <Form>
        <Textbox
          type="text"
          placeholder="Activation code"
          autoFocus
          tabIndex={1}
        />
        <Textbox type="text" placeholder="Username" tabIndex={2} />
        <Textbox type="password" placeholder="Password" tabIndex={3} />
        <Textbox type="password" placeholder="Confirm password" tabIndex={4} />
        <div class="submit-row">
          <a tabIndex={6} href="./login">
            Login
          </a>
          <input tabIndex={5} type="submit" value="Go" />
        </div>
      </Form>
    </Card>
  );
}
