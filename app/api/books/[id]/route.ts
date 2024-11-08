import { connectToDB } from "@/app/lib/connectToDB";
import Book from "@/app/lib/models/Book";
import mongoose from "mongoose";
import { NextResponse, NextRequest } from "next/server";

connectToDB();

export async function GET(
  req: NextRequest,
  { params }: { params: { id: string } }
) {
  const { id } = params;

  try {
    const bookWithCategory = await Book.aggregate([
      {
        $match: { _id: new mongoose.Types.ObjectId(id) },
      },
      {
        $lookup: {
          from: "categories",
          localField: "category",
          foreignField: "_id",
          as: "categoryDetails",
        },
      },
      {
        $unwind: "$categoryDetails",
      },
      {
        $project: {
          _id: 1,
          title: 1,
          auther: 1,
          image: 1,
          price: 1,
          description: 1,
          quantity: 1,
          categoryName: "$categoryDetails.name",
        },
      },
    ]);

    if (bookWithCategory.length === 0) {
      return NextResponse.json({ error: "Book not found" }, { status: 404 });
    }

    return NextResponse.json(bookWithCategory[0]);
  } catch (error) {
    console.error("Error fetching book with category:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}
