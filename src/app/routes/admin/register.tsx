import {
  ComponentChild,
  FormHTMLAttributes,
  InputHTMLAttributes,
} from "preact";
import { Card } from "../../components/Card";
import { Form } from "../../components/Form";
import { Textbox } from "../../components/Textbox";
import { useSignal } from "@preact/signals";
import { Context } from "hono";
import { drizzle } from "drizzle-orm/d1";
import { activationCodes } from "../../../db/schema";
import { gt } from "drizzle-orm";
import { Spinner } from "../../components/Spinner";
import { hc } from "hono/client";
import { Api } from "../../../api";

export async function loader(c: Context<{ Bindings: Env }>) {
  const db = drizzle(c.env.DB);

  const codes = await db
    .select()
    .from(activationCodes)
    .where(
      gt(
        activationCodes.createdAt,
        new Date(new Date().getTime() - 1000 * 60 * 60 * 24),
      ),
    )
    .limit(1);

  if (codes.length === 0) {
    await db
      .insert(activationCodes)
      .values({ value: generateActivationCode() });
  }

  function generateActivationCode(): string {
    const alphabet = "abcdefghijklmnopqrstuvwxyz";
    const numbers = "0123456789";
    const allCharacters = `${alphabet}${alphabet.toUpperCase()}${numbers}`;

    let code = "";
    for (let i = 0; i < 6; i++) {
      code += allCharacters[Math.floor(Math.random() * allCharacters.length)];
    }

    return code;
  }
}

export function Page(): ComponentChild {
  const controller = useController();

  if (controller.kind === "loading") {
    return <Spinner />;
  }

  const { activationCode, password, username, confirmPassword, onSubmit } =
    controller;

  return (
    <Card>
      <h1>Register</h1>
      <Form onSubmit={onSubmit}>
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
        <Textbox
          type="password"
          placeholder="Confirm password"
          tabIndex={4}
          {...confirmPassword}
        />

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
  const isLoading = useSignal(false);

  const activationCode = useSignal("");
  const activationCodeError = useSignal<null | string>(null);

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
    activationCode: {
      onInput(event) {
        activationCode.value = event.currentTarget.value;
      },
      error: activationCodeError.value,
      value: activationCode.value,
    },
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

      if (activationCode.value.length > 0) {
        activationCodeError.value = null;
      } else {
        activationCodeError.value = "Required.";
        isValid = false;
      }

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
          await api.register.$post(undefined, {
            init: {
              body: JSON.stringify({ activationCode, username, password }),
            },
          });
          isLoading.value = false;
        })();
      }
    },
  };
}

type Controller =
  | {
      kind: "ready";
      activationCode: Input;
      username: Input;
      password: Input;
      confirmPassword: Input;
      onSubmit: FormHTMLAttributes["onSubmit"];
    }
  | { kind: "loading" };

type Input = Pick<InputHTMLAttributes, "onInput" | "value"> & {
  error: null | string;
};
