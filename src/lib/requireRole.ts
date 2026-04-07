import { Context, MiddlewareHandler } from "hono";
import { StatusCode } from "hono/utils/http-status";
import { Role, getRole } from "./getRole";

export function requireRole(
  requiredRole: Role,
  options?: Partial<RequireRoleOptions>,
): MiddlewareHandler<{ Bindings: Env }> {
  return async (c, next) => {
    const currentRole = await getRole(c);

    if (currentRole !== requiredRole) {
      c.status(options?.statusCode ?? 403);
      return options?.response?.(c) ?? c.newResponse(null);
    }

    await next();
  };
}

type RequireRoleOptions = {
  statusCode: StatusCode;
  response(c: Context<{ Bindings: Env }>): Response;
};
