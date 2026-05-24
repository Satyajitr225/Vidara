import express from "express";
import {
  protect,
  adminOnly,
  AuthRequest,
} from "../middleware/auth.middleware";

const router = express.Router();

router.get(
  "/dashboard",
  protect,
  adminOnly,
  (req: AuthRequest, res) => {
    res.json({
      success: true,
      message: "Welcome Admin",
      user: req.user,
    });
  }
);

export default router;