import express from "express";
import {
  registerUser,
  loginUser,
  refreshToken,
  logoutUser,
  forgotPasswordWithCode,
  resetPasswordWithCode,
  verifyCode,
  resendVerificationCode,
  googleAuthCallback,
} from "../controllers/authController.js";
import passport from "passport";

const router = express.Router();

router.post("/register", registerUser);
router.post("/login", loginUser);
router.post("/logout", logoutUser);
router.post("/refresh", refreshToken);
router.post("/verify-code", verifyCode);
router.post("/resend-code", resendVerificationCode);
router.post("/forgot-password", forgotPasswordWithCode);
router.post("/reset-password", resetPasswordWithCode);
router.get(
  "/google",
  passport.authenticate("google", {
    scope: ["profile", "email"],
    prompt: "select_account",
  })
);
router.get(
  "/google/callback",
  passport.authenticate("google", { session: false }),
  googleAuthCallback
);

export default router;
