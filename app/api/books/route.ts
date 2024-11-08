// import { connectToDB } from "@/app/lib/connectToDB";
// import Book from "@/app/lib/models/Book";
// import { NextRequest, NextResponse } from "next/server";

// connectToDB();

// export async function GET(req: NextRequest) {
//   const { searchParams } = new URL(req.url);
//   const page = Number(searchParams.get("page")) || 1;

//   const perPage = 2;
//   console.log("API Route - Page:", page); // Should log the correct page number
//   try {
//     const totalBooks = await Book.countDocuments();
//     const books = await Book.aggregate([
//       {
//         $lookup: {
//           from: "categories",
//           localField: "category",
//           foreignField: "_id",
//           as: "categoryDetails",
//         },
//       },
//       {
//         $unwind: "$categoryDetails",
//       },
//       {
//         $project: {
//           _id: 1,
//           title: 1,
//           auther: 1,
//           image: 1,
//           price: 1,
//           description: 1,
//           quantity: 1,
//           categoryName: "$categoryDetails.name",
//         },
//       },
//       { $skip: perPage * (page - 1) },
//       { $limit: perPage },
//     ]);

//     const response = { books, totalBooks };

//     return NextResponse.json(response);
//   } catch (error: any) {
//     console.error("Error fetching books:", error);
//     return NextResponse.json({ error: error.message }, { status: 500 });
//   }
// }
import { connectToDB } from "@/app/lib/connectToDB";
import Book from "@/app/lib/models/Book";
import { NextRequest, NextResponse } from "next/server";

connectToDB();

export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url);
  const page = Number(searchParams.get("page")) || 1;
  const search = searchParams.get("search") || ""; // Get the search query

  const perPage = 2; // Number of books per page
  console.log("API Route - Page:", page, "Search Query:", search); // Log page and search query

  try {
    // Construct the MongoDB query
    const query = search
      ? {
          title: { $regex: search, $options: "i" }, // Case-insensitive search by title
        }
      : {};

    // Count total books based on the search query
    const totalBooks = await Book.countDocuments();

    // Fetch books with aggregation pipeline
    const books = await Book.aggregate([
      { $match: query }, // Apply search filter if present
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
      { $skip: perPage * (page - 1) }, // Skip documents for pagination
      { $limit: perPage }, // Limit the number of documents per page
    ]);

    // Construct the response
    const response = { books, totalBooks };

    return NextResponse.json(response);
  } catch (error: any) {
    console.error("Error fetching books:", error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
