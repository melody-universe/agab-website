import clsx from "clsx";
import styles from "./Card.module.scss";

import { ComponentChild, ComponentChildren, Signalish } from "preact";

export function Card({ className, children }: Props): ComponentChild {
  return (
    <div data-slot="card" className={clsx(styles.card, className)}>
      {children}
    </div>
  );
}

export function CardHeader({ className, children }: Props): ComponentChild {
  return (
    <div data-slot="card-header" className={clsx(styles.cardHeader, className)}>
      {children}
    </div>
  );
}

export function CardTitle({ className, children }: Props): ComponentChild {
  return (
    <div data-slot="card-title" className={clsx(styles.cardTitle, className)}>
      {children}
    </div>
  );
}

export function CardDescription({
  className,
  children,
}: Props): ComponentChild {
  return (
    <div
      data-slot="card-description"
      className={clsx(styles.cardDescription, className)}
    >
      {children}
    </div>
  );
}

export function CardAction({ className, children }: Props): ComponentChild {
  return (
    <div data-slot="card-action" className={clsx(styles.cardAction, className)}>
      {children}
    </div>
  );
}

export function CardContent({ className, children }: Props): ComponentChild {
  return (
    <div
      data-slot="card-content"
      className={clsx(styles.cardContent, className)}
    >
      {children}
    </div>
  );
}

export function CardFooter({ className, children }: Props): ComponentChild {
  return (
    <div data-slot="card-footer" className={clsx(styles.cardFooter, className)}>
      {children}
    </div>
  );
}

type Props = {
  className?: Signalish<string | undefined>;
  children?: ComponentChildren;
};
