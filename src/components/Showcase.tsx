"use client";

import { motion, useScroll, useTransform, AnimatePresence } from "framer-motion";
import { useRef, useState, useEffect } from "react";
import { cn } from "@/lib/utils";

const projects = [
  {
    title: "Neural Interface",
    category: "AI/ML",
    year: "2024",
    color: "from-blue-500 to-cyan-500",
    description: "Revolutionary AI-powered neural interface that connects human thoughts directly to digital systems. Built with cutting-edge machine learning algorithms.",
    tech: ["TensorFlow", "Python", "WebGL", "React"],
    image: "🧠",
    stats: { users: "50K+", accuracy: "99.7%", speed: "0.3ms" }
  },
  {
    title: "Quantum Dashboard",
    category: "Enterprise",
    year: "2024",
    color: "from-purple-500 to-pink-500",
    description: "Enterprise-grade analytics dashboard processing quantum-level data streams in real-time. Trusted by Fortune 500 companies.",
    tech: ["Next.js", "TypeScript", "D3.js", "PostgreSQL"],
    image: "⚡",
    stats: { clients: "120+", data: "10TB/day", uptime: "99.99%" }
  },
  {
    title: "Stellar Commerce",
    category: "E-Commerce",
    year: "2025",
    color: "from-orange-500 to-red-500",
    description: "Next-generation e-commerce platform with AI-driven personalization and seamless checkout experience. Scaling globally.",
    tech: ["Shopify", "Node.js", "MongoDB", "Stripe"],
    image: "🚀",
    stats: { gmv: "$50M+", conversion: "4.8%", countries: "85" }
  },
];

export default function Showcase() {
  const containerRef = useRef(null);
  const [selectedProject, setSelectedProject] = useState<number | null>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"],
  });

  return (
    <section ref={containerRef} className="py-40 px-6 bg-black relative overflow-hidden">
      {/* Animated background grid */}
      <div className="absolute inset-0 opacity-[0.03]">
        {[...Array(20)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute h-px bg-white"
            style={{
              top: `${i * 5}%`,
              left: 0,
              right: 0,
            }}
            animate={{
              scaleX: [1, 1.5, 1],
              opacity: [0.3, 0.6, 0.3],
            }}
            transition={{
              duration: 3,
              delay: i * 0.1,
              repeat: Infinity,
              ease: "easeInOut",
            }}
          />
        ))}
      </div>

      <div className="max-w-7xl mx-auto relative z-10">
        <motion.h2
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 1 }}
          className="text-7xl md:text-8xl font-black tracking-tighter mb-32 text-center relative"
        >
          <span className="text-gradient glow-text">Selected Work</span>
          
          {/* Orbiting dots */}
          {[...Array(3)].map((_, i) => (
            <motion.div
              key={i}
              className="absolute w-2 h-2 bg-white rounded-full"
              animate={{
                rotate: 360,
              }}
              transition={{
                duration: 10,
                delay: i * 3.33,
                repeat: Infinity,
                ease: "linear",
              }}
              style={{
                top: "50%",
                left: "50%",
                transformOrigin: "0 0",
                x: -150,
                y: -10,
              }}
            />
          ))}
        </motion.h2>

        <div className="space-y-1">
          {projects.map((project, index) => (
            <ProjectCard 
              key={index} 
              project={project} 
              index={index}
              onClick={() => setSelectedProject(index)}
            />
          ))}
        </div>
      </div>

      {/* Modal */}
      <AnimatePresence>
        {selectedProject !== null && (
          <ProjectModal
            project={projects[selectedProject]}
            onClose={() => setSelectedProject(null)}
          />
        )}
      </AnimatePresence>
    </section>
  );
}

