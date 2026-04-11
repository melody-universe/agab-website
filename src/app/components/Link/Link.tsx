import styles from "../Button/Button.module.scss";

import clsx from "clsx";
import { AnchorHTMLAttributes, ComponentChild } from "preact";
import { useMemo } from "preact/hooks";

export function Link({
  className,
  href,
  children,
  variant = "default",
  ...props
}: LinkProps): ComponentChild {
  const isExternal = useMemo(
    () => href && !/^[.]/.test(href.toString()),
    [href],
  );

  return (
    <a
      className={clsx(styles.button, ...classesByVariant[variant], className)}
      href={href}
      {...(isExternal && { target: "_blank" })}
      {...props}
    >
      {children}
    </a>
  );
}

type LinkProps = { variant?: "default" | "outline" | "button" } & Pick<
  AnchorHTMLAttributes,
  "children" | "className" | "href" | "tabIndex"
>;

const classesByVariant: {
  [Variant in Required<LinkProps>["variant"]]: string[];
} = {
  button: [styles.variantDefault, styles.sizeDefault],
  outline: [styles.variantOutline, styles.sizeDefault],
  default: [styles.variantLink],
};
