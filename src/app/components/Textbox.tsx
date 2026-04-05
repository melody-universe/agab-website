import "./Textbox.scss";

import { ComponentChild } from "preact";

export function Textbox({ placeholder, type }: TextboxProps): ComponentChild {
  return <input placeholder={placeholder} type={type} className="textbox" />;
}

type TextboxProps = { type: "text" | "password"; placeholder: string };
