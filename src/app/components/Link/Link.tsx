import styles from "./Link.module.scss";

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
      className={clsx(styles.link, styles[variant], className)}
      href={href}
      {...(isExternal && { target: "_blank" })}
      {...props}
    >
      {children}
    </a>
  );
}

type LinkProps = { variant?: "default" | "button" } & Pick<
  AnchorHTMLAttributes,
  "children" | "className" | "href" | "tabIndex"
>;
