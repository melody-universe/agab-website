import { Session, User } from "../db/schema";

export function generateSessionToken(): string {}

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
