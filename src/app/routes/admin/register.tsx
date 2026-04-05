import { ComponentChild, InputHTMLAttributes } from "preact";
import { Card } from "../../components/Card";
import { Form } from "../../components/Form";
import { Textbox } from "../../components/Textbox";
import { useSignal } from "@preact/signals";
import { Context } from "hono";
import { drizzle } from "drizzle-orm/d1";
import { activationCodes } from "../../../db/schema";
import { gt } from "drizzle-orm";

export async function loader(c: Context<{ Bindings: Env }>) {
  const db = drizzle(c.env.DB);

  const codes = await db
    .select()
    .from(activationCodes)
    .where(gt(activationCodes.createdAt, new Date()))
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
