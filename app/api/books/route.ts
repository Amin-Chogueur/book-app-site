import { connectToDB } from "@/app/lib/connectToDB";

connectToDB();

import Book from "@/app/lib/models/Book";
import Category from "@/app/lib/models/Category";
import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest) {
  try {
    // Fetch all books
    const books = await Book.find().exec();

    // Fetch all categories
    const categories = await Category.find().exec();

    // Create a map of categories for easier lookup
    const categoryMap = new Map<string, string>(); // Map<categoryId, categoryName>
    categories.forEach((category) => {
      categoryMap.set(category._id.toString(), category.name);
    });

    // Map over the books to add the category name
    const booksWithCategoryNames = books.map((book) => ({
      ...book.toObject(), // Convert Mongoose document to plain object
      categoryName: categoryMap.get(book.category.toString()), // Add the category name
    }));

    return NextResponse.json(booksWithCategoryNames);
  } catch (error: any) {
    console.error("Error fetching books:", error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
