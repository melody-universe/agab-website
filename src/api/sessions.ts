import { crypto } from "@cloudflare/workers-types/experimental";
import { encodeBase32LowerCaseNoPadding } from "@oslojs/encoding";
import { Session, User } from "../db/schema";

export function generateSessionToken(): string {
  const bytes = new Uint8Array(20);
  crypto.getRandomValues(bytes);
  const token = encodeBase32LowerCaseNoPadding(bytes);
  return token;
}

export async function createSession(
  token: string,
  userId: number,
): Promise<Session> {}

export async function validateSessionToken(
  token: string,
): Promise<SessionValidationResult> {}

export async function invalidateSession(sessionId: string): Promise<void> {}

type SessionValidationResult =
  | {
      isSuccess: true;
      session: Session;
      user: User;
    }
  | { isSuccess: false };
