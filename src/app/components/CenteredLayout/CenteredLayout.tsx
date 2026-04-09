import styles from "./CenteredLayout.module.scss";
import { ComponentChild, ComponentChildren } from "preact";

export function CenteredLayout({
  children,
}: CenteredLayoutProps): ComponentChild {
  return <div className={styles.container}>{children}</div>;
}

type CenteredLayoutProps = {
  children?: ComponentChildren;
};
