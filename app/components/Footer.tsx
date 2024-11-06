import Image from "next/image";
import Link from "next/link";
import { FaWhatsapp } from "react-icons/fa";
import { FaRegMap } from "react-icons/fa6";
function Footer() {
  const phoneNumber = "213671265377"; // Phone number without the "+" and spaces

  return (
    <footer className="mt-10  py-5 px-5 bg-primary text-accent">
      <div className="flex flex-col items-center gap-5 w-[90%] mx-auto md:flex-row md:justify-between">
        <h2>
          <Link href={"/"}>
            <Image src={"/logoBook1.png"} width={60} height={60} alt="logo" />
          </Link>
        </h2>
        <p className="text-lg text-center">
          Copyright © 2024{" "}
          <Link href={"/"} className="text-orange-700 text-2xl">
            Book App
          </Link>
          . All rights reserved.
        </p>
        <div className="flex items-center">
          <a
            href="https://www.google.com/maps/search/25+cite+oudjlida+tlemcen/@34.9323754,-1.3372834,4749m/data=!3m2!1e3!4b1?entry=ttu&g_ep=EgoyMDI0MTAyOS4wIKXMDSoASAFQAw%3D%3D"
            target="_blank"
            className="cursor-pointer"
          >
            <FaRegMap className="text-3xl mr-3" />
          </a>
          <a
            href={`https://wa.me/${phoneNumber}`}
            target="_blank"
            rel="noopener noreferrer"
          >
            <FaWhatsapp className="text-3xl" />
          </a>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
