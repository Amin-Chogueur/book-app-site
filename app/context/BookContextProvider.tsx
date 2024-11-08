// "use client";
// import React, {
//   createContext,
//   ReactNode,
//   useContext,
//   useEffect,
//   useState,
// } from "react";
// import { BookType, CartItem } from "../types/interfaceses";
// import axios from "axios";
// import { useLocalStorage } from "../hooks/useLocaleStorage";
// import { useSearchParams } from "next/navigation";

// export interface BookContextType {
//   books: BookType[];
//   totalBooks: number;
//   page: string | string;
//   cartItems: CartItem[];
//   setCartItems: React.Dispatch<React.SetStateAction<CartItem[]>>;
//   cartItemsQuantity: number;
//   TotalCartPrice: number;
//   addItem: (id: string) => void;
//   removeItem: (id: string) => void;
//   incressQuantity: (id: string) => void;
//   decressQuantity: (id: string) => void;
// }

// const BookContext = createContext<BookContextType | undefined>(undefined);

// export function useBookContext() {
//   const context = useContext(BookContext);
//   if (!context) {
//     throw new Error("useBookContext must be used within a BookContextProvider");
//   }
//   return context;
// }

// export default function BookContextProvider({
//   children,
// }: {
//   children: ReactNode;
// }) {
//   const searchParams = useSearchParams();
//   const page = searchParams.get("page") || "1";
//   const [books, setBooks] = useState<BookType[]>([]);
//   const [totalBooks, setTotalBooks] = useState(0);
//   const [cartItems, setCartItems] = useLocalStorage<CartItem[]>(
//     "shopping-cart",
//     []
//   );

//   async function getBooks() {
//     try {
//       const res = await axios.get(`/api/books?page=${page}`);
//       const { books, totalBooks } = res.data;
//       console.log(res.data.books);
//       setBooks(books);
//       setTotalBooks(totalBooks);
//     } catch (error) {
//       console.error("Error fetching books:", error);
//     }
//   }

//   function addItem(id: string) {
//     setCartItems((prevItems) => {
//       const existingItem = prevItems.find((item) => item.itemId === id);
//       if (existingItem) {
//         return prevItems; // Item already in cart, no need to add again
//       } else {
//         // Find the full book details
//         const newBook = books.find((book) => book._id === id);
//         if (!newBook) return prevItems; // If no book found, return previous state

//         // Create a new cart item with all book properties and a quantity of 1
//         const newCartItem: CartItem = {
//           title: newBook.title,
//           description: newBook.description,
//           price: newBook.price,
//           itemId: newBook._id,
//           image: newBook.image,
//           quantityInStore: newBook.quantity,
//           quantityInCart: 1, // Default quantity
//           category: newBook.category,
//           categoryName: newBook.categoryName,
//           auther: newBook.auther,
//         };

//         return [...prevItems, newCartItem]; // Add the new cart item to the cart
//       }
//     });
//   }

//   function removeItem(id: string) {
//     setCartItems((prevItems) => prevItems.filter((item) => item.itemId !== id));
//   }

//   function incressQuantity(id: string) {
//     setCartItems((prevItems) =>
//       prevItems.map((item) =>
//         item.itemId === id && item.quantityInCart < item.quantityInStore
//           ? { ...item, quantityInCart: item.quantityInCart + 1 }
//           : item
//       )
//     );
//     console.log("lb3ar");
//   }

//   function decressQuantity(id: string) {
//     setCartItems((prevItems) =>
//       prevItems.map((item) =>
//         item.itemId === id && item.quantityInCart > 1
//           ? { ...item, quantityInCart: item.quantityInCart - 1 }
//           : item
//       )
//     );
//   }

//   const cartItemsQuantity = cartItems.reduce(
//     (acu, cur) => acu + cur.quantityInCart,
//     0
//   );
//   const TotalCartPrice = cartItems.reduce(
//     (acu, cur) => acu + cur.quantityInCart * Number(cur.price),
//     0
//   );

//   useEffect(() => {
//     getBooks();
//   }, [page]);

