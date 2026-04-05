import "./Textbox.scss";

import { ComponentChild } from "preact";
import type { InputHTMLAttributes } from "preact";

export function Textbox({ type, ...props }: TextboxProps): ComponentChild {
  return <input {...{ type, ...props }} className="textbox" />;
}

type TextboxProps = {
  type: "text" | "password";
} & Pick<InputHTMLAttributes, "tabIndex" | "placeholder" | "autoFocus">;
