import { PrismaClient } from "@prisma/client";
import bcrypt from "bcryptjs";
import { createUserSchema, updateUserSchema } from "../utils/validation";
import { z } from "zod";

const prisma = new PrismaClient();

export interface CreateUserPayload {
  email: string;
  password: string;
  roleId: string;
}

export interface UpdateUserPayload {
  roleId?: string;
  isActive?: boolean;
}

export async function createUser(payload: CreateUserPayload) {
  const validated = createUserSchema.parse(payload);
  const hashedPassword = await bcrypt.hash(validated.password, 10);

  const user = await prisma.user.create({
    data: {
      email: validated.email,
      passwordHash: hashedPassword,
      roleId: validated.roleId,
    },
    include: { role: true },
  });

  return user;
}

export async function getUsers() {
  return prisma.user.findMany({
    include: { role: true },
  });
}

export async function updateUser(id: string, payload: UpdateUserPayload) {
  const validated = updateUserSchema.parse(payload);
  return prisma.user.update({
    where: { id },
    data: validated,
    include: { role: true },
  });
}

export async function getUserById(id: string) {
  return prisma.user.findUnique({
    where: { id },
    include: { role: true },
  });
}
