import "./admin.scss";

import { Context } from "hono";
import { ComponentChild } from "preact";
import { Card } from "../../components/Card";
import { getUsers } from "../../../api/users";
import { Spinner } from "../../components/Spinner";
import { useSignal, useSignalEffect } from "@preact/signals";
import { hc } from "hono/client";
import { Api } from "../../../api";
import { useCallback } from "preact/hooks";
import { useLocation } from "preact-iso";

export async function loader(c: Context<{ Bindings: Env }>) {
  return { users: await getUsers(c) };
}

type LoaderData = Partial<Awaited<ReturnType<typeof loader>>>;

export function Page(data: LoaderData): ComponentChild {
  const controller = useController(data);

  if (controller.kind === "loading") {
    return <Spinner />;
  }

  return (
    <Card>
      <h1>Admin</h1>
      <div className="contents">
        <p>Users:</p>
        <ul>
          {controller.users.map((username) => (
            <li key={username}>{username}</li>
          ))}
        </ul>
      </div>
      <button onClick={() => controller.logout()}>Logout</button>
    </Card>
  );
}

function useController(data: LoaderData): Controller {
  const location = useLocation();
  const isLoggingOut = useSignal(false);
  const users = useSignal(data.users ?? null);

  useSignalEffect(() => {
    if (users.value === null) {
      (async () => {
        const api = hc<Api>("/api");
        const response = await api.users.$get();
        users.value = await response.json();
      })();
    }
  });

  const logout = useCallback(() => {
    isLoggingOut.value = true;

    (async () => {
      const api = hc<Api>("/api");
      await api.logout.$post();
      location.route("/");
    })();
  }, [isLoggingOut, location]);

  return !isLoggingOut.value && users.value
    ? { kind: "ready", users: users.value, logout }
    : { kind: "loading" };
}

type Controller =
  | { kind: "loading" }
  | { kind: "ready"; users: string[]; logout(): void };
