import mongoose from "mongoose";

const categoryShema = new mongoose.Schema(
  {
    name: { type: String, required: true, unique: true },
  },
  { timestamps: true }
);

const Category =
  mongoose.models.Category || mongoose.model("Category", categoryShema);
export default Category;
