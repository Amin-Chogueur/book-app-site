"use client";
import { useRouter, useSearchParams } from "next/navigation";
import React, { useEffect, useState } from "react";
import { useBookContext } from "../context/BookContextProvider";
import Link from "next/link";

export default function Pagination() {
  const route = useRouter();
  const searchParams = useSearchParams();
  const { page, totalBooks, search, setSearch } = useBookContext();
  const perPage = 2;
  const totalPages = Math.ceil(totalBooks / perPage);
  const prevPage = Number(page) - 1 > 1 ? Number(page) - 1 : 1;
  const nextPage = Number(page) + 1;

  const pagesArray = Array.from(
    { length: totalPages },
    (_, index) => index + 1
  );
  function handleNextLink() {
    if (search) {
      route.push(`/?page=${nextPage}&search=${encodeURIComponent(search)}`);
    }
    route.push(`/?page=${nextPage}`);
    setSearch("");
  }
  function handlePrevLink() {
    if (search) {
      route.push(`/?page=${prevPage}&search=${encodeURIComponent(search)}`);
    }
    route.push(`/?page=${prevPage}`);
    setSearch("");
  }
  function handleLinkPage(toPage: number) {
    if (search) {
      route.push(`/?page=${toPage}&search=${encodeURIComponent(search)}`);
    }
    route.push(`/?page=${toPage}`);
    setSearch("");
  }
  useEffect(() => {
    const section = document.getElementById("next-section");
    if (section && page !== "1") {
      section.scrollIntoView({ behavior: "smooth" });
    }
  }, [page]);
  return (
    <div className="flex gap-8 w-fit mx-auto mt-[40px]">
      <button
        disabled={Number(page) === 1 ? true : false}
        onClick={() => handlePrevLink()}
        className="bg-orange-500 p-1 rounded disabled:bg-accent disabled:text-secondary"
      >
        &lt;
      </button>
      <div className="flex gap-3 w-fit mx-auto">
        {pagesArray.map((ele, i) => (
          <button
            onClick={() => handleLinkPage(ele)}
            className={
              Number(page) === ele
                ? "bg-secondary border p-1 rounded w-[30px] h-[30px] leading-4"
                : "bg-orange-500 p-1 rounded w-[30px] h-[30px] leading-4"
            }
            key={i}
          >
            {ele}
          </button>
        ))}
      </div>
      <button
        disabled={Number(page) === totalPages ? true : false}
        onClick={() => handleNextLink()}
        className="bg-orange-500 p-1 rounded disabled:bg-accent disabled:text-secondary"
      >
        &gt;
      </button>
    </div>
  );
}
