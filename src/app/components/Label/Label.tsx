import clsx from "clsx";
import styles from "./Label.module.scss";

import { ComponentChild, LabelHTMLAttributes } from "preact";

export function Label({ className, ...props }: LabelProps): ComponentChild {
  return <label className={clsx(styles.label, className)} {...props} />;
}

export type LabelProps = Pick<
  LabelHTMLAttributes,
  "children" | "className" | "htmlFor"
>;
