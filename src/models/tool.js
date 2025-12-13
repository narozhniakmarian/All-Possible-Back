import { Schema, model } from "mongoose";





const toolSchema = new Schema(
  {
    owner: { type: Schema.Types.ObjectId, ref: "User", required: true },
    category: { type: Schema.Types.ObjectId, ref: "Category", required: true },
    name: { type: String, required: true, trim: true },
    description: { type: String, default: "" },
    pricePerDay: { type: Number, required: true, min: 0 },
    images: [{ type: String }],
    rating: { type: Number, default: 0, min: 0, max: 5 },
    specifications: { type: Object, default: {} },
    rentalTerms: { type: String, default: "" },
    bookedDates: [{ type: Date }],
    feedbacks: [{ type: Schema.Types.ObjectId, ref: "Feedback" }],
  },
  { timestamps: true }
);

export const Tool = model("Tool", toolSchema);


