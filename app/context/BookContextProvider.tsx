"use client";
import React, {
  createContext,
  ReactNode,
  useContext,
  useEffect,
  useState,
} from "react";
import { BookType } from "../types/interfaceses";
import axios from "axios";
import { useLocalStorage } from "../hooks/useLocaleStorage";

export interface CartItem {
  itemId: string;
  quantity: number;
}

export interface BookContextType {
  books: BookType[];
  cartItems: CartItem[];
  setCartItems: React.Dispatch<React.SetStateAction<CartItem[]>>;
  cartItemsQuantity: number;
  TotalCartPrice: number[];
  addItem: (id: string) => void;
  removeItem: (id: string) => void;
  incressQuantity: (id: string) => void;
  decressQuantity: (id: string) => void;
}

const BookContext = createContext<BookContextType | undefined>(undefined);

export function useBookContext() {
  const context = useContext(BookContext);
  if (!context) {
    throw new Error("useBookContext must be used within a BookContextProvider");
  }
  return context;
}

export default function BookContextProvider({
  children,
}: {
  children: ReactNode;
}) {
  const [books, setBooks] = useState<BookType[]>([]);
  const [cartItems, setCartItems] = useLocalStorage<CartItem[]>(
    "shopping-cart",
    []
  );

  async function getBooks() {
    try {
      const res = await axios.get("/api/books");
      const books = res.data;
      setBooks(books);
    } catch (error) {
      console.error("Error fetching books:", error);
    }
  }

  function addItem(id: string) {
    setCartItems((prevItems) => {
      if (prevItems.find((item) => item.itemId === id)) {
        return [...prevItems];
      } else {
        return [...prevItems, { itemId: id, quantity: 1 }];
      }
    });
  }
  function removeItem(id: string) {
    setCartItems((prevItems) => prevItems.filter((item) => item.itemId !== id));
  }
  function incressQuantity(id: string) {
    const bookToInc = books.find((book) => book._id === id);
    setCartItems((prevItems) =>
      prevItems.map((item) =>
        item.itemId === id && item.quantity < bookToInc?.quantity!
          ? { ...item, quantity: item.quantity + 1 }
          : item
      )
    );
  }
  function decressQuantity(id: string) {
    setCartItems((prevItems) =>
      prevItems.map((item) =>
        item.itemId === id && item.quantity > 1
          ? { ...item, quantity: item.quantity - 1 }
          : item
      )
    );
  }
  const cartItemsQuantity = cartItems.reduce(
    (acu, cur) => acu + cur.quantity,
    0
  );
  const TotalCartPrice = cartItems.map((item) => {
    let total = 0;
    books.find((book) =>
      book._id === item.itemId
        ? (total += Number(book.price) * item.quantity)
        : (total += 0)
    );
    return total;
  });
  useEffect(() => {
    console.log("Fetching books...");
    getBooks();
  }, []);

  return (
    <BookContext.Provider
      value={{
        books,
        cartItems,
        cartItemsQuantity,
        TotalCartPrice,
        setCartItems,
        addItem,
        removeItem,
        incressQuantity,
        decressQuantity,
      }}
    >
      {children}
    </BookContext.Provider>
  );
}
