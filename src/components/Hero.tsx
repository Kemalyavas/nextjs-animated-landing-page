"use client";

import { motion, useScroll, useTransform } from "framer-motion";
import { useRef, useState } from "react";
import { cn } from "@/lib/utils";
import Scene3D from "./Scene3D";

export default function Hero() {
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end start"],
  });

  const opacity = useTransform(scrollYProgress, [0, 1], [1, 0]);
  const scale = useTransform(scrollYProgress, [0, 1], [1, 0.8]);
  const y = useTransform(scrollYProgress, [0, 1], [0, -100]);

  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const x = ((e.clientX - rect.left) / rect.width - 0.5) * 20;
    const y = ((e.clientY - rect.top) / rect.height - 0.5) * 20;
    setMousePosition({ x, y });
  };

  return (
    <section
      ref={containerRef}
      onMouseMove={handleMouseMove}
      className="relative min-h-screen flex items-center justify-center overflow-hidden bg-black"
    >
      {/* 3D Background */}
      <Scene3D />

      {/* Grid overlay */}
      <div className="absolute inset-0 bg-[url('/grid.svg')] bg-center opacity-10" />

      {/* Content */}
      <motion.div
        style={{ opacity, scale, y }}
        className="relative z-10 max-w-7xl mx-auto px-6 text-center"
      >
        {/* Main heading with split text animation */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1, delay: 0.2 }}
          className="mb-8"
        >
          <h1 className="text-7xl md:text-9xl font-black tracking-tighter">
            <motion.span
              className="block text-gradient glow-text"
              style={{
                transform: `perspective(1000px) rotateX(${mousePosition.y * 0.1}deg) rotateY(${mousePosition.x * 0.1}deg)`,
              }}
            >
              CREATE
            </motion.span>
            <motion.span
              className="block mt-4"
              style={{
                transform: `perspective(1000px) rotateX(${-mousePosition.y * 0.1}deg) rotateY(${-mousePosition.x * 0.1}deg)`,
              }}
            >
              THE FUTURE
            </motion.span>
          </h1>
        </motion.div>

        {/* Subtitle */}
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.6 }}
          className="text-xl md:text-2xl text-gray-400 mb-12 max-w-3xl mx-auto font-light"
        >
          Experience design that breaks boundaries. Built for those who dare to be different.
        </motion.p>

        {/* CTA Buttons */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.9 }}
          className="flex flex-col sm:flex-row gap-6 justify-center items-center"
        >
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className={cn(
              "group relative px-10 py-5 bg-white text-black font-bold text-lg",
              "overflow-hidden transition-all duration-300",
              "hover:shadow-[0_0_40px_rgba(255,255,255,0.3)]"
            )}
          >
            <span className="relative z-10">Start Building</span>
            <motion.div
              className="absolute inset-0 bg-gradient-to-r from-gray-100 to-white"
              initial={{ x: "-100%" }}
              whileHover={{ x: 0 }}
              transition={{ duration: 0.3 }}
            />
          </motion.button>

          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className={cn(
              "px-10 py-5 border-2 border-white text-white font-bold text-lg",
              "hover:bg-white hover:text-black transition-all duration-300"
            )}
          >
            View Work
          </motion.button>
        </motion.div>
      </motion.div>
    </section>
  );
}
