"use client";

import { motion } from "motion/react";
import type { ReactNode } from "react";

type AnimationDirection = "up" | "down" | "left" | "right";

interface AnimatedTextProps {
  children: ReactNode;
  as?: "h1" | "h2" | "h3" | "h4" | "p" | "span" | "div";
  className?: string;
  direction?: AnimationDirection;
  duration?: number;
  delay?: number;
  distance?: number;
  once?: boolean;
  amount?: number;
}

const AnimatedText = ({
  children,
  as = "p",
  className,
  direction = "up",
  duration = 0.7,
  delay = 0,
  distance = 20,
  once = true,
  amount = 0.3,
}: AnimatedTextProps) => {
  const MotionComponent = motion[as];

  const initial = {
    opacity: 0,
    x: direction === "left" ? distance : direction === "right" ? -distance : 0,
    y: direction === "up" ? distance : direction === "down" ? -distance : 0,
  };

  return (
    <MotionComponent
      initial={initial}
      whileInView={{ opacity: 1, x: 0, y: 0 }}
      viewport={{ once, amount }}
      transition={{ duration, delay, ease: "easeOut" }}
      className={className}>
      {children}
    </MotionComponent>
  );
};

export default AnimatedText;
