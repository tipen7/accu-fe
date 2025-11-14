"use client";
import Image from "next/image";
import { useState, useEffect } from "react";

export default function Home() {
  const typingSpeeed = 150;
  const pauseAfterType = 1500;
  const deleteSpeed = 100;
  const pauseBeforeType = 400;

  const [index, setIndex] = useState(0);
  const [isDeleting, setIsDeleting] = useState(false);
  const text = "ACCU";

  useEffect(() => {
    let timeout: NodeJS.Timeout;

    if (!isDeleting && index < text.length) {
      timeout = setTimeout(() => {
        setIndex(index + 1);
      }, typingSpeeed);
    } else if (!isDeleting && index === text.length) {
      timeout = setTimeout(() => {
        setIsDeleting(true);
      }, pauseAfterType);
    } else if (isDeleting && index > 0) {
      timeout = setTimeout(() => {
        setIndex((prev) => prev - 1);
      }, deleteSpeed);
    } else if (isDeleting && index === 0) {
      timeout = setTimeout(() => {
        setIsDeleting(false);
      }, pauseBeforeType);
    }

    return () => clearTimeout(timeout);
  }, [index, isDeleting]);

  return (
    <div className="min-h-screen flex items-center justify-center w-full overflow-hidden max-w-7xl mx-auto">
      <div className="flex max-w-3xl flex-col gap-7">
        <h1 className="font-montserrat text-4xl text-[#000000]">
          Struggling to manage your courses schedule? Let{" "}
          <span className="bg-linear-to-r from-purple-500 to-blue-500 bg-clip-text text-transparent font-bold transition-all duration-300">
            {text.slice(0, index)}
          </span>{" "}
          help you stay on!
        </h1>
        <div className="flex items-center gap-4">
          <a
            className="rounded-2xl bg-linear-to-r from-purple-500 to-blue-500 w-40 h-12 text-white font-montserrat text-lg font-bold shadow-lg hover:shadow-xl hover:scale-105 transition-all duration-300 flex items-center justify-center"
            href="/manage"
          >
            Get Started
          </a>
          <a
            className="rounded-2xl bg-transparent border-purple-500 border-2 w-40 h-12 text-purple-500 font-montserrat text-lg font-bold shadow-lg hover:shadow-xl hover:scale-105 transition-all duration-300 flex items-center justify-center"
            href="/about"
          >
            Learn More
          </a>
        </div>
      </div>
    </div>
  );
}
