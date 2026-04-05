import "./Card.scss";

import { ComponentChild, ComponentChildren } from "preact";

export function Card({ children }: CardProps): ComponentChild {
  return <div className="card">{children}</div>;
}

type CardProps = { children?: ComponentChildren };
