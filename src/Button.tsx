import {
  FunctionComponent,
  HTMLAttributeAnchorTarget,
  PropsWithChildren,
} from "react";

const Button: FunctionComponent<
  PropsWithChildren & {
    href: string;
    target?: HTMLAttributeAnchorTarget;
  }
> = ({ href, target, children }) => (
  <a href={href} target={target}>
    <button>{children}</button>
  </a>
);
export default Button;
