import React from "react";
import { motion } from "framer-motion";

interface AnimationWrapperProps {
  children: React.ReactNode;
  delay?: number;
  duration?: number;
  className?: string;
  type?: "fade" | "slide-up" | "slide-down" | "slide-in" | "scale" | "bounce";
}

export const AnimationWrapper: React.FC<AnimationWrapperProps> = ({
  children,
  delay = 0,
  duration = 0.5,
  className = "",
  type = "fade",
}) => {
  let animationProps = {};

  switch (type) {
    case "fade":
      animationProps = {
        initial: { opacity: 0 },
        animate: { opacity: 1 },
        transition: { duration, delay, ease: "easeOut" },
      };
      break;
    case "slide-up":
      animationProps = {
        initial: { opacity: 0, y: 50 },
        animate: { opacity: 1, y: 0 },
        transition: { duration, delay, ease: "easeOut" },
      };
      break;
    case "slide-down":
      animationProps = {
        initial: { opacity: 0, y: -100 },
        animate: { opacity: 1, y: 0 },
        transition: { duration, delay, ease: "easeOut" },
      };
      break;
    case "slide-in":
      animationProps = {
        initial: { opacity: 0, x: -100 },
        animate: { opacity: 1, x: 0 },
        transition: { duration, delay, ease: "easeOut" },
      };
      break;
    case "scale":
      animationProps = {
        initial: { opacity: 0, scale: 0.7 },
        animate: { opacity: 1, scale: 1 },
        transition: { duration, delay, ease: "easeOut" },
      };
      break;
    case "bounce":
      animationProps = {
        initial: { opacity: 0, y: 100 },
        animate: { opacity: 1, y: 0 },
        transition: {
          duration,
          delay,
          type: "spring",
          stiffness: 100,
          damping: 10,
        },
      };
      break;
    default:
      animationProps = {
        initial: { opacity: 0 },
        animate: { opacity: 1 },
        transition: { duration, delay },
      };
  }

  return (
    <motion.div className={className} {...animationProps}>
      {children}
    </motion.div>
  );
};
