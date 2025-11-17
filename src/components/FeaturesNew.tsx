"use client";

import { motion, useInView, useScroll, useTransform } from "framer-motion";
import { useRef, useState } from "react";
import Tilt from "react-parallax-tilt";
import { cn } from "@/lib/utils";

interface Feature {
  number: string;
  title: string;
  description: string;
  color: string;
}

const features: Feature[] = [
  {
    number: "01",
    title: "Immersive Design",
    description: "3D experiences that captivate and engage users on a deeper level.",
    color: "from-blue-500/20 to-cyan-500/20",
  },
  {
    number: "02",
    title: "Blazing Performance",
    description: "Optimized for speed without compromising on visual quality.",
    color: "from-purple-500/20 to-pink-500/20",
  },
  {
    number: "03",
    title: "Adaptive Systems",
    description: "Intelligent interfaces that respond to user behavior and context.",
    color: "from-orange-500/20 to-red-500/20",
  },
  {
    number: "04",
    title: "Future-Proof",
    description: "Built with cutting-edge technology for tomorrow's standards.",
    color: "from-green-500/20 to-emerald-500/20",
  },
];

export default function Features() {
  const containerRef = useRef(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"],
  });

  const y = useTransform(scrollYProgress, [0, 1], [100, -100]);
  const opacity = useTransform(scrollYProgress, [0, 0.2, 0.8, 1], [0, 1, 1, 0]);

  return (
    <section ref={containerRef} className="py-40 px-6 bg-black relative overflow-hidden">
      {/* Animated background elements */}
      <motion.div
        style={{ y }}
        className="absolute top-0 right-0 w-96 h-96 bg-gradient-radial from-white/5 to-transparent rounded-full blur-3xl"
      />
      <motion.div
        style={{ y: useTransform(scrollYProgress, [0, 1], [-100, 100]) }}
        className="absolute bottom-0 left-0 w-96 h-96 bg-gradient-radial from-white/5 to-transparent rounded-full blur-3xl"
      />

      <motion.div style={{ opacity }} className="max-w-7xl mx-auto">
        {/* Section header with reveal animation */}
        <div className="mb-32 text-center relative">
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 1 }}
          >
            <motion.h2 
              className="text-7xl md:text-8xl font-black tracking-tighter mb-8 relative inline-block"
            >
              <span className="text-gradient glow-text">Built Different</span>
              {/* Animated underline */}
              <motion.div
                initial={{ width: 0 }}
                whileInView={{ width: "100%" }}
                viewport={{ once: true }}
                transition={{ duration: 1, delay: 0.5 }}
                className="absolute bottom-0 left-0 h-1 bg-gradient-to-r from-transparent via-white to-transparent"
              />
            </motion.h2>
            <p className="text-xl text-gray-400 max-w-2xl mx-auto font-light mt-8">
              Every detail crafted to perfection, every interaction designed to delight
            </p>
          </motion.div>
        </div>

        {/* Features grid with stagger */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {features.map((feature, index) => (
            <FeatureCard key={index} feature={feature} index={index} />
          ))}
        </div>
      </motion.div>
    </section>
  );
}

function FeatureCard({ feature, index }: { feature: Feature; index: number }) {
  const [isHovered, setIsHovered] = useState(false);
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 60 }}
      animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 60 }}
      transition={{ duration: 0.8, delay: index * 0.15 }}
    >
      <Tilt
        tiltMaxAngleX={10}
        tiltMaxAngleY={10}
        glareEnable={true}
        glareMaxOpacity={0.15}
        glareColor="#ffffff"
        glarePosition="all"
        glareBorderRadius="0px"
        className="h-full"
      >
        <motion.div
          onHoverStart={() => setIsHovered(true)}
          onHoverEnd={() => setIsHovered(false)}
          className={cn(
            "group h-full p-12 border border-white/10 relative overflow-hidden",
            "transition-all duration-700 cursor-pointer"
          )}
          whileHover={{ borderColor: "rgba(255, 255, 255, 0.3)" }}
        >
          {/* Animated gradient background */}
          <motion.div
            className={cn("absolute inset-0 bg-gradient-to-br opacity-0", feature.color)}
            animate={{ opacity: isHovered ? 1 : 0 }}
            transition={{ duration: 0.5 }}
          />

          {/* Large number in background */}
          <motion.div
            className="text-[200px] font-black text-white/5 absolute -top-20 -right-10 leading-none"
            animate={{ 
              scale: isHovered ? 1.2 : 1,
              rotate: isHovered ? 5 : 0 
            }}
            transition={{ duration: 0.5 }}
          >
            {feature.number}
          </motion.div>

          {/* Content */}
          <div className="relative z-10">
            {/* Small number indicator */}
            <motion.div 
              className="text-sm font-mono text-gray-500 mb-6 flex items-center gap-4"
              animate={{ x: isHovered ? 10 : 0 }}
              transition={{ duration: 0.3 }}
            >
              <span>{feature.number}</span>
              <motion.div
                className="h-px bg-white/20"
                animate={{ width: isHovered ? 60 : 30 }}
                transition={{ duration: 0.3 }}
              />
            </motion.div>

            {/* Title with character animation */}
            <h3 className="text-4xl font-bold mb-6 overflow-hidden">
              {feature.title.split("").map((char, i) => (
                <motion.span
                  key={i}
                  className="inline-block"
                  initial={{ y: 50, opacity: 0 }}
                  animate={isInView ? { y: 0, opacity: 1 } : { y: 50, opacity: 0 }}
                  transition={{ duration: 0.5, delay: index * 0.15 + i * 0.02 }}
                >
                  {char === " " ? "\u00A0" : char}
                </motion.span>
              ))}
            </h3>

            <motion.p 
              className="text-gray-400 leading-relaxed font-light text-lg"
              animate={{ color: isHovered ? "#e5e5e5" : "#9ca3af" }}
              transition={{ duration: 0.3 }}
            >
              {feature.description}
            </motion.p>
          </div>

          {/* Corner accent */}
          <motion.div
            className="absolute bottom-0 right-0 w-32 h-32 border-r border-b border-white/0"
            animate={{ 
              borderColor: isHovered ? "rgba(255, 255, 255, 0.2)" : "rgba(255, 255, 255, 0)",
              width: isHovered ? 120 : 100,
              height: isHovered ? 120 : 100
            }}
            transition={{ duration: 0.5 }}
          />

          {/* Floating particles on hover */}
          {isHovered && (
            <>
              {[...Array(5)].map((_, i) => (
                <motion.div
                  key={i}
                  className="absolute w-1 h-1 bg-white rounded-full"
                  initial={{ 
                    x: Math.random() * 100 + "%",
                    y: Math.random() * 100 + "%",
                    opacity: 0 
                  }}
                  animate={{
                    y: [null, -100],
                    opacity: [0, 1, 0]
                  }}
                  transition={{
                    duration: 2,
                    delay: i * 0.1,
                    repeat: Infinity
                  }}
                />
              ))}
            </>
          )}
        </motion.div>
      </Tilt>
    </motion.div>
  );
}
