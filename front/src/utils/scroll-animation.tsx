import React, { useEffect, useRef } from "react";
import { motion, useAnimation, useInView } from "framer-motion";

interface ScrollAnimationProps {
  children: React.ReactNode;
  delay?: number;
  duration?: number;
  className?: string;
  type?:
    | "fade"
    | "slide-up"
    | "slide-in-left"
    | "slide-in-right"
    | "scale"
    | "bounce";
  threshold?: number;
  once?: boolean;
}

export const ScrollAnimation: React.FC<ScrollAnimationProps> = ({
  children,
  delay = 0,
  duration = 0.5,
  className = "",
  type = "fade",
  threshold = 0.1,
  once = true,
}) => {
  const controls = useAnimation();
  const ref = useRef(null);
  const inView = useInView(ref, { amount: threshold, once });

  let initial = {};
  let animate = {};
  let transition = {};

  switch (type) {
    case "fade":
      initial = { opacity: 0 };
      animate = { opacity: 1 };
      transition = { duration, delay, ease: "easeOut" };
      break;
    case "slide-up":
      initial = { opacity: 0, y: 50 };
      animate = { opacity: 1, y: 0 };
      transition = { duration, delay, ease: "easeOut" };
      break;
    case "slide-in-left":
      initial = { opacity: 0, x: -100 };
      animate = { opacity: 1, x: 0 };
      transition = { duration, delay, ease: "easeOut" };
      break;
    case "slide-in-right":
      initial = { opacity: 0, x: 100 };
      animate = { opacity: 1, x: 0 };
      transition = { duration, delay, ease: "easeOut" };
      break;
    case "scale":
      initial = { opacity: 0, scale: 0.8 };
      animate = { opacity: 1, scale: 1 };
      transition = { duration, delay, ease: "easeOut" };
      break;
    case "bounce":
      initial = { opacity: 0, y: 50 };
      animate = { opacity: 1, y: 0 };
      transition = {
        duration,
        delay,
        type: "spring",
        stiffness: 100,
        damping: 10,
      };
      break;
    default:
      initial = { opacity: 0 };
      animate = { opacity: 1 };
      transition = { duration, delay };
  }

  useEffect(() => {
    if (inView) {
      controls.start(animate);
    }
  }, [controls, inView, animate]);

  return (
    <motion.div
      ref={ref}
      initial={initial}
      animate={controls}
      transition={transition}
      className={className}
    >
      {children}
    </motion.div>
  );
};
