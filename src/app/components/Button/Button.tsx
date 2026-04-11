import clsx from "clsx";
import styles from "./Button.module.scss";

import {
  ButtonHTMLAttributes,
  ComponentChild,
  HTMLAttributes,
  InputHTMLAttributes,
} from "preact";

export function Button({
  className,
  size,
  variant,
  ...props
}: ButtonProps): ComponentChild {
  const { tabIndex } = props;
  const baseProps = {
    className: clsx(
      styles.button,
      styles[`variant-${variant ?? "default"}`],
      styles[`size-${size ?? "default"}`],
      className,
    ),
    tabIndex,
  } as const;

  switch (props.element) {
    case "button":
      return <button {...baseProps}>{props.children}</button>;
    case "submit":
      return <input type="submit" value={props.value} {...baseProps} />;
  }
}

type ButtonProps = Pick<HTMLAttributes, "className" | "tabIndex"> &
  (
    | ({ element?: "button" } & Pick<ButtonHTMLAttributes, "children">)
    | ({ element: "submit" } & Pick<InputHTMLAttributes, "value">)
  ) & { variant?: "default" | "link"; size?: "default" };
