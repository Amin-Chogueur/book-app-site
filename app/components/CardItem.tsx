import React from "react";
import Image from "next/image";
import { useBookContext } from "../context/BookContextProvider";

interface CardItemPrps {
  item: {
    itemId: string;
    quantity: number;
  };
}

export default function CardItem({ item }: CardItemPrps) {
  const { books, removeItem, incressQuantity, decressQuantity } =
    useBookContext();
  const itemDetail = books.find((book) => book._id === item.itemId);
  return (
    <div className="bg-primary flex flex-col md:flex-row justify-between items-center mb-4 h-fit rounded-2xl">
      <div className="flex flex-col md:flex-row items-center py-4 px-2 w-full md:w-3/5">
        <Image
          src={itemDetail?.image!}
          alt="image"
          width={70}
          height={70}
          className="rounded-md shadow-[-6px_8px_8px_rgba(0,0,0,0.7)] transition-transform duration-300 hover:scale-105 object-cover"
        />
        <div className="px-4 py-2 text-accent text-center md:text-left">
          <h3 className="text-accent mb-2">
            <span className="text-orange-500">Title: </span>
            {itemDetail?.title}
          </h3>
          <h3>
            <span className="text-orange-500">Author: </span>{" "}
            {itemDetail?.auther}
          </h3>
        </div>
      </div>

      <div className="px-4 py-2 text-accent text-center md:text-left w-full md:w-1/5">
        <h3>
          <span className="text-orange-500">Price: </span>
          {itemDetail?.price} DA
        </h3>
        <div className="flex justify-center md:justify-start gap-2 mt-1">
          <button
            onClick={() => decressQuantity(item.itemId)}
            className="w-6 h-6 flex justify-center items-center bg-accent text-orange-600"
          >
            -
          </button>
          <span>{item.quantity}</span>
          <button
            onClick={() => incressQuantity(item.itemId)}
            className="w-6 h-6 flex justify-center items-center bg-accent text-orange-600"
          >
            +
          </button>
        </div>
      </div>

      <div className="px-4 py-2 text-accent text-center md:text-left w-full md:w-1/5">
        <h3>
          <span className="text-orange-500">Total: </span>
          {Number(itemDetail?.price) * item.quantity} DA
        </h3>
      </div>

      <button
        className="text-red-700 p-2 md:pr-4 self-center md:self-auto"
        onClick={() => removeItem(item.itemId)}
      >
        ✖
      </button>
    </div>
  );
}
