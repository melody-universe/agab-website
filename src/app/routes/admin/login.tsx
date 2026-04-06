import { useLocation } from "preact-iso";
import { hc } from "hono/client";
import { Card } from "../../components/Card";
import { Form } from "../../components/Form";
import { Textbox } from "../../components/Textbox";

import {
  ComponentChild,
  FormHTMLAttributes,
  InputHTMLAttributes,
} from "preact";
import { Api } from "../../../api";
import { useSignal } from "@preact/signals";
import { Spinner } from "../../components/Spinner";

export async function loader() {}

export type LoaderData = Awaited<ReturnType<typeof loader>>;

export function Page(): ComponentChild {
  const controller = useController();

  if (controller.kind === "loading") {
    return <Spinner />;
  }

  const { onSubmit, username, password } = controller;

  return (
    <Card>
      <h1>Login</h1>
      <Form onSubmit={onSubmit}>
        <Textbox
          autoFocus
          tabIndex={1}
          placeholder="Username"
          type="text"
          {...username}
        />
        <Textbox
          tabIndex={2}
          placeholder="Password"
          type="password"
          {...password}
        />
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

function useController(): Controller {
  const location = useLocation();

  const isLoading = useSignal(false);

  const username = useSignal("");
  const usernameError = useSignal<null | string>(null);

  const password = useSignal("");
  const passwordError = useSignal<null | string>(null);

  if (isLoading.value) {
    return { kind: "loading" };
  }

  return {
    kind: "ready",
    username: {
      onInput(event) {
        username.value = event.currentTarget.value;
      },
      error: usernameError.value,
      value: username.value,
    },
    password: {
      onInput(event) {
        password.value = event.currentTarget.value;
      },
      error: passwordError.value,
      value: password.value,
    },
    onSubmit(event) {
      event.preventDefault();
      let isValid = true;

      if (
        username.value.match(/^(?:[a-z0-9]+ ?)*[a-z0-9]$/i) &&
        username.value.length >= 1 &&
        username.value.length <= 20
      ) {
        usernameError.value = null;
      } else {
        usernameError.value = [
          "Only alphanumeric characters and spaces allowed.",
          "Cannot have leading or trailing spaces.",
          "Cannot have more than one consecutive space.",
          "Must be between one and twenty characters.",
        ].join(" ");
        isValid = false;
      }

      if (password.value.length >= 6) {
        passwordError.value = null;
      } else {
        passwordError.value = "Must be at least 6 characters.";
        isValid = false;
      }

      if (isValid) {
        isLoading.value = true;
        const api = hc<Api>("/api");

        (async () => {
          const response = await api.login.$post(undefined, {
            init: {
              body: JSON.stringify({ username, password }),
            },
          });
          const result = await response.json();

          if (result.isSuccess) {
            location.route("/admin");
          } else {
            isLoading.value = false;
          }
        })();
      }
    },
  };
}

type Controller =
  | {
      kind: "ready";
      username: Input;
      password: Input;
      onSubmit: FormHTMLAttributes["onSubmit"];
    }
  | { kind: "loading" };

type Input = Pick<InputHTMLAttributes, "onInput" | "value"> & {
  error: null | string;
};
