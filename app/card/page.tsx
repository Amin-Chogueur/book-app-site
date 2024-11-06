"use client";
import React, { ChangeEvent, use, useState } from "react";
import CardItem from "../components/CardItem";
import { useBookContext } from "../context/BookContextProvider";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useLocalStorage } from "../hooks/useLocaleStorage";
export default function Card() {
  const { cartItems, cartItemsQuantity, TotalCartPrice, books, setCartItems } =
    useBookContext();
  const [storedCartItems, setStoredCartItems, clearCartItems] = useLocalStorage(
    "shopping-cart",
    []
  );
  const [oredrMessage, setOrderMessage] = useState(false);

  const orderData = cartItems.map((item) => {
    const matchingBook = books.find((book) => book._id === item.itemId);
    return {
      item,
      book: matchingBook || null,
    };
  });
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    adress: "",
    phone: "",
  });
  const [status, setStatus] = useState("Submit");

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };
  const handleSubmit = async (e: { preventDefault: () => void }) => {
    e.preventDefault();
    setStatus("Submition...");
    try {
      const payload = {
        formData,
        orderData,
      };
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      const result = await res.json();
      setStatus(result.status);
      toast.success("Submition successeful");
      clearCartItems();
      setCartItems([]);
      setOrderMessage(true);
    } catch (error) {
      setStatus("Submission failed");
      toast.error("Error sending email!");
    } finally {
      setStatus("Submit");

      setFormData({
        name: "",
        email: "",
        adress: "",
        phone: "",
      });
    }
  };
  return (
    <div className="min-h-[100vh] mt-[120px] w-[90%] m-auto">
      <h1 className="text-orange-600 text-3xl text-center mb-8">
        Books In Your Cart
      </h1>
      {cartItemsQuantity > 0 ? (
        <div className="flex flex-col items-center md:items-start md:flex-row md:justify-between w-[100%] md:gap-5">
          <div className="w-[100%] md:w-[70%]">
            <div>
              {cartItems.map((item, i) => (
                <CardItem key={i} item={item} />
              ))}
            </div>
            <p className="text-accent text-2xl my-6">
              `To proceed with your order, please fill out the form with your
              details. Once we have your information, we will contact you by
              phone to discuss payment options and how you`d like to receive
              your order, whether it`s through delivery or another method.`
            </p>
          </div>
          <div className=" w-[100%] md:w-[30%] ">
            <div
              className={`bg-primary py-5   flex justify-between mb-4  h-fit mr-auto rounded-2xl  `}
            >
              <div className="px-4 py-1 text-accent my-auto">
                <h3 className=" text-orange-500 mb-3">Total Quantity:</h3>
                <p>{cartItemsQuantity}</p>
              </div>
              <div className="px-4 py-1 text-accent my-auto">
                <h3 className=" text-orange-500 mb-3">Total Price:</h3>
                <p>{TotalCartPrice.reduce((acu, cur) => acu + cur, 0)} DA</p>
              </div>
            </div>

            <form
              onSubmit={handleSubmit}
              className=" border text-accent border-gray-500 p-3 rounded-lg flex flex-col gap-4   shadow-md self-end"
            >
              <div className="flex flex-col gap-1">
                <label htmlFor="name" className="text-accent">
                  Name:
                </label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  required
                  className="outline-none p-1 rounded bg-[#222] "
                />
              </div>
              <div className="flex flex-col gap-1">
                <label htmlFor="email">Email:</label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  required
                  className="outline-none p-1 rounded bg-[#222] text-accent focus:outline-none "
                />
              </div>
              <div className="flex flex-col gap-1">
                <label htmlFor="phone">Phone:</label>
                <input
                  type="tel"
                  id="phone"
                  name="phone"
                  value={formData.phone}
                  onChange={handleChange}
                  required
                  className=" p-1 rounded bg-[#222] text-accent outline-none "
                />
              </div>
              <div className="flex flex-col gap-1">
                <label htmlFor="adress">Adress:</label>
                <input
                  id="adress"
                  name="adress"
                  value={formData.adress}
                  onChange={handleChange}
                  required
                  className="outline-none p-1 rounded bg-[#222] text-accent "
                />
              </div>
              <button
                className="bg-orange-600 text-white py-2 rounded-md hover:bg-orange-700 focus:outline-none w-full md:w-auto"
                type="submit"
              >
                {status}
              </button>
            </form>
          </div>
        </div>
      ) : (
        <div>
          <h2 className="text-center text-3xl mt-10">Your Cart Is Empty</h2>
          {oredrMessage ? (
            <p className="text-orange-600 text-3xl text-center mt-8">
              `Thank you for choosing us! We have received your order and will
              contact you shortly for more details about shipping and payment
              options.`
            </p>
          ) : null}
        </div>
      )}
      <ToastContainer />
    </div>
  );
}
