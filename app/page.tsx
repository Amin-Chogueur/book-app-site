"use client";

import React, { ChangeEvent, FormEvent, useEffect, useState } from "react";
import Book from "../app/components/Book";
import Slider from "@/app/components/slider/Slider";

import { useBookContext } from "./context/BookContextProvider";
import Pagination from "./components/Pagination";
export default function Home() {
  const { loading, books, categories, totalBooks, search, handleSearch } =
    useBookContext();
  const [searchInput, setSearchInput] = useState<string>(search);
  const [searchCategory, setSearchCategory] = useState<string>("All");
  const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    setSearchInput(e.target.value);
  };
  console.log(searchCategory);
  const handleSearchSubmit = (e: FormEvent) => {
    e.preventDefault();
    handleSearch(searchInput);
    setSearchInput("");
  };

  function handleScroll() {
    const section = document.getElementById("next-section");
    if (section) {
      section.scrollIntoView({ behavior: "smooth" });
    }
  }
  const filteredBooks = books.filter((book) =>
    searchCategory !== "All" ? book.categoryName === searchCategory : true
  );
  useEffect(() => {
    handleScroll();
  }, [books]);
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
      <h1 className="text-orange-600 text-4xl mb-5">Our Books</h1>
      <form
        onSubmit={handleSearchSubmit}
        className="mb-6 flex flex-col md:flex-row justify-center items-center gap-6 w-[250px] mx-auto"
      >
        <select
          className="text-primary p-2 mr-5 my-3 outline-none rounded"
          id="category"
          name="category"
          value={searchCategory}
          onChange={(e) => setSearchCategory(e.target.value)}
        >
          <option value="All">All Categories</option>
          {categories.map((category) => (
            <option key={category._id} value={category.name}>
              {category.name}
            </option>
          ))}
        </select>
        <div className="flex justify-center w-[250px] mx-auto">
          <input
            type="text"
            value={searchInput}
            onChange={handleInputChange}
            placeholder="Search by title..."
            className="flex-grow text-primary placeholder:text-primary p-2 border border-gray-300 rounded-l-md focus:outline-none"
          />
          <button
            type="submit"
            className="px-4 bg-orange-500 text-white rounded-r-md hover:bg-orange-600"
          >
            Search
          </button>
        </div>
      </form>
      {loading ? (
        <h3 className="text-accent text-center text-2xl mt-5">Loading...</h3>
      ) : null}
      {filteredBooks.length === 0 ? (
        <h3 className="text-accent text-center text-2xl mt-5">
          No Books Found
        </h3>
      ) : (
        <div className="grid sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-4  gap-5 text-left capitalize py-6 ">
          {filteredBooks.map((book, i) => (
            <Book key={i} book={book} />
          ))}
        </div>
      )}
      <Pagination />
    </div>
  );
}
