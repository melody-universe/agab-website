import { ComponentChild } from "preact";

export async function loader(): Promise<undefined> {}

export function Page(): ComponentChild {
  return "Admin!";
}
