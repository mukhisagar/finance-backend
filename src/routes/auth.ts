import { Router } from "express";
import { login } from "../services/authService";

const router = Router();

router.post("/login", async (req, res) => {
  try {
    const result = await login(req.body);
    res.json(result);
  } catch (error: any) {
    res.status(401).json({ error: error.message });
  }
});

export default router;
