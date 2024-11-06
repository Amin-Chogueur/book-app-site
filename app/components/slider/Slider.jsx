// "use client";

// import { useState, useEffect } from "react";
// import { FaArrowCircleRight, FaArrowAltCircleLeft } from "react-icons/fa";
// import Image from "next/image";
// const slide = [
//   { id: "1", image: "/books.jpg" },
//   { id: "3", image: "/books2.jpg" },
//   { id: "5", image: "/books3.jpg" },
//   { id: "6", image: "/books5.jpg" },
//   { id: "7", image: "/books6.jpg" },
//   { id: "8", image: "/books7.jpg" },
//   { id: "9", image: "/books8.jpg" },
//   { id: "10", image: "/books9.jpg" },
//   { id: "11", image: "/books10.jpg" },
// ];

// function Slider() {
//   const [currentSlide, setCurrentSlide] = useState(0);
//   function handleLeftArrow() {
//     setCurrentSlide((currentSlide) =>
//       currentSlide === 0 ? slide.length - 1 : currentSlide - 1
//     );
//     console.log(slide[currentSlide].image);
//   }
//   function handleRighttArrow() {
//     setCurrentSlide((currentSlide) =>
//       currentSlide === slide.length - 1 ? 0 : currentSlide + 1
//     );
//     console.log(slide[currentSlide].image);
//   }
//   useEffect(() => {
//     const interval = setInterval(() => {
//       setCurrentSlide((currentSlide) =>
//         currentSlide === slide.length - 1 ? 0 : currentSlide + 1
//       );
//     }, 4000);

//     return () => clearInterval(interval); // Clear interval on component unmount
//   }, []);

//   return (
//     <div>
//       {/* Left Arrow Button */}
//       <button
//         onClick={handleLeftArrow}
//         className="absolute left-4 top-1/2 transform -translate-y-1/2 text-white text-3xl z-10"
//       >
//         <FaArrowAltCircleLeft />
//       </button>

//       <div
//         style={{
//           width: "100vw",
//           height: "100vh",
//         }}
//       >
//         <Image
//           src={`${slide[currentSlide].image}`}
//           fill
//           alt="image"
//           objectFit="cover"
//         />
//       </div>

//       {/* Right Arrow Button */}
//       <button
//         onClick={handleRighttArrow}
//         className="absolute right-4 top-1/2 transform -translate-y-1/2 text-white text-3xl z-10"
//       >
//         <FaArrowCircleRight />
//       </button>
//     </div>
//   );
// }

// export default Slider;
"use client";

import { useState, useEffect } from "react";
import { FaArrowCircleRight, FaArrowAltCircleLeft } from "react-icons/fa";
import Image from "next/image";

const slides = [
  {
    id: "1",
    image: "/books.jpg",
    imageTitle: "A Library in Your Pocket!",
    imageDes:
      "From fantasy to nonfiction, find books that captivate, enlighten, and entertain.",
  },
  {
    id: "2",
    image: "/books2.jpg",
    imageTitle: "Discover Books Tailored for You!",
    imageDes:
      "A collection designed for readers of every kind. Start exploring now.",
  },
  {
    id: "3",
    image: "/books3.jpg",
    imageTitle: "Find the Stories That Resonate with You!",
    imageDes:
      "Your next great read is only a click away. Explore our vast collection and enjoy!",
  },
  {
    id: "4",
    image: "/books5.jpg",
    imageTitle: "Every Book Tells a Story!",
    imageDes:
      "From fantasy to nonfiction, find books that captivate, enlighten, and entertain.",
  },
  {
    id: "5",
    image: "/books6.jpg",
    imageTitle: "Hey Kids, Adventure Awaits on Every Page!",
    imageDes:
      "Join us in a world of fun, magic, and endless imagination. Discover stories made just for little explorers!",
  },

  {
    id: "7",
    image: "/books8.jpg",
    imageTitle: "Explore a World of Books at Your Fingertips!",
    imageDes:
      "Discover thousands of titles across all genres, from timeless classics to the latest bestsellers.",
  },
  {
    id: "8",
    image: "/books9.jpg",
    imageTitle: "Unleash Your Imagination with Every Page!",
    imageDes:
      "Journey into stories that inspire, captivate, and expand your horizons.",
  },
  {
    id: "9",
    image: "/books10.jpg",
    imageTitle: "Your Next Favorite Book Awaits!",
    imageDes:
      "Dive into a collection curated just for book lovers. Find, read, and get inspired!",
  },
];

function Slider() {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [direction, setDirection] = useState(1); // 1 for right, -1 for left
  const totalSlides = slides.length;

  const handleLeftArrow = () => {
    setDirection(-1);
    setCurrentSlide((prev) => (prev === 0 ? totalSlides - 1 : prev - 1));
  };

  const handleRightArrow = () => {
    setDirection(1);
    setCurrentSlide((prev) => (prev + 1) % totalSlides);
  };

  // Auto-play slider with bidirectional effect
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentSlide((prev) => {
        if (prev === 0 && direction === -1) {
          setDirection(1);
          return prev + 1;
        } else if (prev === totalSlides - 1 && direction === 1) {
          setDirection(-1);
          return prev - 1;
        }
        return prev + direction;
      });
    }, 6000);

    return () => clearInterval(interval);
  }, [direction, totalSlides]);

  return (
    <div className="relative overflow-hidden w-full h-screen">
      {/* Left Arrow Button */}
      <button
        onClick={handleLeftArrow}
        className="absolute left-4 top-1/2 transform -translate-y-1/2 text-accent text-3xl z-10"
      >
        <FaArrowAltCircleLeft />
      </button>

      <div
        className="flex transition-transform duration-700"
        style={{
          transform: `translateX(-${currentSlide * 100}%)`,
        }}
      >
        {slides.map((slide) => (
          <div key={slide.id} className="min-w-full h-screen relative">
            <Image
              src={slide.image}
              fill
              alt={`Slide ${slide.id}`}
              style={{ objectFit: "cover" }}
            />
            <div className="bg-primary p-4 rounded-[50px] absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
              <h3 className=" text-orange-600 text-lg sm:text-3xl lg:text-5xl sm:mb-5">
                {slide.imageTitle}
              </h3>
              <p className="text-lg hidden sm:block">{slide.imageDes}</p>
            </div>
          </div>
        ))}
      </div>

      {/* Right Arrow Button */}
      <button
        onClick={handleRightArrow}
        className="absolute right-4 top-1/2 transform -translate-y-1/2 text-accent text-3xl z-10"
      >
        <FaArrowCircleRight />
      </button>
    </div>
  );
}

export default Slider;
