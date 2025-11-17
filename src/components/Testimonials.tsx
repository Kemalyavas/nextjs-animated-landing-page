"use client";

import { motion, AnimatePresence } from "framer-motion";
import { useState, useEffect } from "react";
import { fadeSlide } from "@/lib/animations";
import { IconQuote } from "@tabler/icons-react";
import { cn } from "@/lib/utils";

interface Testimonial {
  quote: string;
  author: string;
  company: string;
  avatar: string;
  role: string;
}

const testimonials: Testimonial[] = [
  {
    quote:
      "This platform transformed our business. The design is stunning and the performance is incredible. Our conversion rates increased by 300%.",
    author: "Sarah Johnson",
    company: "TechCorp",
    avatar: "SJ",
    role: "CEO",
  },
  {
    quote:
      "The attention to detail and smooth animations create an experience our users love. It's rare to find such a perfect blend of form and function.",
    author: "Michael Chen",
    company: "InnovateHub",
    avatar: "MC",
    role: "Product Manager",
  },
  {
    quote:
      "Working with this team has been amazing. They delivered beyond our expectations, and the results speak for themselves. Highly recommended!",
    author: "Emily Rodriguez",
    company: "StartupLab",
    avatar: "ER",
    role: "Founder",
  },
];

export default function Testimonials() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isPaused, setIsPaused] = useState(false);

  // Auto-play carousel with 5-second intervals
  useEffect(() => {
    if (isPaused) return;

    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % testimonials.length);
    }, 5000);

    return () => clearInterval(interval);
  }, [isPaused]);

  return (
    <section className="py-24 px-6 bg-gradient-to-b from-background to-darkAccent relative overflow-hidden">
      {/* Background decoration */}
      <div className="absolute bottom-0 right-0 w-96 h-96 bg-indigo-600/10 rounded-full blur-3xl" />

      <div className="max-w-5xl mx-auto relative z-10">
        {/* Section header */}
        <motion.div
          initial={{ opacity: 0, y: 30, scale: 0.95 }}
          whileInView={{ opacity: 1, y: 0, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, ease: [0.6, 0.01, 0.05, 0.95] }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-bold mb-4 bg-gradient-to-r from-white via-purple-200 to-white bg-clip-text text-transparent">
            What Our Clients Say
          </h2>
          <p className="text-gray-400 text-lg">
            Don&apos;t just take our word for it
          </p>
        </motion.div>

        {/* Carousel container */}
        <div
          className="relative min-h-[300px] flex items-center justify-center"
          onMouseEnter={() => setIsPaused(true)}
          onMouseLeave={() => setIsPaused(false)}
        >
          <AnimatePresence mode="wait">
            <motion.div
              key={currentIndex}
              variants={fadeSlide}
              initial="enter"
              animate="center"
              exit="exit"
              className="glass p-12 rounded-2xl max-w-3xl w-full border border-white/5 hover:border-purple-500/20 transition-all duration-500 hover:shadow-2xl hover:shadow-purple-500/20"
            >
              {/* Quote icon with pulsing effect */}
              <motion.div
                initial={{ scale: 0, rotate: -180 }}
                animate={{ scale: 1, rotate: 0 }}
                transition={{ 
                  duration: 0.6, 
                  delay: 0.2,
                  type: "spring",
                  stiffness: 200,
                  damping: 15
                }}
              >
                <IconQuote className="w-12 h-12 text-purple-400 mb-6 opacity-50" stroke={1.5} />
              </motion.div>

              {/* Testimonial quote */}
              <motion.blockquote 
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.3 }}
                className="text-xl md:text-2xl text-gray-200 mb-8 leading-relaxed"
              >
                &quot;{testimonials[currentIndex].quote}&quot;
              </motion.blockquote>

              {/* Author info */}
              <motion.div 
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.5, delay: 0.4 }}
                className="flex items-center gap-4"
              >
                {/* Avatar with gradient border */}
                <div className="relative">
                  <div className="absolute inset-0 bg-gradient-to-br from-purple-600 to-indigo-600 rounded-full blur-sm"></div>
                  <div className="relative w-14 h-14 bg-gradient-to-br from-purple-600 to-indigo-600 rounded-full flex items-center justify-center font-bold text-white shadow-lg">
                    {testimonials[currentIndex].avatar}
                  </div>
                </div>

                {/* Author details */}
                <div>
                  <div className="font-semibold text-white text-lg">
                    {testimonials[currentIndex].author}
                  </div>
                  <div className="text-purple-400 text-sm">
                    {testimonials[currentIndex].role}
                  </div>
                  <div className="text-gray-400 text-sm">
                    {testimonials[currentIndex].company}
                  </div>
                </div>
              </motion.div>
            </motion.div>
          </AnimatePresence>

          {/* Pagination dots with hover effects */}
          <div className="absolute -bottom-8 left-1/2 transform -translate-x-1/2 flex gap-2">
            {testimonials.map((_, index) => (
              <motion.button
                key={index}
                onClick={() => setCurrentIndex(index)}
                whileHover={{ scale: 1.2 }}
                whileTap={{ scale: 0.9 }}
                className={`h-2 rounded-full transition-all duration-500 ${
                  index === currentIndex
                    ? "bg-purple-500 w-8 shadow-lg shadow-purple-500/50"
                    : "bg-gray-600 w-2 hover:bg-purple-400"
                }`}
                aria-label={`Go to testimonial ${index + 1}`}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
