import styles from "./Card.module.scss";

import { ComponentChild, ComponentChildren } from "preact";

export function Card({ children }: CardProps): ComponentChild {
  return (
    <div style={{ display: "flex", height: "100%" }}>
      <div className={styles.card}>{children}</div>
    </div>
  );
}

type CardProps = { children?: ComponentChildren };
