"use client";

import { motion } from "framer-motion";
import { useEffect, useRef, useState } from "react";

export default function Scene3D() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [speed, setSpeed] = useState(1);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const canvasWidth = canvas.width;
    const canvasHeight = canvas.height;

    // Set canvas size
    const setSize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };
    setSize();
    window.addEventListener("resize", setSize);

    // Particle system
    class Particle {
      x: number;
      y: number;
      z: number;
      vx: number;
      vy: number;
      vz: number;
      size: number;
      canvasWidth: number;
      canvasHeight: number;

      constructor(w: number, h: number) {
        this.canvasWidth = w;
        this.canvasHeight = h;
        this.x = (Math.random() - 0.5) * this.canvasWidth * 2;
        this.y = (Math.random() - 0.5) * this.canvasHeight * 2;
        this.z = Math.random() * 2000;
        this.vx = (Math.random() - 0.5) * 0.5;
        this.vy = (Math.random() - 0.5) * 0.5;
        this.vz = Math.random() * 2 + 1;
        this.size = Math.random() * 2 + 1;
      }

      update(w: number, h: number, speedMultiplier: number) {
        this.canvasWidth = w;
        this.canvasHeight = h;
        this.x += this.vx * speedMultiplier;
        this.y += this.vy * speedMultiplier;
        this.z -= this.vz * speedMultiplier;

        if (this.z < 1) {
          this.z = 2000;
          this.x = (Math.random() - 0.5) * this.canvasWidth * 2;
          this.y = (Math.random() - 0.5) * this.canvasHeight * 2;
        }
      }

      draw(ctx: CanvasRenderingContext2D) {
        const x = (this.x / this.z) * 1000 + this.canvasWidth / 2;
        const y = (this.y / this.z) * 1000 + this.canvasHeight / 2;
        const size = (1 - this.z / 2000) * this.size * 3;

        ctx.beginPath();
        ctx.arc(x, y, size, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(255, 255, 255, ${1 - this.z / 2000})`;
        ctx.fill();
      }
    }

    // Create particles
    const particles: Particle[] = [];
    for (let i = 0; i < 500; i++) {
      particles.push(new Particle(canvas.width, canvas.height));
    }

    // Animation loop
    let animationId: number;
    const animate = () => {
      ctx.fillStyle = "rgba(0, 0, 0, 0.1)";
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      particles.forEach((particle) => {
        particle.update(canvas.width, canvas.height, speed);
        particle.draw(ctx);
      });

      animationId = requestAnimationFrame(animate);
    };
    animate();

    return () => {
      window.removeEventListener("resize", setSize);
      cancelAnimationFrame(animationId);
    };
  }, [speed]);

  return (
    <div className="absolute inset-0 overflow-hidden">
      {/* Speed Control */}
      <motion.div
        initial={{ opacity: 0, x: 50 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ delay: 1, duration: 0.8 }}
        className="absolute top-8 right-8 z-50 bg-white/5 backdrop-blur-md border border-white/10 rounded-2xl p-6 min-w-[280px]"
      >
        <div className="flex items-center justify-between mb-4">
          <span className="text-white font-bold text-sm tracking-wider">ACCELERATE TIME!</span>
          <motion.span
            className="text-white/60 font-mono text-xs"
            key={speed}
            initial={{ scale: 1.5, color: "rgba(255,255,255,1)" }}
            animate={{ scale: 1, color: "rgba(255,255,255,0.6)" }}
          >
            {speed.toFixed(1)}x
          </motion.span>
        </div>
        <input
          type="range"
          min="0.5"
          max="5"
          step="0.1"
          value={speed}
          onChange={(e) => setSpeed(parseFloat(e.target.value))}
          className="w-full h-2 bg-white/10 rounded-full appearance-none cursor-pointer
            [&::-webkit-slider-thumb]:appearance-none
            [&::-webkit-slider-thumb]:w-4
            [&::-webkit-slider-thumb]:h-4
            [&::-webkit-slider-thumb]:rounded-full
            [&::-webkit-slider-thumb]:bg-white
            [&::-webkit-slider-thumb]:cursor-pointer
            [&::-webkit-slider-thumb]:shadow-[0_0_10px_rgba(255,255,255,0.5)]
            [&::-webkit-slider-thumb]:hover:scale-110
            [&::-webkit-slider-thumb]:transition-transform
            [&::-moz-range-thumb]:w-4
            [&::-moz-range-thumb]:h-4
            [&::-moz-range-thumb]:rounded-full
            [&::-moz-range-thumb]:bg-white
            [&::-moz-range-thumb]:border-0
            [&::-moz-range-thumb]:cursor-pointer
            [&::-moz-range-thumb]:shadow-[0_0_10px_rgba(255,255,255,0.5)]"
          style={{
            background: `linear-gradient(to right, rgba(255,255,255,0.3) 0%, rgba(255,255,255,0.3) ${((speed - 0.5) / 4.5) * 100}%, rgba(255,255,255,0.1) ${((speed - 0.5) / 4.5) * 100}%, rgba(255,255,255,0.1) 100%)`
          }}
        />
        <div className="flex justify-between mt-2 text-[10px] text-white/40 font-mono">
          <span>SLOW</span>
          <span>FAST</span>
        </div>
      </motion.div>

      {/* Canvas particles */}
      <canvas
        ref={canvasRef}
        className="absolute inset-0 opacity-40"
      />

      {/* Animated gradient orbs */}
      <motion.div
        animate={{
          scale: [1, 1.3, 1],
          opacity: [0.1, 0.3, 0.1],
          rotate: [0, 360],
        }}
        transition={{
          duration: 20,
          repeat: Infinity,
          ease: "linear",
        }}
        className="absolute top-0 left-1/4 w-[600px] h-[600px] bg-gradient-radial from-white/20 via-white/10 to-transparent rounded-full blur-3xl"
      />

      <motion.div
        animate={{
          scale: [1.2, 1, 1.2],
          opacity: [0.2, 0.4, 0.2],
          rotate: [360, 0],
        }}
        transition={{
          duration: 25,
          repeat: Infinity,
          ease: "linear",
        }}
        className="absolute bottom-0 right-1/4 w-[700px] h-[700px] bg-gradient-radial from-white/15 via-white/5 to-transparent rounded-full blur-3xl"
      />

      <motion.div
        animate={{
          scale: [1, 1.4, 1],
          x: [-100, 100, -100],
          y: [-50, 50, -50],
          opacity: [0.15, 0.35, 0.15],
        }}
        transition={{
          duration: 30,
          repeat: Infinity,
          ease: "easeInOut",
        }}
        className="absolute top-1/2 left-1/2 w-[500px] h-[500px] bg-gradient-radial from-white/10 to-transparent rounded-full blur-2xl"
      />

      {/* Floating geometric shapes */}
      {[...Array(6)].map((_, i) => (
        <motion.div
          key={i}
          className="absolute border border-white/5"
          style={{
            width: 100 + i * 50,
            height: 100 + i * 50,
            left: `${20 + i * 10}%`,
            top: `${10 + i * 15}%`,
          }}
          animate={{
            rotate: [0, 360],
            scale: [1, 1.1, 1],
          }}
          transition={{
            duration: 20 + i * 5,
            repeat: Infinity,
            ease: "linear",
          }}
        />
      ))}
    </div>
  );
}
