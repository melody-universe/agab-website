import { crypto } from "@cloudflare/workers-types/experimental";
import {
  encodeBase32LowerCaseNoPadding,
  encodeHexLowerCase,
} from "@oslojs/encoding";
import { Session, sessions, User } from "../db/schema";
import { sha256 } from "@oslojs/crypto/sha2";
import { drizzle } from "drizzle-orm/d1";
import { Context } from "hono";

export function generateSessionToken(): string {
  const bytes = new Uint8Array(20);
  crypto.getRandomValues(bytes);
  const token = encodeBase32LowerCaseNoPadding(bytes);
  return token;
}

export async function createSession(
  c: Context<{ Bindings: Env }>,
  token: string,
  userId: number,
): Promise<Session> {
  const sessionId = encodeHexLowerCase(sha256(new TextEncoder().encode(token)));
  const session: Session = {
    id: sessionId,
    userId,
    expiresAt: new Date(Date.now() + 1000 * 60 * 60 * 24 * 30),
  };

  const db = drizzle(c.env.DB);
  await db.insert(sessions).values(session);

  return session;
}

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
