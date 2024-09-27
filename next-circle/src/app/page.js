"use client";
import { useState, useEffect } from "react";
import { motion } from "framer-motion";

export default function Home() {
  const [shapeStyle, setShapeStyle] = useState({});
  const [shapeClasses, setShapeClasses] = useState("");
  const [fadeIn, setFadeIn] = useState(false);

  useEffect(() => {
    // Initialize the shape and trigger fade-in effect
    setShapeStyle(getRandomShapeStyle());
    setShapeClasses(getRandomShapeClasses());
    setFadeIn(true);
  }, []);

  function getRandomShapeStyle() {
    const randomColor = `#${Math.floor(Math.random() * 16777215).toString(16)}`;
    const randomTop = Math.floor(Math.random() * (window.innerHeight - 150)); // Random position in pixels
    const randomLeft = Math.floor(Math.random() * (window.innerWidth - 150)); // Random position in pixels

    return {
      backgroundColor: randomColor,
      position: "absolute",
      top: `${randomTop}px`,
      left: `${randomLeft}px`,
    };
  }

  function handleShapeClick() {
    setFadeIn(false);

    // Wait for fade-out transition to complete before changing shape and restarting fade-in
    setTimeout(() => {
      setShapeStyle(getRandomShapeStyle());
      setShapeClasses(getRandomShapeClasses());
      setFadeIn(true); // Re-enable fade-in after shape change
    }, 300);
  }

  function getRandomShapeClasses() {
    const shapes = [
      "rounded-full w-32 h-32", // Circle
      "rounded-none w-32 h-32", // Square
      "w-40 h-20", // Rectangle
    ];
    return shapes[Math.floor(Math.random() * shapes.length)];
  }

  return (
    <div className="w-screen h-screen relative overflow-hidden">
      <motion.div
        style={shapeStyle}
        className={`cursor-pointer transition-all ease-in-out duration-700 transform hover:scale-110 ${shapeClasses}`}
        onClick={handleShapeClick}
        initial={{ opacity: 0 }}
        animate={{ opacity: fadeIn ? 1 : 0 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 0.7 }}
      />
    </div>
  );
}
