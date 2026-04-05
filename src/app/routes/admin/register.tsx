import { ComponentChild } from "preact";
import { Card } from "../../components/Card";

export function loader() {}

export function Page(): ComponentChild {
  return (
    <Card>
      <h1>Register</h1>
      <form></form>
    </Card>
  );
}
