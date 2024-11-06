"use client";
import React, { useDebugValue, useEffect, useState } from "react";
import Image from "next/image";
import axios from "axios";
import Link from "next/link";
import { useBookContext } from "@/app/context/BookContextProvider";
export interface BookDetails {
  _id: string;
  title: string;
  description: string;
  auther: string;
  category: string;
  categoryName: string;
  image: string;
  price: string;
  quantity: number;
}
const obj = {
  id: "6",
  image: "/books7.jpg",
  imageTitle: "Read. Discover. Enjoy.",
  imageDes:
    "Experience an endless library of books across all genres. Start your reading adventure today!",
};

export default function SingleBook({ params }: { params: { id: string } }) {
  const { id } = params;
  const [book, setBook] = useState<BookDetails>();
  const { addItem, cartItems } = useBookContext();
  const isAdded = cartItems.find((item) => item.itemId === book?._id)
    ? " In Cart"
    : "Add To Cart";
  async function getBook() {
    console.log(id);
    try {
      const res = await axios.get(`/api/books/${id}`);
      console.log(id);
      const book = res.data;
      console.log(book);
      setBook(book);
      //setBook(book);
    } catch (error) {
      console.log(error);
    }
  }
  function handleScroll() {
    const section = document.getElementById("next-section");
    if (section) {
      section.scrollIntoView({ behavior: "smooth" });
    }
  }
  useEffect(() => {
    getBook();
  }, []);
  return (
    <div>
      <div className="relative w-full h-screen">
        <Image src={"/books7.jpg"} alt="image" fill objectFit="cover" />
        <div className="bg-primary p-4 rounded-[50px] absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
          <h2 className="text-orange-600 text-center text-lg sm:text-3xl lg:text-5xl sm:mb-5 ">
            {book?.title}
          </h2>
          <p className="text-lg hidden sm:block text-center text-accent">
            Great Choice! 📚 Dive Deeper into Your Next Adventure!
          </p>
        </div>
        <button
          onClick={handleScroll}
          className=" absolute top-3/4 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-orange-700 hover:bg-orange-600 text-white p-2 rounded-[10px] "
        >
          Read More &darr;
        </button>
      </div>
      <div id="next-section" className="mb-[100px]"></div>
      {!book ? (
        <h3 className="text-accent text-center text-2xl mt-5 ">Loading...</h3>
      ) : (
        <div>
          {book.quantity > 0 ? null : (
            <h1 className="text-center text-xl text-orange-500 w-[90%] md:w-[60%] m-auto mb-6">
              `This book is currently unavailable in our library, but if you`re
              interested, please contact us via the contact form or phone, and
              we will order one for you.`
            </h1>
          )}
          <Link
            href={"/"}
            className="block w-[90%] mx-auto text-orange-500 underline "
          >
            &larr; Go Back
          </Link>
          <div className="lg:grid lg:grid-cols-2 w-[90%] mx-auto mb-24 mt-4">
            <div className="mx-auto lg:mx-0 w-fit">
              <Image
                src={book?.image}
                alt="image"
                width={300}
                height={200}
                className="mx-auto lg:mx-0 mb-5"
              />
            </div>
            <div className=" lg:ml-[-80px] text-accent ">
              <h3 className="mb-2 ">
                <span className="text-orange-600 ">Auther :</span>{" "}
                {book?.auther}
              </h3>
              <p className="mb-2">
                <span className="text-orange-600 ">Description :</span>{" "}
                {book?.description}
              </p>
              <div className="flex justify-between  mt-5">
                <h3>
                  <span className="text-orange-600 ">Category:</span>{" "}
                  {book?.categoryName}
                </h3>
                <h3>
                  <span className="text-orange-600 ">Price :</span>{" "}
                  {book?.price} DA
                </h3>
              </div>
              {book.quantity > 0 ? (
                <button
                  disabled={
                    cartItems.find((item) => item.itemId === book._id)
                      ? true
                      : false
                  }
                  onClick={() => addItem(book._id)}
                  className="disabled:bg-accent disabled:text-black bg-orange-700 p-2 rounded-lg mt-8 text-white"
                >
                  {isAdded}
                </button>
              ) : null}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
