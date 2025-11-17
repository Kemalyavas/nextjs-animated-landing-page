"use client";

import { motion, useScroll, useTransform } from "framer-motion";
import { cn } from "@/lib/utils";
import { useRef } from "react";

const links = ["GitHub", "Twitter", "LinkedIn", "Instagram"];

export default function FooterNew() {
  const footerRef = useRef(null);
  const { scrollYProgress } = useScroll({
    target: footerRef,
    offset: ["start end", "end end"],
  });

  const y = useTransform(scrollYProgress, [0, 1], [100, 0]);
  const opacity = useTransform(scrollYProgress, [0, 0.5, 1], [0, 0.5, 1]);

  return (
    <footer ref={footerRef} className="relative py-32 px-6 bg-black border-t border-white/10 overflow-hidden">
      {/* Animated background grid */}
      <div className="absolute inset-0 opacity-[0.02]">
        {[...Array(10)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute w-full h-px bg-white"
            style={{ top: `${i * 10}%` }}
            animate={{
              scaleX: [1, 1.2, 1],
              opacity: [0.3, 0.6, 0.3],
            }}
            transition={{
              duration: 3,
              delay: i * 0.2,
              repeat: Infinity,
            }}
          />
        ))}
      </div>

      <motion.div style={{ y, opacity }} className="max-w-7xl mx-auto relative z-10">
        {/* Top section */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-20 mb-32">
          {/* Left side */}
          <div>
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
            >
              <h3 className="text-6xl md:text-7xl font-black mb-8 leading-tight">
                Let's Create
                <br />
                <span className="text-gradient">Something Great</span>
              </h3>
              
              <motion.a
                href="mailto:hello@example.com"
                className="text-3xl text-gray-400 hover:text-white transition-colors inline-block group relative"
                whileHover={{ x: 10 }}
              >
                hello@example.com
                <motion.div
                  className="absolute bottom-0 left-0 h-px bg-white"
                  initial={{ width: 0 }}
                  whileHover={{ width: "100%" }}
                  transition={{ duration: 0.3 }}
                />
              </motion.a>

              {/* Decorative elements */}
              <div className="mt-12 flex gap-4">
                {[...Array(3)].map((_, i) => (
                  <motion.div
                    key={i}
                    className="w-16 h-1 bg-white/20"
                    initial={{ scaleX: 0 }}
                    whileInView={{ scaleX: 1 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.8, delay: i * 0.1 }}
                  />
                ))}
              </div>
            </motion.div>
          </div>

          {/* Right side - Links */}
          <div className="flex flex-col md:items-end justify-center">
            <nav className="space-y-6">
              {links.map((link, index) => (
                <motion.a
                  key={link}
                  href="#"
                  initial={{ opacity: 0, x: 50 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.1, duration: 0.6 }}
                  className="group block relative"
                >
                  <motion.div
                    className="flex items-center gap-6 text-3xl font-light text-gray-400"
                    whileHover={{ x: -20 }}
                    transition={{ duration: 0.3 }}
                  >
                    {/* Animated number */}
                    <motion.span
                      className="text-sm font-mono opacity-0 group-hover:opacity-100 transition-opacity"
                      initial={{ x: 20 }}
                      whileHover={{ x: 0 }}
                    >
                      0{index + 1}
                    </motion.span>
                    
                    <span className="group-hover:text-white transition-colors">
                      {link}
                    </span>

                    {/* Expanding line */}
                    <motion.div
                      className="h-px bg-white absolute right-full mr-4 top-1/2"
                      initial={{ width: 0 }}
                      whileHover={{ width: 40 }}
                      transition={{ duration: 0.3 }}
                    />
                  </motion.div>
                </motion.a>
              ))}
            </nav>
          </div>
        </div>

        {/* Divider with animation */}
        <motion.div
          className="h-px bg-gradient-to-r from-transparent via-white/20 to-transparent mb-16"
          initial={{ scaleX: 0 }}
          whileInView={{ scaleX: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 1.5 }}
        />

        {/* Bottom section */}
        <div className="flex flex-col md:flex-row justify-between items-center gap-8">
          <motion.p
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.3 }}
            className="text-sm text-gray-500 font-mono"
          >
            © 2025 All rights reserved — Crafted with passion
          </motion.p>

          <div className="flex gap-12 text-sm font-mono text-gray-500">
            {["Privacy", "Terms", "Cookies"].map((item, i) => (
              <motion.a
                key={item}
                href="#"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.4 + i * 0.1 }}
                whileHover={{ y: -5 }}
                className="hover:text-white transition-colors relative group"
              >
                {item}
                <motion.div
                  className="absolute -bottom-1 left-0 h-px bg-white"
                  initial={{ width: 0 }}
                  whileHover={{ width: "100%" }}
                  transition={{ duration: 0.3 }}
                />
              </motion.a>
            ))}
          </div>

          {/* Scroll to top button */}
          <motion.button
            onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
            initial={{ opacity: 0, scale: 0 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            whileHover={{ scale: 1.1, rotate: 180 }}
            whileTap={{ scale: 0.9 }}
            transition={{ duration: 0.3 }}
            className="w-12 h-12 border border-white/20 rounded-full flex items-center justify-center text-white hover:bg-white hover:text-black transition-colors"
          >
            ↑
          </motion.button>
        </div>
      </motion.div>
    </footer>
  );
}
