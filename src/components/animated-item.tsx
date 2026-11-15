"use client";

import { motion } from "motion/react";
import type { ReactNode } from "react";

type AnimationDirection = "up" | "down" | "left" | "right";

interface AnimatedItemProps {
  children: ReactNode;
  as?: "div" | "li" | "section" | "article" | "span";
  className?: string;
  index?: number;
  staggerDelay?: number;
  delay?: number;
  duration?: number;
  distance?: number;
  direction?: AnimationDirection;
  once?: boolean;
  margin?: string;
}

const AnimatedItem = ({
  children,
  as = "div",
  className,
  index = 0,
  staggerDelay = 0.1,
  delay = 0,
  duration = 0.5,
  distance = 20,
  direction = "up",
  once = true,
  margin = "-50px",
}: AnimatedItemProps) => {
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
      viewport={{ once, margin }}
      transition={{
        duration,
        delay: delay + index * staggerDelay,
        ease: "easeOut",
      }}
      className={className}>
      {children}
    </MotionComponent>
  );
};

export default AnimatedItem;
