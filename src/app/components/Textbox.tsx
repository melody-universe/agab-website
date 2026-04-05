import "./Textbox.scss";

import { ComponentChild } from "preact";
import type { InputHTMLAttributes } from "preact";
import { useEffect, useRef } from "preact/hooks";

export function Textbox({
  autoFocus,
  type,
  ...props
}: TextboxProps): ComponentChild {
  const ref = useRef<HTMLInputElement>(null);
  useEffect(() => {
    if (autoFocus) {
      ref.current?.focus();
    }
  }, [autoFocus]);

  return <input {...{ type, ...props }} className="textbox" ref={ref} />;
}

type TextboxProps = {
  type: "text" | "password";
} & Pick<InputHTMLAttributes, "tabIndex" | "placeholder" | "autoFocus">;
