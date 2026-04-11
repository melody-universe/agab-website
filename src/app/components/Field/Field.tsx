import clsx from "clsx";
import styles from "./Field.module.scss";

import { ComponentChild, FieldsetHTMLAttributes, HTMLAttributes } from "preact";
import { Label, LabelProps } from "../Label";

export function FieldSet({
  children,
  className,
}: FieldSetProps): ComponentChild {
  return (
    <fieldset className={clsx(styles.fieldSet, className)}>{children}</fieldset>
  );
}

type FieldSetProps = Pick<FieldsetHTMLAttributes, "children" | "className">;

export function Field({ children, className }: FieldProps): ComponentChild {
  return <div className={clsx(styles.field, className)}>{children}</div>;
}

type FieldProps = Pick<HTMLAttributes, "children" | "className">;

export function FieldLabel({
  className,
  ...props
}: LabelProps): ComponentChild {
  return <Label className={clsx(styles.fieldLabel, className)} {...props} />;
}
