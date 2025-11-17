"use client";

import { motion } from "framer-motion";
import { IconBrandGithub, IconBrandTwitter, IconBrandLinkedin, IconMail } from "@tabler/icons-react";
import { scaleOnHover } from "@/lib/animations";
import { cn } from "@/lib/utils";

const socialLinks = [
  { icon: IconBrandGithub, href: "#", label: "GitHub" },
  { icon: IconBrandTwitter, href: "#", label: "Twitter" },
  { icon: IconBrandLinkedin, href: "#", label: "LinkedIn" },
  { icon: IconMail, href: "#", label: "Email" },
];

export default function Footer() {
  return (
    <footer className="bg-darkAccent py-12 px-6 border-t border-white/5">
      <div className="max-w-7xl mx-auto">
        {/* Social links with enhanced animations */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, ease: [0.6, 0.01, 0.05, 0.95] }}
          className="flex justify-center gap-6 mb-8"
        >
          {socialLinks.map((social, index) => (
            <motion.a
              key={index}
              href={social.href}
              variants={scaleOnHover}
              initial="initial"
              whileHover="hover"
              whileTap="tap"
              transition={{ delay: index * 0.1 }}
              className={cn(
                "relative w-12 h-12 glass rounded-full flex items-center justify-center",
                "hover:bg-purple-500/10 transition-all duration-300 group overflow-hidden",
                "border border-white/5 hover:border-purple-500/30"
              )}
              aria-label={social.label}
            >
              {/* Gradient background on hover */}
              <motion.div
                initial={{ scale: 0, opacity: 0 }}
                whileHover={{ scale: 1, opacity: 0.1 }}
                transition={{ duration: 0.4 }}
                className="absolute inset-0 bg-gradient-to-br from-purple-600 to-indigo-600 rounded-full"
              />
              <social.icon className="w-5 h-5 text-gray-400 group-hover:text-purple-300 transition-colors duration-300 relative z-10" stroke={1.5} />
            </motion.a>
          ))}
        </motion.div>

        {/* Copyright with fade in */}
        <motion.div 
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.4 }}
          className="text-center text-gray-500 text-sm"
        >
          <p>© {new Date().getFullYear()} Modern Landing. All rights reserved.</p>
        </motion.div>
      </div>
    </footer>
  );
}
