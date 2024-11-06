import { connectToDB } from "@/app/lib/connectToDB";
import Book from "@/app/lib/models/Book";
import Category from "@/app/lib/models/Category";
import { NextResponse, NextRequest } from "next/server";

connectToDB();

export async function GET(
  req: NextRequest,
  { params }: { params: { id: string } }
) {
  const { id } = params;

  try {
    // Fetch the book by ID
    const book = await Book.findById(id).lean().exec(); // Use `lean()` for a plain object
    if (!book) {
      return NextResponse.json({ error: "Book not found" }, { status: 404 });
    }

    // Find the category name associated with the book's category ID
    const category = await Category.findById(book.category).lean().exec();
    if (!category) {
      return NextResponse.json(
        { error: "Category not found" },
        { status: 404 }
      );
    }

    // Combine book properties and add the category name as a new property
    const finalData = { ...book, categoryName: category.name };

    // Return the combined object
    return NextResponse.json(finalData);
  } catch (error) {
    console.error("Error fetching book or category:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}
