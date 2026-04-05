import { Context } from "hono";

export async function register(c: Context<{ Bindings: Env }>): Promise<void> {
  const { username } = await c.req.json<RegisterPayload>();

  console.log(`${username} attempted to register.`);

  await new Promise<void>((resolve) => {
    setTimeout(() => resolve(), 2000);
  });
}

export type RegisterPayload = {
  activationCode: string;
  username: string;
  password: string;
};
