import express from "express";
import {
  registerUser,
  loginUser,
  refreshToken,
  logoutUser,
  forgotPassword,
  resetPassword,
  sendVerificationEmail,
  verifyEmail,
  verifyCode,
  resendVerificationCode,
  googleAuthCallback,
} from "../controllers/authController.js";
import { protect } from "../middleware/protect.js";
import passport from "passport";

const router = express.Router();

// Kimlik doğrulama işlemleri
router.post("/register", registerUser);
router.post("/login", loginUser);
router.post("/logout", logoutUser);

// Şifre işlemleri
router.post("/forgot-password", forgotPassword);
router.post("/reset-password/:token", resetPassword);
router.post("/refresh", refreshToken);

// E-posta doğrulama
router.post("/send-verify-email", protect, sendVerificationEmail);
router.get("/verify-email/:token", verifyEmail);

// 📌 Yeni doğrulama kodu rotaları
router.post("/verify-code", verifyCode);
router.post("/resend-code", resendVerificationCode);



// Google OAuth
router.get(
  "/google",
  passport.authenticate("google", { scope: ["profile", "email"] })
);
router.get(
  "/google/callback",
  passport.authenticate("google", { session: false }),
  googleAuthCallback
);

export default router;
