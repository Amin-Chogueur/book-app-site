"use client";
import { ChangeEvent, useState } from "react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
function ContactForm() {
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
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      const result = await res.json();
      setStatus(result.status);
      toast.success("Submition successeful");
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
    <div className=" w-[90%] mx-auto flex justify-center items-center ">
      <div>
        <h2 className="text-orange-500 text-4xl text-center mb-8 mt-[120px]">
          Contact Us
        </h2>
        <div className="flex flex-col md:flex-row gap-28 justify-between items-start px-4 md:px-0 w-full  mx-auto mt-6 ">
          <div className="text-accent md:w-1/2 text-xl ">
            <p>
              Thank you for visiting our book collection! We`re here to help you
              discover new reads, answer any questions, and share more about
              what makes our library special.
            </p>
            <hr className="my-5 w-[50%] " />
            <p>
              Have questions about our collection or need a book recommendation?
              We’re here to help! Whether you`re curious about a specific title,
              genre, or just want to learn more about our library, feel free to
              reach out. We’d love to hear from you!
            </p>
          </div>

          <form
            onSubmit={handleSubmit}
            className="border text-accent border-gray-500 p-3 rounded-lg flex flex-col gap-4 w-full md:w-1/2  shadow-md"
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
              <label htmlFor="message">Message:</label>
              <textarea
                id="message"
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
      <ToastContainer />
    </div>
  );
}

export default ContactForm;
