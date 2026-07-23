import mongoose from "mongoose";

const billSchema = new mongoose.Schema(
  {
    user: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true, index: true },
    name: { type: String, required: [true, "Bill name is required"], trim: true },
    amount: { type: Number, required: [true, "Amount is required"], min: 0.01 },
    dueDate: { type: Date, required: [true, "Due date is required"] }, // next occurrence
    frequency: {
      type: String,
      enum: ["one-time", "weekly", "monthly", "yearly"],
      default: "monthly",
    },
    category: { type: String, default: "Bills" },
    active: { type: Boolean, default: true },
    lastPaidDate: { type: Date, default: null },
  },
  { timestamps: true }
);

billSchema.index({ user: 1, dueDate: 1 });

export default mongoose.model("Bill", billSchema);
