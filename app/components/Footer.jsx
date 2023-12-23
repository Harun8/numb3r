import React from "react";
import "../globals.css";

import Link from "next/link";

import Image from "next/image";

const Footer = () => {
  return (
    <>
      <nav className="navbar fixed-bottom d-flex justify-content-center mx-auto gap-3 p-3 my-5">
        <Link
          target="_blank"
          className="linkedin btn text-white px-4 py-2 "
          href="https://www.linkedin.com/in/harun-abdi-25aa73164/"
          role="button">
          <Image
            src="/assets/linkedin.svg"
            width={15}
            height={15}
            alt="linkedin"></Image>
        </Link>

        <Link
          href="https://github.com/Harun8/numb3r"
          target="_blank"
          className="github btn text-white  px-4 py-2 "
          role="button">
          <Image
            src="/assets/github.svg"
            width={15}
            height={15}
            alt="github"></Image>
        </Link>
      </nav>
      <div className=" fixed-bottom d-flex justify-content-center mt-2 text-white">
        <p>Version: {process.env.NEXT_PUBLIC_APP_VERSION}</p>
      </div>
    </>
  );
};

export default Footer;
