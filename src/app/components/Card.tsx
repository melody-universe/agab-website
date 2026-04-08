import styles from "./Card.module.scss";

import { ComponentChild, ComponentChildren } from "preact";

export function Card({ children }: CardProps): ComponentChild {
  return <div className={styles.card}>{children}</div>;
}

type CardProps = { children?: ComponentChildren };
