import jwt from "jsonwebtoken";
import bcrypt from "bcryptjs";
import { PrismaClient } from "@prisma/client";
import { loginSchema } from "../utils/validation";
import { JWT_SECRET } from "../utils/config";
import { z } from "zod";

const prisma = new PrismaClient();

export interface LoginPayload {
  email: string;
  password: string;
}

export async function login(payload: LoginPayload) {
  const validated = loginSchema.parse(payload);
  const user = await prisma.user.findUnique({
    where: { email: validated.email },
    include: { role: true },
  });

  if (
    !user ||
    !user.isActive ||
    !(await bcrypt.compare(validated.password, user.passwordHash))
  ) {
    throw new Error("Invalid credentials");
  }

  const token = jwt.sign(
    { userId: user.id, role: user.role.name },
    JWT_SECRET,
    { expiresIn: "24h" },
  );

  return {
    token,
    user: { id: user.id, email: user.email, role: user.role.name },
  };
}

export function verifyToken(token: string) {
  try {
    return jwt.verify(token, JWT_SECRET) as { userId: string; role: string };
  } catch {
    throw new Error("Invalid token");
  }
}
