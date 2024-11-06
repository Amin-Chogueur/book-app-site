"use client";
import axios from "axios";
import Image from "next/image";
import React, { useState } from "react";
import Book from "../app/components/Book";
import Slider from "@/app/components/slider/Slider";

import { useBookContext } from "./context/BookContextProvider";
export default function Home() {
  const { books } = useBookContext();
  const [filteredBook, setFiltredBooked] = useState("");
  function handleScroll() {
    const section = document.getElementById("next-section");
    if (section) {
      section.scrollIntoView({ behavior: "smooth" });
    }
  }

  return (
    <div className="text-accent text-center ">
      <div>
        <Slider />
        <button
          onClick={handleScroll}
          className=" absolute top-3/4 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-orange-700 hover:bg-orange-600 text-white p-2 rounded-[10px] "
        >
          Get Started?
        </button>
      </div>
      <div id="next-section" className="mb-[100px]"></div>
      <h1 className="text-orange-600 text-4xl mb-5">Our Books</h1>
      <input
        className="bg-[#222] p-2 rounded w-[300px] outline-none"
        placeholder="Serach..."
        value={filteredBook}
        onChange={(e) => setFiltredBooked(e.target.value)}
      />
      {books.length === 0 ? (
        <h3 className="text-accent text-center text-2xl mt-5">Loading...</h3>
      ) : (
        <div className="grid sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-4  gap-5 text-left capitalize py-6 ">
          {books.map((book, i) => (
            <Book key={i} book={book} />
          ))}
        </div>
      )}
    </div>
  );
}
