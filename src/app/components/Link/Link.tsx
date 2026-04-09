import style from "./Link.module.scss";

import clsx from "clsx";
import { AnchorHTMLAttributes, ComponentChild } from "preact";
import { useMemo } from "preact/hooks";

export function Link({
  className,
  href,
  children,
  ...props
}: LinkProps): ComponentChild {
  const isExternal = useMemo(
    () => href && !/^[.]/.test(href.toString()),
    [href],
  );

  return (
    <a
      className={clsx(style.link, className)}
      href={href}
      {...(isExternal && { target: "_blank" })}
      {...props}
    >
      {children}
    </a>
  );
}

type LinkProps = Pick<
  AnchorHTMLAttributes,
  "children" | "className" | "href" | "tabIndex"
>;