//   return (
//     <BookContext.Provider
//       value={{
//         books,
//         page,
//         cartItems,
//         cartItemsQuantity,
//         TotalCartPrice,
//         totalBooks,
//         setCartItems,
//         addItem,
//         removeItem,
//         incressQuantity,
//         decressQuantity,
//       }}
//     >
//       {children}
//     </BookContext.Provider>
//   );
// }
"use client";
import React, {
  createContext,
  ReactNode,
  useContext,
  useEffect,
  useState,
} from "react";
import { BookType, CartItem } from "../types/interfaceses";
import axios from "axios";
import { useLocalStorage } from "../hooks/useLocaleStorage";
import { useSearchParams, useRouter } from "next/navigation";

export interface BookContextType {
  books: BookType[];
  totalBooks: number;
  page: string;
  search: string;
  setSearch: React.Dispatch<React.SetStateAction<string>>;
  handleSearch: (searchTerm: string) => void;
  cartItems: CartItem[];
  setCartItems: React.Dispatch<React.SetStateAction<CartItem[]>>;
  cartItemsQuantity: number;
  TotalCartPrice: number;
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
  const route = useRouter();
  const searchParams = useSearchParams();
  const page = searchParams.get("page") || "1";
  const initialSearch = searchParams.get("search") || "";
  const [search, setSearch] = useState<string>(initialSearch);
  const [books, setBooks] = useState<BookType[]>([]);
  const [totalBooks, setTotalBooks] = useState(0);
  const [cartItems, setCartItems] = useLocalStorage<CartItem[]>(
    "shopping-cart",
    []
  );

  async function getBooks() {
    console.log("get the next page");
    try {
      const res = await axios.get(
        `/api/books?page=${page}&search=${encodeURIComponent(search)}`
      );
      const { books, totalBooks } = res.data;
      setBooks(books);
      setTotalBooks(totalBooks);
    } catch (error) {
      console.error("Error fetching books:", error);
    }
  }

  useEffect(() => {
    getBooks();
  }, [page, search]);

  // Function to handle search submission
  const handleSearch = (searchTerm: string) => {
    setSearch(searchTerm);

    route.push(`/?page=1&search=${encodeURIComponent(searchTerm)}`);
  };

  function addItem(id: string) {
    setCartItems((prevItems) => {
      const existingItem = prevItems.find((item) => item.itemId === id);
      if (existingItem) {
        return prevItems; // Item already in cart, no need to add again
      } else {
        // Find the full book details
        const newBook = books.find((book) => book._id === id);
        if (!newBook) return prevItems; // If no book found, return previous state

        // Create a new cart item with all book properties and a quantity of 1
        const newCartItem: CartItem = {
          title: newBook.title,
          description: newBook.description,
          price: newBook.price,
          itemId: newBook._id,
          image: newBook.image,
          quantityInStore: newBook.quantity,
          quantityInCart: 1, // Default quantity
          category: newBook.category,
          categoryName: newBook.categoryName,
          auther: newBook.auther,
        };

        return [...prevItems, newCartItem]; // Add the new cart item to the cart
      }
    });
  }

  function removeItem(id: string) {
    setCartItems((prevItems) => prevItems.filter((item) => item.itemId !== id));
  }

  function incressQuantity(id: string) {
    setCartItems((prevItems) =>
      prevItems.map((item) =>
        item.itemId === id && item.quantityInCart < item.quantityInStore
          ? { ...item, quantityInCart: item.quantityInCart + 1 }
          : item
      )
    );
    console.log("Quantity increased for item:", id);
  }

  function decressQuantity(id: string) {
    setCartItems((prevItems) =>
      prevItems.map((item) =>
        item.itemId === id && item.quantityInCart > 1
          ? { ...item, quantityInCart: item.quantityInCart - 1 }
          : item
      )
    );
  }

  const cartItemsQuantity = cartItems.reduce(
    (acu, cur) => acu + cur.quantityInCart,
    0
  );

  const TotalCartPrice = cartItems.reduce(
    (acu, item) => acu + Number(item.price) * item.quantityInCart,
    0
  );

  return (
    <BookContext.Provider
      value={{
        books,
        totalBooks,
        page,
        search,
        setSearch,
        handleSearch,
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
