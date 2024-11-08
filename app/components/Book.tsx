import React from "react";
import Image from "next/image";
import { BookType } from "../types/interfaceses";
import Link from "next/link";
import { useBookContext } from "../context/BookContextProvider";

export default function Book({ book }: { book: BookType }) {
  const { cartItems, addItem } = useBookContext();
  const isAdded = cartItems.find((item) => item.itemId === book._id)
    ? "In Cart"
    : "Add To Cart";
  return (
    <div
      className={` relative bg-primary  mt-4 w-[250px] h-[540px] m-auto rounded-2xl overflow-hidden `}
    >
      <Link
        href={`/books/${book._id}`}
        className="relative py-4 px-2 rounded-t-lg  bg-primary"
      >
        <Image
          src={book.image}
          alt="image"
          width={200}
          height={160}
          className="rounded-md m-auto shadow-[-6px_8px_8px_rgba(0,0,0,0.7)] transition-transform duration-300 hover:scale-105"
        />
      </Link>
      <div className="px-4 py-1 text-accent ">
        <h3 className="text-center text-accent mb-3">{book.title}</h3>
        <h3>
          <span className="text-orange-500 ">Auther :</span> {book.auther}
        </h3>
        <h3>
          <span className="text-orange-500 ">quantity :</span> {book.quantity}
        </h3>
        <h3>
          <span className="text-orange-500   ">Price :</span> {book.price} DA
        </h3>
        {book.quantity > 0 ? (
          <button
            disabled={
              cartItems.find((item) => item.itemId === book._id) ? true : false
            }
            className="disabled:bg-accent disabled:text-black absolute bottom-3 left-1/2 -translate-x-1/2 bg-orange-700 p-1 rounded-lg  text-white mx-auto block"
            onClick={() => addItem(book._id)}
          >
            {isAdded}
          </button>
        ) : null}
      </div>
    </div>
  );
}
