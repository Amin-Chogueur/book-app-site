"use client";
import Link from "next/link";
import { useState } from "react";
import Image from "next/image";
import { usePathname, useRouter } from "next/navigation";
import { GiHamburgerMenu } from "react-icons/gi";
import { RiShoppingBag4Fill } from "react-icons/ri";
import styles from "./header.module.css";
import { useBookContext } from "@/app/context/BookContextProvider";
function Header() {
  const [isOpen, setIsOpen] = useState(false);
  const route = useRouter();
  const pathName = usePathname();
  const { cartItems, cartItemsQuantity } = useBookContext();

  return (
    <header className={styles.header}>
      <Link href={"/"} className="bg-primary p-1 rounded-full">
        <Image src={"/logoBook1.png"} width={60} height={60} alt="logo" />
      </Link>
      <nav className={styles.largeScreenLinks}>
        <ul>
          <li>
            <Link
              href={"/"}
              className={` ${
                pathName === "/" ? "bg-orange-700 " : "bg-primary"
              }`}
              onClick={() => setIsOpen(false)}
            >
              Home
            </Link>
          </li>
          <li>
            <Link
              href={"/about"}
              className={`${
                pathName === "/about" ? "bg-orange-700" : "bg-primary"
              }`}
              onClick={() => setIsOpen(false)}
            >
              About
            </Link>
          </li>
          <li>
            <Link
              href={"/contact"}
              className={` ${
                pathName === "/contact" ? "bg-orange-700" : "bg-primary"
              }`}
              onClick={() => setIsOpen(false)}
            >
              Contact
            </Link>
          </li>
          <Link
            href="/card"
            className="bg-primary p-1 rounded-full cursor-pointer relative"
          >
            {cartItems.length > 0 ? (
              <span className="absolute w-6 h-6 flex justify-center items-center top-[-13px] right-[-13px] bg-red-700 rounded-full">
                {cartItemsQuantity}
              </span>
            ) : null}
            <RiShoppingBag4Fill className="text-orange-700 text-2xl " />
          </Link>
        </ul>
      </nav>
      <nav
        className={`${isOpen ? styles.navBurgerOpen : styles.navBurgerClose}`}
      >
        <ul>
          <li>
            <Link
              className={` ${
                pathName === "/" ? "bg-orange-700" : "bg-primary"
              }`}
              href={"/"}
              onClick={() => setIsOpen(false)}
            >
              Home
            </Link>
          </li>
          <li>
            <Link
              className={` ${
                pathName === "/about" ? "bg-orange-700" : "bg-primary"
              }`}
              href={"/about"}
              onClick={() => setIsOpen(false)}
            >
              About
            </Link>
          </li>
          <li>
            <Link
              className={` ${
                pathName === "/contact" ? "bg-orange-700" : "bg-primary"
              }`}
              href={"/contact"}
              onClick={() => setIsOpen(false)}
            >
              Contact
            </Link>
          </li>
        </ul>
      </nav>

      <div className={styles.contrelorBurgerMenu}>
        {isOpen ? (
          <span
            className={`text-orange-700 ${styles.closeMenu}`}
            onClick={() => setIsOpen(false)}
          >
            ✖
          </span>
        ) : (
          <GiHamburgerMenu
            className={`text-secondary ${styles.openMenu}`}
            onClick={() => setIsOpen(true)}
          />
        )}
        <Link
          href="/card"
          className="bg-primary p-1 rounded-full cursor-pointer"
        >
          {cartItems.length > 0 ? (
            <span className="absolute w-6 h-6 flex justify-center items-center top-1 right-1 bg-red-700 rounded-full">
              {cartItemsQuantity}
            </span>
          ) : null}
          <RiShoppingBag4Fill className="text-orange-700 text-2xl " />
        </Link>
      </div>
    </header>
  );
}

export default Header;