function ProjectCard({ project, index, onClick }: { 
  project: typeof projects[0]; 
  index: number;
  onClick: () => void;
}) {
  const [isHovered, setIsHovered] = useState(false);
  const cardRef = useRef(null);
  const { scrollYProgress } = useScroll({
    target: cardRef,
    offset: ["start end", "end start"],
  });

  const x = useTransform(scrollYProgress, [0, 1], [-100, 100]);
  const opacity = useTransform(scrollYProgress, [0, 0.3, 0.7, 1], [0, 1, 1, 0]);

  return (
    <motion.div
      ref={cardRef}
      style={{ opacity }}
      initial={{ opacity: 0, x: -100 }}
      whileInView={{ opacity: 1, x: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.8, delay: index * 0.15 }}
      onHoverStart={() => setIsHovered(true)}
      onHoverEnd={() => setIsHovered(false)}
      onClick={onClick}
      className="group cursor-pointer border-t border-white/10 py-12 relative overflow-hidden"
    >
      {/* Animated background bar */}
      <motion.div
        className={cn("absolute left-0 top-0 bottom-0 bg-gradient-to-r", project.color)}
        initial={{ width: 0, opacity: 0 }}
        animate={{ 
          width: isHovered ? "100%" : 0,
          opacity: isHovered ? 0.1 : 0
        }}
        transition={{ duration: 0.6, ease: "easeOut" }}
      />

      {/* Moving particles */}
      {isHovered && (
        <>
          {[...Array(20)].map((_, i) => (
            <motion.div
              key={i}
              className="absolute w-1 h-1 bg-white rounded-full"
              initial={{ 
                x: Math.random() * 100,
                y: Math.random() * 100,
                opacity: 0 
              }}
              animate={{
                x: [null, Math.random() * window.innerWidth],
                opacity: [0, 1, 0]
              }}
              transition={{
                duration: 1.5,
                delay: i * 0.05,
              }}
            />
          ))}
        </>
      )}

      <div className="flex flex-col md:flex-row md:items-center justify-between relative z-10 gap-4">
        {/* Left side */}
        <div className="flex items-baseline gap-4 md:gap-12">
          <motion.span 
            className="text-xs md:text-sm font-mono text-gray-500"
            animate={{ 
              x: isHovered ? 20 : 0,
              opacity: isHovered ? 0 : 1 
            }}
            transition={{ duration: 0.3 }}
          >
            0{index + 1}
          </motion.span>

          {/* Title with split animation */}
          <h3 className="text-3xl sm:text-5xl md:text-7xl font-bold overflow-hidden">
            {project.title.split("").map((char, i) => (
              <motion.span
                key={i}
                className="inline-block"
                animate={{
                  y: isHovered ? -10 : 0,
                  rotateX: isHovered ? 20 : 0,
                }}
                transition={{ 
                  duration: 0.3,
                  delay: i * 0.02 
                }}
                style={{ transformStyle: "preserve-3d" }}
              >
                {char === " " ? "\u00A0" : char}
              </motion.span>
            ))}
          </h3>
        </div>

        {/* Right side */}
        <div className="flex items-center gap-4 md:gap-12 text-gray-500">
          <motion.span 
            className="text-xs md:text-sm font-mono"
            animate={{ x: isHovered ? -10 : 0 }}
            transition={{ duration: 0.3 }}
          >
            {project.category}
          </motion.span>
          
          <motion.span 
            className="text-xs md:text-sm font-mono"
            animate={{ x: isHovered ? -10 : 0 }}
            transition={{ duration: 0.3, delay: 0.05 }}
          >
            {project.year}
          </motion.span>

          {/* Animated arrow */}
          <motion.div
            className="flex items-center gap-2"
            animate={{ x: isHovered ? 20 : 0 }}
            transition={{ duration: 0.3 }}
          >
            <motion.div
              className="h-px bg-white"
              animate={{ width: isHovered ? 60 : 0 }}
              transition={{ duration: 0.3 }}
            />
            <span className="text-3xl">→</span>
          </motion.div>
        </div>
      </div>

      {/* Bottom accent line */}
      <motion.div
        className="absolute bottom-0 left-0 h-px bg-gradient-to-r from-transparent via-white to-transparent"
        initial={{ scaleX: 0 }}
        animate={{ scaleX: isHovered ? 1 : 0 }}
        transition={{ duration: 0.6 }}
      />
    </motion.div>
  );
}

