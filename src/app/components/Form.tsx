import "./Form.scss";

import { ComponentChild, ComponentChildren } from "preact";

export function Form({ children }: FormProps): ComponentChild {
  return <form className="form">{children}</form>;
}

type FormProps = {
  children?: ComponentChildren;
};
