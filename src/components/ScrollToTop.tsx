"use client";

import { motion, useScroll } from "framer-motion";
import { IconArrowUp } from "@tabler/icons-react";
import { useState, useEffect } from "react";
import { cn } from "@/lib/utils";

/**
 * Floating action button to scroll back to top
 */
export default function ScrollToTop() {
  const [isVisible, setIsVisible] = useState(false);
  const { scrollY } = useScroll();

  useEffect(() => {
    return scrollY.on("change", (latest) => {
      setIsVisible(latest > 300);
    });
  }, [scrollY]);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <motion.button
      initial={{ opacity: 0, scale: 0 }}
      animate={{
        opacity: isVisible ? 1 : 0,
        scale: isVisible ? 1 : 0,
      }}
      transition={{ duration: 0.3 }}
      onClick={scrollToTop}
      className={cn(
        "fixed bottom-8 right-8 z-40 w-12 h-12 rounded-full",
        "bg-gradient-to-br from-purple-600 to-indigo-600",
        "flex items-center justify-center shadow-lg shadow-purple-500/50",
        "hover:shadow-xl hover:shadow-purple-500/70 transition-shadow duration-300",
        "hover:scale-110 active:scale-95 transition-transform"
      )}
      aria-label="Scroll to top"
    >
      <IconArrowUp className="w-6 h-6 text-white" stroke={2} />
    </motion.button>
  );
}
