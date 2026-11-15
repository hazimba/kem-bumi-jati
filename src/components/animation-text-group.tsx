"use client";

import { motion } from "motion/react";
import type { ReactNode } from "react";

interface AnimatedTextGroupProps {
  children: ReactNode;
  className?: string;
  staggerDelay?: number;
  duration?: number;
  distance?: number;
  once?: boolean;
}

export const AnimatedTextGroup = ({
  children,
  className,
  staggerDelay = 0.3,
  duration = 0.6,
  distance = 20,
  once = true,
}: AnimatedTextGroupProps) => {
  return (
    <motion.div
      initial="hidden"
      whileInView="visible"
      viewport={{ once, amount: 0.1 }}
      variants={{
        hidden: {},
        visible: {
          transition: {
            staggerChildren: staggerDelay,
          },
        },
      }}
      className={className}
      style={
        {
          "--animation-duration": duration,
          "--animation-distance": distance,
        } as React.CSSProperties
      }>
      {children}
    </motion.div>
  );
};

export const AnimatedTextChild = ({
  children,
  className,
  as = "p",
  duration = 0.6,
  distance = 20,
}: {
  children: ReactNode;
  className?: string;
  as?: "h1" | "h2" | "h3" | "h4" | "p" | "span" | "div";
  duration?: number;
  distance?: number;
}) => {
  const MotionComponent = motion[as];

  return (
    <MotionComponent
      variants={{
        hidden: { opacity: 0, y: distance },
        visible: {
          opacity: 1,
          y: 0,
          transition: { duration, ease: "easeOut" },
        },
      }}
      className={className}>
      {children}
    </MotionComponent>
  );
};
