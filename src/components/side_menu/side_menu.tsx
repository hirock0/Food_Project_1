"use client";
import Link from "next/link";
import Style from "./side_menu.module.css";
export default function Side_Menu() {
  return (
    <main
      id={Style.sidemenu_section}
      className=" max-sm:text-xs sideMenu  -translate-x-full fixed top-20 max-sm:top-44 text-white h-full max-sm:w-40 sm:w-52 p-5"
    >
      <ul id={Style.Ul} className=" select-none flex flex-col gap-3">
        <Link href={"/from_sideMenu/about_foods"}><li>About Foods</li></Link>
        <Link href={"/from_sideMenu/receipes"}><li>Receipes</li></Link>
        <Link href={"/from_sideMenu/cheifs"}><li>Cheifs</li></Link>
        <Link href={"/from_sideMenu/contact_us"}><li>Contact Us</li></Link>
        <Link href={"/from_sideMenu/our_policy"}><li>Our Polices</li></Link>
        
      </ul>
    </main>
  );
}
