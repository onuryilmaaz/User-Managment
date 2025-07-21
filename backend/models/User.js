import mongoose from "mongoose";

const userSchema = new mongoose.Schema(
  {
    username: {
      type: String,
      unique: true,
      sparse: true,
      minlength: 3,
      maxlength: 30,
    },
    name: {
      type: String,
      required: true,
      maxlength: 50,
    },
    surname: {
      type: String,
      maxlength: 50,
    },
    email: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
      trim: true,
    },
    password: {
      type: String,
      minlength: 6,
      required: function () {
        return !this.googleId;
      },
    },
    googleId: {
      type: String,
      unique: true,
      sparse: true,
    },
    profilePicture: {
      type: String,
      default: "",
    },
    bio: {
      type: String,
      maxlength: 200,
      default: "",
    },
    phone: {
      type: String,
      maxlength: 20,
    },
    location: {
      country: { type: String },
      city: { type: String },
    },
    social: {
      github: { type: String },
      twitter: { type: String },
      linkedin: { type: String },
      website: { type: String },
    },
    isVerified: {
      type: Boolean,
      default: false,
    },
    isActive: {
      type: Boolean,
      default: true,
    },
    role: {
      type: String,
      enum: ["User", "Moderator", "Admin"],
      default: "User",
    },
    lastLogin: {
      type: Date,
    },
    // ✅ 6 haneli doğrulama kodu için yeni alanlar
    verificationCode: {
      type: String,
    },
    verificationCodeExpire: {
      type: Date,
    },
    // ✅ Şifre sıfırlama için gerekli alanlar
    resetPasswordToken: {
      type: String,
    },
    resetPasswordExpire: {
      type: Date,
    },
    // ✅ Refresh token için yeni alanlar
    refreshTokens: [{
      token: {
        type: String,
        required: true
      },
      createdAt: {
        type: Date,
        default: Date.now,
        expires: 2592000
      }
    }],
  },
  {
    timestamps: true,
  }
);

export default mongoose.model("User", userSchema);
