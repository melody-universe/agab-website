import "./Form.scss";

import { ComponentChild, FormHTMLAttributes } from "preact";

export function Form({ children, ...props }: FormProps): ComponentChild {
  return (
    <form className="form" {...props}>
      {children}
    </form>
  );
}

type FormProps = Pick<FormHTMLAttributes, "onSubmit" | "children">;
