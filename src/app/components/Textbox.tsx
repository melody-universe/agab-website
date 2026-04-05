import "./Textbox.scss";

import { ComponentChild } from "preact";
import type { InputHTMLAttributes } from "preact";
import { useEffect, useRef } from "preact/hooks";

export function Textbox({
  autoFocus,
  error,
  type,
  ...props
}: TextboxProps): ComponentChild {
  const ref = useRef<HTMLInputElement>(null);
  useEffect(() => {
    if (autoFocus) {
      ref.current?.focus();
    }
  }, [autoFocus]);

  return (
    <div className="textbox-container">
      <input
        {...{ type, ...props }}
        className={`textbox${error ? " error" : ""}`}
        ref={ref}
      />
      {error && <p class="error">{error}</p>}
    </div>
  );
}

type TextboxProps = {
  type: "text" | "password";
  error: string | null;
} & Pick<
  InputHTMLAttributes,
  "tabIndex" | "placeholder" | "autoFocus" | "onInput"
>;
