import express from "express";
import { signup, login } from "../controllers/auth.controller";

const router = express.Router();

router.post("/signup", signup);
router.post("/login", login);

router.get("/test", (req, res) => {
  res.json({
    success: true,
    message: "Auth route working",
  });
});

export default router;