import mongoose from "mongoose";

const activitySchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    action: {
      type: String,
      required: true,
      enum: [
        "login",
        "logout",
        "profile_update",
        "password_change",
        "email_verification",
        "password_reset",
        "profile_picture_update",
      ],
    },
    description: {
      type: String,
      required: true,
    },
    ipAddress: String,
    userAgent: String,
    metadata: {
      type: mongoose.Schema.Types.Mixed,
      default: {},
    },
  },
  {
    timestamps: true,
  }
);

// Index for better query performance
activitySchema.index({ userId: 1, createdAt: -1 });

export default mongoose.model("Activity", activitySchema);
