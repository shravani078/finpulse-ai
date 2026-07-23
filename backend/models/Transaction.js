import mongoose from "mongoose";

const INCOME_CATEGORIES = ["Salary", "Freelance", "Business", "Investments", "Others"];
const EXPENSE_CATEGORIES = [
  "Food",
  "Shopping",
  "Bills",
  "Rent",
  "Travel",
  "Entertainment",
  "Healthcare",
  "Education",
  "Others",
];

const transactionSchema = new mongoose.Schema(
  {
    user: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true, index: true },
    amount: { type: Number, required: [true, "Amount is required"], min: 0.01 },
    type: { type: String, enum: ["income", "expense"], required: true },
    category: {
      type: String,
      required: true,
      validate: {
        validator: function (value) {
          const list = this.type === "income" ? INCOME_CATEGORIES : EXPENSE_CATEGORIES;
          return list.includes(value);
        },
        message: "Invalid category for the selected transaction type",
      },
    },
    description: { type: String, trim: true, default: "" },
    date: { type: Date, required: true, default: Date.now },
    paymentMethod: {
      type: String,
      enum: ["Cash", "Card", "UPI", "Bank Transfer", "Wallet", "Other"],
      default: "Other",
    },
    merchant: { type: String, trim: true, default: "" },
  },
  { timestamps: true }
);

transactionSchema.index({ user: 1, date: -1 });

export const CATEGORIES = { income: INCOME_CATEGORIES, expense: EXPENSE_CATEGORIES };
export default mongoose.model("Transaction", transactionSchema);
