import styles from "./register.module.scss";

import {
  ComponentChild,
  FormHTMLAttributes,
  InputHTMLAttributes,
} from "preact";
import {
  Card,
  CardAction,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "../../components/Card";
import { Form } from "../../components/Form";
import { Textbox } from "../../components/Textbox";
import { useSignal } from "@preact/signals";
import { Spinner } from "../../components/Spinner";
import { hc } from "hono/client";
import { Api } from "../../../api";
import { useLocation } from "preact-iso";
import { Role } from "../../../lib/getRole";
import { requireRole } from "../../../lib/requireRole";
import { CenteredLayout } from "../../components/CenteredLayout";
import { Link } from "../../components/Link";

export const path = "/admin/register";
export const middleware = requireRole(Role.Anonymous, {
  response: (c) => c.redirect("/admin"),
});

export function Page(): ComponentChild {
  const controller = useController();

  if (controller.kind === "loading") {
    return <Spinner />;
  }

  const { password, username, confirmPassword, onSubmit } = controller;

  return (
    <CenteredLayout>
      <Card className={styles.card}>
        <CardHeader>
          <CardTitle>Register</CardTitle>
          <CardDescription>
            If you are a band member, fill out the form below to start helping
            us manage the website.
          </CardDescription>
          <CardAction>
            <Link tabIndex={6} href="./login" variant="button">
              Login
            </Link>
          </CardAction>
        </CardHeader>
        <Form onSubmit={onSubmit}>
          <CardContent>
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
            <Textbox
              type="password"
              placeholder="Confirm password"
              tabIndex={4}
              {...confirmPassword}
            />
          </CardContent>
          <CardFooter>
            <input tabIndex={5} type="submit" value="Go" />
          </CardFooter>
        </Form>
      </Card>
    </CenteredLayout>
  );
}

function useController(): Controller {
  const location = useLocation();

  const isLoading = useSignal(false);

  const username = useSignal("");
  const usernameError = useSignal<null | string>(null);

  const password = useSignal("");
  const passwordError = useSignal<null | string>(null);

  const confirmPassword = useSignal("");
  const confirmPasswordError = useSignal<null | string>(null);

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
    confirmPassword: {
      onInput(event) {
        confirmPassword.value = event.currentTarget.value;
      },
      error: confirmPasswordError.value,
      value: confirmPassword.value,
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

      if (confirmPassword.value === password.value) {
        confirmPasswordError.value = null;
      } else {
        confirmPasswordError.value = "Must match password.";
        isValid = false;
      }

      if (isValid) {
        isLoading.value = true;
        const api = hc<Api>("/api");

        (async () => {
          const response = await api.register.$post(undefined, {
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
      confirmPassword: Input;
      onSubmit: FormHTMLAttributes["onSubmit"];
    }
  | { kind: "loading" };

type Input = Pick<InputHTMLAttributes, "onInput" | "value"> & {
  error: null | string;
};
