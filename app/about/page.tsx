import Image from "next/image";
import Link from "next/link";
export default function About() {
  return (
    <div className="mt-28 ">
      <h1 className="text-orange-500 text-4xl text-center mb-5">About Us</h1>
      <div className="flex-col lg:flex-row flex justify-between gap-10 w-[90%] mx-auto mb-6 ">
        <div className="mt-6">
          <Image src={"/about.jpg"} alt="image" width={800} height={800} />
        </div>
        <div className="text-accent">
          <h3 className="text-orange-500 text-2xl my-4">
            Welcome to Book App Store !
          </h3>
          <p className="text-xl">
            {" "}
            At Book App Store, we believe that every book opens a new door to
            adventure, knowledge, and inspiration. Our carefully curated
            collection features a wide range of genres, from timeless classics
            to the latest bestsellers, ensuring that there’s something for every
            reader.
          </p>
          <h3 className="text-orange-500 text-2xl my-4">Why Choose Us?</h3>
          <ul>
            <li className="text-xl">
              Diverse Selection: Explore our vast array of books that cater to
              all tastes and ages. Whether you’re a fan of fiction, non-fiction,
              children’s literature, or self-help, we have the perfect book
              waiting for you.
            </li>
            <li className="text-xl">
              Personalized Experience: Our passionate team is dedicated to
              helping you find your next favorite read. We’re always here to
              provide recommendations tailored to your interests.{" "}
            </li>
            <li className="text-xl">
              {" "}
              Community Focus: We’re more than just a bookstore; we’re a hub for
              book lovers. Join us for exciting events, book signings, and
              reading groups that foster connections and ignite discussions.{" "}
            </li>
          </ul>
          <h3 className="text-orange-500 text-2xl my-4">
            {" "}
            Join Our Community!
          </h3>
          <p className="text-xl">
            {" "}
            We invite you to browse our online collection and discover the joy
            of reading. If you have any questions or need assistance, don’t
            hesitate to reach out! Fill out our contact form, and let’s connect.
            Your journey into the world of books starts here, and we can’t wait
            to be a part of it.
          </p>
          <p className="text-xl">
            {" "}
            Thank you for choosing Book App Store. Happy reading!
          </p>
        </div>
      </div>
      <div className="text-center">
        <Link
          href={"/contact"}
          className="bg-orange-700 hover:bg-orange-600 p-2 rounded-md"
        >
          Get In Tech &rarr;
        </Link>
      </div>
    </div>
  );
}
