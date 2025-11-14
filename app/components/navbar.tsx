"use client";
import { Sun } from "lucide-react";
import { useState, useEffect } from "react";
import "@fontsource-variable/montserrat";

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [isHidden, setIsHidden] = useState(false);
  const [currentScrollPos, setCurrentScrollPos] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      const lastPos = window.scrollY;
      if (lastPos > currentScrollPos && lastPos > 100) {
        setIsHidden(true);
      } else {
        setIsHidden(false);
      }
      setCurrentScrollPos(lastPos);
    };
    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, [currentScrollPos]);

  return (
    <div className="flex items-center justify-center">
      <nav
        className={`w-[70%] top-10 fixed h-16 px-8 bg-purple-500 bg-opacity-50 rounded-3xl mx-auto shadow-[8px_6px_20px_0px_rgba(0,0,0,0.4)] flex items-center justify-evenly gap-10 z-50 ${
          isHidden
            ? "translate-y-32 transition-transform duration-300"
            : "translate-y-0 transition-transform duration-300"
        }`}
      >
        <a
          href="/"
          className="text-2xl font-montserrat tracking-wide font-bold text-white hover:text-blue-600 transition-colors duration-300"
        >
          HOME
        </a>
        <a
          href="/about"
          className="text-2xl font-montserrat tracking-wide font-bold text-white  hover:text-blue-600 transition-colors duration-300"
        >
          ABOUT
        </a>
        <a
          href="/manage"
          className="text-2xl font-montserrat tracking-wide font-bold text-white  hover:text-blue-600 transition-colors duration-300"
        >
          MANAGE
        </a>
        <Sun className="w-4 h-4 z-20 text-white" />
      </nav>
    </div>
  );
}
