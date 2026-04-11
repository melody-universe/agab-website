import clsx from "clsx";
import styles from "./Label.module.scss";

import { ComponentChild, LabelHTMLAttributes } from "preact";

export function Label({ children, className }: LabelProps): ComponentChild {
  return <label className={clsx(styles.label, className)}>{children}</label>;
}

type LabelProps = Pick<LabelHTMLAttributes, "children" | "className">;
