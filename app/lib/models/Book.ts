import mongoose from "mongoose";

const bookSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
    },
    description: {
      type: String,
      required: true,
    },
    category: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Category",
      required: true,
    },
    image: {
      type: String,
      required: true,
    },
    quantity: {
      type: Number,
      required: true,
    },
    price: { type: String, required: true },
    auther: { type: String, required: true },
  },
  { timestamps: true }
);

const Book = mongoose.models.Book || mongoose.model("Book", bookSchema);

export default Book;
