import { crypto } from "@cloudflare/workers-types/experimental";
import {
  encodeBase32LowerCaseNoPadding,
  encodeHexLowerCase,
} from "@oslojs/encoding";
import { Session, sessions, User, users } from "../db/schema";
import { sha256 } from "@oslojs/crypto/sha2";
import { drizzle } from "drizzle-orm/d1";
import { Context } from "hono";
import { eq } from "drizzle-orm";

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
  c: Context<{ Bindings: Env }>,
  token: string,
): Promise<SessionValidationResult> {
  const db = drizzle(c.env.DB);

  const sessionId = encodeHexLowerCase(sha256(new TextEncoder().encode(token)));
  const result = await db
    .select({ user: users, session: sessions })
    .from(sessions)
    .innerJoin(users, eq(sessions.userId, users.id))
    .where(eq(sessions.id, sessionId));

  if (result.length === 0) {
    return { isSuccess: false };
  }

  const { session, user } = result[0];
  if (Date.now() >= session.expiresAt.getTime()) {
    await db.delete(sessions).where(eq(sessions.id, sessionId));
    return { isSuccess: false };
  }

  if (Date.now() >= session.expiresAt.getTime() - 1000 * 60 * 60 * 24 * 15) {
    session.expiresAt = new Date(Date.now() + 1000 * 60 * 60 * 24 * 30);
    await db
      .update(sessions)
      .set({ expiresAt: session.expiresAt })
      .where(eq(sessions.id, session.id));
  }

  return { isSuccess: true, session, user };
}

export async function invalidateSession(
  c: Context<{ Bindings: Env }>,
  sessionId: string,
): Promise<void> {
  const db = drizzle(c.env.DB);
  await db.delete(sessions).where(eq(sessions.id, sessionId));
}

type SessionValidationResult =
  | {
      isSuccess: true;
      session: Session;
      user: User;
    }
  | { isSuccess: false };
