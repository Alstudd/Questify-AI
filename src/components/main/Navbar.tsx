import { Socials } from "@/constants";
import { Mail, Phone } from "lucide-react";
import Image from "next/image";
import React from "react";

const Navbar = () => {
  return (
    <div className="w-full h-[65px] fixed top-0 shadow-lg shadow-[#2A0E61]/50 bg-[#03001417] backdrop-blur-md z-50 md:px-10 px-0">
      <div className="w-full h-full flex flex-row items-center justify-between m-auto px-[10px]">
        <a
          href="#about-me"
          className="h-auto w-auto flex flex-row items-center"
        >
          <Image
            src="/textlogobg.png"
            alt="logo"
            width={30}
            height={30}
            className="cursor-pointer hover:animate-slowspin"
          />

          <span className="font-bold ml-[10px] hidden md:block text-gray-300">
            Questify AI
          </span>
        </a>

        <div className="w-[500px] h-full flex flex-row items-center justify-between md:mr-20">
          <div className="flex items-center justify-between w-full h-auto border border-[#7042f861] bg-[#0300145e] mr-[15px] px-[20px] py-[10px] rounded-full text-gray-200">
            <a href="/classroom" className="cursor-pointer">
              Classroom
            </a>
            <a href="#about" className="cursor-pointer">
              About Us
            </a>
            <a href="#contact" className="cursor-pointer">
              Contact
            </a>
          </div>
        </div>

        <div className="md:block hidden">
        <div className="flex my-auto flex-row gap-5">
          <a
            href="mailto:alphamatics4me@gmail.com"
            className="block py-2 px-3 text-white rounded hover:bg-gray-100 md:hover:bg-transparent md:border-0 md:hover:text-blue-700 md:p-0 "
          >
            <Mail />
          </a>
          <a
            href="mailto:alphamatics4me@gmail.com"
            className="block py-2 px-3 my-auto text-white rounded hover:bg-gray-100 md:hover:bg-transparent md:border-0 md:hover:text-blue-700 md:p-0 "
          >
            <Phone size={20} />
          </a>
        </div>
        </div>
      </div>
    </div>
  );
};

export default Navbar;
