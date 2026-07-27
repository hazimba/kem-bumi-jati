import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  reactCompiler: true,
  images: {
    remotePatterns: [
      new URL(
        "https://img.magnific.com/premium-vector/kbj-creative-abstract-letter-initial-symbol-icon-vector-logo-design_1237311-4358.jpg?semt=ais_hybrid&w=740&q=80"
      ),
      new URL("https://mishu.my/wp-content/uploads/2026/04/example-of-a-training-centre-in-malaysia-1024x1024.webp"),
      new URL("https://orengacademy.com/wp-content/uploads/2026/01/IMG_9168-scaled.jpg"),
      new URL("https://www.plmgrp.com/p/getc-04.jpg"),
    ],
  },
};

export default nextConfig;
