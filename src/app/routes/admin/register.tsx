import { ComponentChild, InputHTMLAttributes } from "preact";
import { Card } from "../../components/Card";
import { Form } from "../../components/Form";
import { Textbox } from "../../components/Textbox";
import { useSignal } from "@preact/signals";

export function loader() {}

export function Page(): ComponentChild {
  const { activationCode, password, username } = useController();

  return (
    <Card>
      <h1>Register</h1>
      <Form>
        <Textbox
          type="text"
          placeholder="Activation code"
          autoFocus
          tabIndex={1}
          {...activationCode}
        />
        <Textbox
          type="text"
          placeholder="Username"
          tabIndex={2}
          {...username}
        />
        <Textbox
          type="password"
          placeholder="Password"
          tabIndex={3}
          {...password}
        />
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

function useController(): Controller {
  const activationCode = useSignal("");
  const username = useSignal("");
  const password = useSignal("");
  const confirmPassword = useSignal("");

  return {
    activationCode: {
      onInput(event) {
        activationCode.value = event.currentTarget.value;
      },
    },
    username: {
      onInput(event) {
        username.value = event.currentTarget.value;
      },
    },
    password: {
      onInput(event) {
        password.value = event.currentTarget.value;
      },
    },
    confirmPassword: {
      onInput(event) {
        confirmPassword.value = event.currentTarget.value;
      },
    },
  };
}

type Controller = {
  activationCode: Pick<InputHTMLAttributes, "onInput">;
  username: Pick<InputHTMLAttributes, "onInput">;
  password: Pick<InputHTMLAttributes, "onInput">;
  confirmPassword: Pick<InputHTMLAttributes, "onInput">;
};
