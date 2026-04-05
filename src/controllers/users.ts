import { Request, Response } from "express";
import { AuthRequest } from "../middleware/auth";
import { createUser, getUsers, updateUser } from "../services/userService";
import { requireAdmin } from "../middleware/auth";

export async function createUserHandler(req: AuthRequest, res: Response) {
  try {
    const user = await createUser(req.body);
    res.status(201).json(user);
  } catch (error: any) {
    res.status(400).json({ error: error.message || "Validation error" });
  }
}

export async function getUsersHandler(req: AuthRequest, res: Response) {
  try {
    const users = await getUsers();
    res.json(users);
  } catch (error: any) {
    res.status(500).json({ error: error.message });
  }
}

export async function updateUserHandler(req: AuthRequest, res: Response) {
  try {
    const { id } = req.params;
    const user = await updateUser(id, req.body);
    res.json(user);
  } catch (error: any) {
    if (error.code === "P2025") {
      return res.status(404).json({ error: "User not found" });
    }
    res.status(400).json({ error: error.message });
  }
}
