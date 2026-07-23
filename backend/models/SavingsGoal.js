import mongoose from "mongoose";

const savingsGoalSchema = new mongoose.Schema(
  {
    user: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true, index: true },
    name: { type: String, required: true, trim: true },
    targetAmount: { type: Number, required: true, min: 1 },
    currentAmount: { type: Number, default: 0, min: 0 },
    deadline: { type: Date, required: true },
    icon: { type: String, default: "🎯" },
    completed: { type: Boolean, default: false },
  },
  { timestamps: true }
);

export default mongoose.model("SavingsGoal", savingsGoalSchema);
