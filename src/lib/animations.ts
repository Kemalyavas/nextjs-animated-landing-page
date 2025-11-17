import { Variants } from "framer-motion";

/**
 * Professional easing curves for premium animations
 */
const easing = {
  smooth: [0.6, 0.01, 0.05, 0.95],
  smoothOut: [0.16, 1, 0.3, 1],
  springy: [0.68, -0.55, 0.265, 1.55],
};

/**
 * Animation variant for fading in elements from below
 * Enhanced with scale and custom cubic-bezier easing
 */
export const fadeInUp: Variants = {
  initial: {
    opacity: 0,
    y: 30,
    scale: 0.95,
  },
  animate: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: {
      duration: 0.8,
      ease: easing.smooth,
    },
  },
};

/**
 * Container variant for staggering children animations
 * Enhanced with delayChildren for better orchestration
 */
export const staggerContainer: Variants = {
  initial: {},
  animate: {
    transition: {
      staggerChildren: 0.12,
      delayChildren: 0.1,
    },
  },
};

/**
 * Variant for word-by-word text reveal in hero section
 * Uses blur effect for more dynamic entrance
 */
export const wordReveal: Variants = {
  initial: {
    opacity: 0,
    y: 50,
    filter: "blur(10px)",
  },
  animate: {
    opacity: 1,
    y: 0,
    filter: "blur(0px)",
    transition: {
      duration: 0.8,
      ease: easing.smoothOut,
    },
  },
};

/**
 * Scale animation for interactive elements (buttons, icons)
 * Enhanced with y-axis movement for lift effect
 */
export const scaleOnHover: Variants = {
  initial: { scale: 1, y: 0 },
  hover: {
    scale: 1.05,
    y: -2,
    transition: {
      type: "spring",
      stiffness: 500,
      damping: 15,
    },
  },
  tap: {
    scale: 0.98,
    y: 0,
  },
};

/**
 * Card hover effect with lift, scale, and rotation
 * Professional 3D-like effect
 */
export const cardHover: Variants = {
  initial: {
    y: 0,
    scale: 1,
  },
  hover: {
    y: -12,
    scale: 1.02,
    transition: {
      duration: 0.5,
      ease: easing.smooth,
    },
  },
};

/**
 * Icon rotation on hover with wiggle effect
 */
export const iconRotate: Variants = {
  initial: {
    rotate: 0,
    scale: 1,
  },
  hover: {
    rotate: [0, -10, 10, -10, 0],
    scale: 1.15,
    transition: {
      duration: 0.5,
      ease: easing.springy,
    },
  },
};

/**
 * Floating animation for background shapes
 * Enhanced with rotation and scale for more dynamic movement
 */
export const floatingShape = (delay: number = 0): Variants => ({
  initial: {
    y: 0,
    x: 0,
    rotate: 0,
    scale: 1,
  },
  animate: {
    y: [0, -30, 0],
    x: [0, 15, -10, 0],
    rotate: [0, 5, -5, 0],
    scale: [1, 1.05, 0.95, 1],
    transition: {
      duration: 8,
      delay,
      repeat: Infinity,
      ease: "easeInOut",
    },
  },
});

/**
 * Bounce animation for scroll indicator with fade effect
 */
export const bounceAnimation: Variants = {
  animate: {
    y: [0, 12, 0],
    opacity: [1, 0.5, 1],
    transition: {
      duration: 2,
      repeat: Infinity,
      ease: "easeInOut",
    },
  },
};

/**
 * Fade in/out for carousel transitions with scale
 */
export const fadeSlide: Variants = {
  enter: {
    opacity: 0,
    x: 100,
    scale: 0.9,
  },
  center: {
    opacity: 1,
    x: 0,
    scale: 1,
    transition: {
      duration: 0.7,
      ease: easing.smooth,
    },
  },
  exit: {
    opacity: 0,
    x: -100,
    scale: 0.9,
    transition: {
      duration: 0.7,
      ease: easing.smooth,
    },
  },
};

/**
 * Shimmer effect for gradient backgrounds
 */
export const shimmer: Variants = {
  initial: {
    backgroundPosition: "200% center",
  },
  animate: {
    backgroundPosition: "-200% center",
    transition: {
      duration: 3,
      repeat: Infinity,
      ease: "linear",
    },
  },
};
