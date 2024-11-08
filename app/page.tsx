"use client";

import React, { ChangeEvent, FormEvent, useState } from "react";
import Book from "../app/components/Book";
import Slider from "@/app/components/slider/Slider";

import { useBookContext } from "./context/BookContextProvider";
import Pagination from "./components/Pagination";
export default function Home() {
  const { books, totalBooks, search, handleSearch, setSearch } =
    useBookContext();
  const [searchInput, setSearchInput] = useState<string>(search);

  const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    setSearchInput(e.target.value);
  };

  const handleSearchSubmit = (e: FormEvent) => {
    e.preventDefault();
    handleSearch(searchInput);
    setSearchInput("");
    //setSearch("");
  };

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
          {" "}
          Get Started?
        </button>
      </div>{" "}
      <div id="next-section" className="mb-[100px]"></div>
      <h1 className="text-orange-600 text-4xl mb-5">Our Books {totalBooks}</h1>
      <form
        onSubmit={handleSearchSubmit}
        className="mb-6 flex justify-center w-[250px] mx-auto"
      >
        <input
          type="text"
          value={searchInput}
          onChange={handleInputChange}
          placeholder="Search by title..."
          className="flex-grow text-primary p-2 border border-gray-300 rounded-l-md focus:outline-none"
        />
        <button
          type="submit"
          className="px-4 bg-orange-500 text-white rounded-r-md hover:bg-orange-600"
        >
          Search
        </button>
      </form>
      {books.length === 0 ? (
        <h3 className="text-accent text-center text-2xl mt-5">Loading...</h3>
      ) : (
        <div className="grid sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-4  gap-5 text-left capitalize py-6 ">
          {books.map((book, i) => (
            <Book key={i} book={book} />
          ))}
        </div>
      )}
      <Pagination />
    </div>
  );
}
