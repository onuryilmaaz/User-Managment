import express from "express";
import upload from "../config/upload.js";
import {
  getMe,
  updateProfile,
  getUserList,
  deleteUser,
  toggleUserStatus,
  changeUserRole,
  promoteToModerator,
  demoteFromModerator,
} from "../controllers/userController.js";
import { protect } from "../middleware/protect.js";
import { authorizeRoles } from "../middleware/authorizeRoles.js";
import { changePassword } from "../controllers/userController.js";

const router = express.Router();

// Kullanıcı profil işlemleri
router.get("/me", protect, getMe);
router.put("/update-profile", protect, updateProfile);

// Resim Upload
router.post("/upload-image", upload.single("image"), (req, res) => {
  if (!req.file) {
    return res.status(400).json({ message: "No file uploaded" });
  }
  const imageUrl = `${req.protocol}://${req.get("host")}/uploads/${
    req.file.filename
  }`;
  res.status(200).json({ imageUrl });
});

// Admin ve Moderatör işlemleri
router.get("/list", protect, authorizeRoles("Admin", "Moderator"), getUserList);
router.delete(
  "/delete/:id",
  protect,
  authorizeRoles("Admin", "Moderator"),
  deleteUser
);
router.patch(
  "/toggle-status/:id",
  protect,
  authorizeRoles("Admin", "Moderator"),
  toggleUserStatus
);

// Sadece Admin işlemleri
router.patch(
  "/change-role/:id",
  protect,
  authorizeRoles("Admin"),
  changeUserRole
);
router.patch(
  "/promote-to-moderator/:id",
  protect,
  authorizeRoles("Admin"),
  promoteToModerator
);
router.patch(
  "/demote-from-moderator/:id",
  protect,
  authorizeRoles("Admin"),
  demoteFromModerator
);

// Şifre değiştirme
router.put("/change-password", protect, changePassword);

export default router;
