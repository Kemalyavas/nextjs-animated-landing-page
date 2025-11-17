"use client";

import { motion, useInView } from "framer-motion";
import { IconBolt, IconShield, IconRocket, IconSparkles } from "@tabler/icons-react";
import { useRef } from "react";
import { staggerContainer, fadeInUp, cardHover, iconRotate } from "@/lib/animations";
import { cn } from "@/lib/utils";

interface Feature {
  icon: React.ElementType;
  title: string;
  description: string;
  gradient: string;
}

const features: Feature[] = [
  {
    icon: IconBolt,
    title: "Lightning Fast",
    description:
      "Optimized performance with Next.js 14 and modern web technologies for blazing-fast load times.",
    gradient: "from-yellow-500 to-orange-500",
  },
  {
    icon: IconShield,
    title: "Secure & Reliable",
    description:
      "Built with security best practices and enterprise-grade reliability you can trust.",
    gradient: "from-blue-500 to-cyan-500",
  },
  {
    icon: IconRocket,
    title: "Easy to Scale",
    description:
      "Grow your application seamlessly with our scalable architecture and modern infrastructure.",
    gradient: "from-purple-500 to-pink-500",
  },
  {
    icon: IconSparkles,
    title: "Beautiful Design",
    description:
      "Stunning UI components with smooth animations that create delightful user experiences.",
    gradient: "from-indigo-500 to-violet-500",
  },
];

export default function Features() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section className="py-24 px-6 bg-background relative overflow-hidden">
      {/* Background decoration */}
      <div className="absolute top-0 left-1/2 w-96 h-96 bg-purple-600/10 rounded-full blur-3xl -translate-x-1/2" />
      
      <div ref={ref} className="max-w-7xl mx-auto relative z-10">
        {/* Section header */}
        <motion.div
          initial={{ opacity: 0, y: 30, scale: 0.95 }}
          animate={isInView ? { opacity: 1, y: 0, scale: 1 } : { opacity: 0, y: 30, scale: 0.95 }}
          transition={{ duration: 0.8, ease: [0.6, 0.01, 0.05, 0.95] }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-bold mb-4 bg-gradient-to-r from-white via-purple-200 to-white bg-clip-text text-transparent">
            Why Choose Us
          </h2>
          <p className="text-gray-400 text-lg max-w-2xl mx-auto">
            Powerful features designed to help you build better products faster
          </p>
        </motion.div>

        {/* Features grid with stagger animation */}
        <motion.div
          variants={staggerContainer}
          initial="initial"
          animate={isInView ? "animate" : "initial"}
          className="grid grid-cols-1 md:grid-cols-2 gap-6 lg:gap-8"
        >
          {features.map((feature, index) => (
            <motion.div
              key={index}
              variants={fadeInUp}
              whileHover="hover"
              className="group relative"
            >
              <motion.div
                variants={cardHover}
                className={cn(
                  "glass p-8 rounded-2xl transition-all duration-500",
                  "hover:shadow-2xl hover:shadow-purple-500/30 h-full relative overflow-hidden",
                  "border border-white/5 hover:border-purple-500/30"
                )}
              >
                {/* Animated gradient background on hover */}
                <motion.div
                  initial={{ opacity: 0 }}
                  whileHover={{ opacity: 1 }}
                  transition={{ duration: 0.5 }}
                  className="absolute inset-0 bg-gradient-to-br from-purple-600/5 to-indigo-600/5 rounded-2xl"
                />
                
                <div className="relative z-10">
                  {/* Icon with wiggle animation on hover */}
                  <motion.div
                    variants={iconRotate}
                    className="mb-6 inline-block"
                  >
                    <div className={cn(
                      "w-16 h-16 rounded-xl flex items-center justify-center",
                      "shadow-lg transition-shadow duration-500 bg-gradient-to-br",
                      feature.gradient,
                      "group-hover:shadow-xl"
                    )}>
                      <feature.icon className="w-8 h-8 text-white" stroke={2} />
                    </div>
                  </motion.div>

                  {/* Content */}
                  <h3 className="text-2xl font-semibold mb-3 text-white group-hover:text-purple-200 transition-colors duration-300">
                    {feature.title}
                  </h3>
                  <p className="text-gray-400 leading-relaxed group-hover:text-gray-300 transition-colors duration-300">
                    {feature.description}
                  </p>
                </div>

                {/* Corner accent */}
                <div className={cn(
                  "absolute top-0 right-0 w-20 h-20 opacity-0 group-hover:opacity-10",
                  "transition-opacity duration-500 bg-gradient-to-br rounded-bl-full",
                  feature.gradient
                )} />
              </motion.div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
