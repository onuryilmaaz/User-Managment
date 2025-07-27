import express from "express";
import upload from "../config/upload.js";
import {
  getMe,
  updateProfile,
  getUserList,
  deleteUser,
  toggleUserStatus,
  changeUserRole,
  changePassword,
} from "../controllers/userController.js";
import { protect } from "../middleware/protect.js";
import { authorizeRoles } from "../middleware/authorizeRoles.js";

const router = express.Router();

router.get("/me", protect, getMe);
router.put("/update-profile", protect, updateProfile);
router.post("/upload-image", upload.single("image"), (req, res) => {
  if (!req.file) {
    return res.status(400).json({ message: "No file uploaded" });
  }
  const imageUrl = `${req.protocol}://${req.get("host")}/uploads/${
    req.file.filename
  }`;
  res.status(200).json({ imageUrl });
});

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

router.patch(
  "/change-role/:id",
  protect,
  authorizeRoles("Admin"),
  changeUserRole
);

router.put("/change-password", protect, changePassword);

export default router;