function ProjectModal({ project, onClose }: { 
  project: typeof projects[0]; 
  onClose: () => void;
}) {
  const [counters, setCounters] = useState({ stat1: 0, stat2: 0, stat3: 0 });

  // Animated counter effect
  useEffect(() => {
    const stats = Object.values(project.stats);
    const extractNumber = (str: string) => parseFloat(str.replace(/[^0-9.]/g, ''));
    
    const timers = stats.map((stat, index) => {
      const target = extractNumber(stat);
      let current = 0;
      const increment = target / 50;
      
      return setInterval(() => {
        current += increment;
        if (current >= target) {
          current = target;
          clearInterval(timers[index]);
        }
        setCounters(prev => ({ ...prev, [`stat${index + 1}`]: current }));
      }, 30);
    });

    return () => timers.forEach(clearInterval);
  }, [project]);

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.3 }}
      className="fixed inset-0 z-[100] flex items-center justify-center px-6 overflow-y-auto py-12"
      onClick={onClose}
    >
      {/* Animated backdrop */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="fixed inset-0 bg-black/95 backdrop-blur-xl"
      >
        {/* Animated mesh gradient background */}
        <motion.div
          className={cn("absolute inset-0 opacity-20 bg-gradient-to-br blur-3xl", project.color)}
          animate={{
            scale: [1, 1.2, 1],
            rotate: [0, 90, 0],
            opacity: [0.2, 0.3, 0.2],
          }}
          transition={{
            duration: 20,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        />
        <motion.div
          className={cn("absolute inset-0 opacity-10 bg-gradient-to-tl blur-3xl", project.color)}
          animate={{
            scale: [1.2, 1, 1.2],
            rotate: [90, 0, 90],
            x: [100, -100, 100],
            y: [-100, 100, -100],
          }}
          transition={{
            duration: 25,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        />
      </motion.div>

      {/* Modal content */}
      <motion.div
        initial={{ scale: 0.9, y: 50, opacity: 0 }}
        animate={{ scale: 1, y: 0, opacity: 1 }}
        exit={{ scale: 0.9, y: 50, opacity: 0 }}
        transition={{ duration: 0.5, ease: [0.34, 1.56, 0.64, 1] }}
        onClick={(e) => e.stopPropagation()}
        className="relative max-w-7xl w-full my-auto"
      >
        <div className="bg-black/40 backdrop-blur-2xl border border-white/10 rounded-3xl overflow-hidden shadow-2xl max-h-[90vh] overflow-y-auto">
          {/* Close button */}
          <motion.button
            whileHover={{ scale: 1.1, rotate: 90 }}
            whileTap={{ scale: 0.9 }}
            onClick={(e) => {
              e.stopPropagation();
              onClose();
            }}
            className="sticky top-8 float-right mr-8 mt-8 z-50 w-14 h-14 flex items-center justify-center bg-white/10 hover:bg-white/20 border border-white/20 rounded-full text-white text-2xl transition-colors backdrop-blur-sm"
          >
            ✕
          </motion.button>

          {/* Hero Section with Project Image */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 md:gap-12 p-6 md:p-12 lg:p-20">
            {/* Left: Project Visual */}
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.2, duration: 0.8 }}
              className="relative group"
            >
              {/* Glowing card background */}
              <div className={cn(
                "absolute -inset-4 bg-gradient-to-br opacity-20 blur-2xl group-hover:opacity-30 transition-opacity duration-500",
                project.color
              )} />
              
              {/* Main visual card */}
              <div className="relative aspect-square rounded-3xl bg-gradient-to-br from-white/5 to-white/[0.02] border border-white/10 p-8 flex items-center justify-center overflow-hidden backdrop-blur-sm">
                {/* Animated grid */}
                <div className="absolute inset-0 opacity-10">
                  {[...Array(6)].map((_, i) => (
                    <motion.div
                      key={`h-${i}`}
                      className="absolute w-full h-px bg-white"
                      style={{ top: `${i * 20}%` }}
                      animate={{ scaleX: [1, 1.1, 1], opacity: [0.3, 0.6, 0.3] }}
                      transition={{ duration: 3, delay: i * 0.2, repeat: Infinity }}
                    />
                  ))}
                  {[...Array(6)].map((_, i) => (
                    <motion.div
                      key={`v-${i}`}
                      className="absolute h-full w-px bg-white"
                      style={{ left: `${i * 20}%` }}
                      animate={{ scaleY: [1, 1.1, 1], opacity: [0.3, 0.6, 0.3] }}
                      transition={{ duration: 3, delay: i * 0.2, repeat: Infinity }}
                    />
                  ))}
                </div>

                {/* Emoji with enhanced animation */}
                <motion.div
                  initial={{ scale: 0, rotate: -180 }}
                  animate={{ scale: 1, rotate: 0 }}
                  whileHover={{ scale: 1.1, rotate: 15 }}
                  transition={{ delay: 0.3, duration: 0.6, type: "spring" }}
                  className="relative z-10"
                >
                  <div 
                    className="text-[8rem] md:text-[12rem] select-none flex items-center justify-center" 
                    style={{ 
                      lineHeight: 1,
                      fontFamily: 'Apple Color Emoji, Segoe UI Emoji, Noto Color Emoji, Android Emoji, EmojiOne Color, Twemoji Mozilla, sans-serif',
                      WebkitFontSmoothing: 'antialiased',
                      MozOsxFontSmoothing: 'grayscale'
                    }}
                  >
                    {project.image}
                  </div>
                </motion.div>
              </div>
            </motion.div>

            {/* Right: Project Info */}
            <motion.div
              initial={{ opacity: 0, x: 50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.3, duration: 0.8 }}
              className="flex flex-col justify-center"
            >
              {/* Category & Year */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.4 }}
                className="flex gap-4 mb-6"
              >
                <span className="px-4 py-2 bg-white/5 border border-white/10 rounded-full text-xs font-mono text-gray-400 backdrop-blur-sm">
                  {project.category}
                </span>
                <span className="px-4 py-2 bg-white/5 border border-white/10 rounded-full text-xs font-mono text-gray-400 backdrop-blur-sm">
                  {project.year}
                </span>
              </motion.div>

              {/* Title with gradient */}
              <motion.h2
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.5 }}
                className="text-4xl sm:text-5xl md:text-7xl font-black mb-6 leading-tight"
              >
                {project.title.split(" ").map((word, i) => (
                  <motion.span
                    key={i}
                    className="inline-block mr-4"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.5 + i * 0.1 }}
                  >
                    {i === project.title.split(" ").length - 1 ? (
                      <span className="text-gradient">{word}</span>
                    ) : (
                      word
                    )}
                  </motion.span>
                ))}
              </motion.h2>

              {/* Description */}
              <motion.p
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.7 }}
                className="text-lg text-gray-300 mb-8 leading-relaxed"
              >
                {project.description}
              </motion.p>

              {/* CTA Buttons */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.8 }}
                className="flex flex-col sm:flex-row gap-4"
              >
                <motion.button
                  whileHover={{ scale: 1.05, boxShadow: "0 0 30px rgba(255,255,255,0.3)" }}
                  whileTap={{ scale: 0.95 }}
                  className="px-6 md:px-8 py-3 md:py-4 bg-white text-black font-bold rounded-full transition-shadow flex items-center justify-center gap-2"
                >
                  <span>View Live</span>
                  <motion.span
                    animate={{ x: [0, 5, 0] }}
                    transition={{ duration: 1.5, repeat: Infinity }}
                  >
                    →
                  </motion.span>
                </motion.button>
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="px-6 md:px-8 py-3 md:py-4 border-2 border-white/20 text-white font-bold rounded-full hover:bg-white/10 transition-colors backdrop-blur-sm"
                >
                  Case Study
                </motion.button>
              </motion.div>
            </motion.div>
          </div>

          {/* Stats Section */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.9 }}
            className="px-6 md:px-12 lg:px-20 pb-12 md:pb-16 border-b border-white/10"
          >
            <div className="grid grid-cols-3 gap-4 md:gap-8">
              {Object.entries(project.stats).map(([key, value], i) => {
                const numValue = parseFloat(value.replace(/[^0-9.]/g, ''));
                const suffix = value.replace(/[0-9.]/g, '');
                
                return (
                  <motion.div
                    key={key}
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ delay: 1 + i * 0.1, type: "spring" }}
                    whileHover={{ scale: 1.05, y: -5 }}
                    className="text-center p-6 rounded-2xl bg-white/5 border border-white/10 backdrop-blur-sm relative overflow-hidden group"
                  >
                    {/* Gradient hover effect */}
                    <motion.div
                      className={cn("absolute inset-0 opacity-0 group-hover:opacity-10 transition-opacity", project.color)}
                      initial={false}
                    />
                    
                    <motion.div
                      className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-black text-white mb-2 relative z-10"
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      transition={{ delay: 1.2 + i * 0.1 }}
                    >
                      {value}
                    </motion.div>
                    <div className="text-[10px] sm:text-xs font-mono text-gray-500 uppercase tracking-wider">
                      {key}
                    </div>
                    
                    {/* Animated underline */}
                    <motion.div
                      className={cn("absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r", project.color)}
                      initial={{ scaleX: 0 }}
                      whileHover={{ scaleX: 1 }}
                      transition={{ duration: 0.3 }}
                    />
                  </motion.div>
                );
              })}
            </div>
          </motion.div>

          {/* Tech Stack */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1.2 }}
            className="px-6 md:px-12 lg:px-20 py-12 md:py-16"
          >
            <h3 className="text-sm font-mono text-gray-500 uppercase tracking-wider mb-8">
              Tech Stack
            </h3>
            <div className="flex flex-wrap gap-4">
              {project.tech.map((tech, i) => (
                <motion.div
                  key={tech}
                  initial={{ opacity: 0, scale: 0, rotate: -10 }}
                  animate={{ opacity: 1, scale: 1, rotate: 0 }}
                  transition={{ delay: 1.3 + i * 0.1, type: "spring", bounce: 0.5 }}
                  whileHover={{ scale: 1.1, y: -5 }}
                  className="relative group"
                >
                  <div className={cn(
                    "absolute -inset-1 bg-gradient-to-r opacity-0 group-hover:opacity-50 blur-lg transition-opacity",
                    project.color
                  )} />
                  <span className="relative px-6 py-3 bg-white/5 border border-white/10 rounded-full text-sm font-mono backdrop-blur-sm block">
                    {tech}
                  </span>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>
      </motion.div>
    </motion.div>
  );
}
