import mongoose from "mongoose";

const notificationSchema = new mongoose.Schema(
  {
    user: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true, index: true },
    type: {
      type: String,
      enum: [
        "budget_warning",
        "budget_exceeded",
        "goal_achieved",
        "bill_upcoming",
        "bill_due",
        "large_expense",
        "ai_recommendation",
      ],
      required: true,
    },
    message: { type: String, required: true },
    // Used to avoid re-creating the same notification every time it's re-synced
    // e.g. "budget_exceeded:Food:2026-7" or "bill_due:<billId>:2026-07-08"
    dedupeKey: { type: String, required: true },
    read: { type: Boolean, default: false },
  },
  { timestamps: true }
);

notificationSchema.index({ user: 1, dedupeKey: 1 }, { unique: true });

export default mongoose.model("Notification", notificationSchema);
