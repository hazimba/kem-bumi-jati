import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  reactCompiler: true,
  images: {
    remotePatterns: [
      new URL(
        "https://img.magnific.com/premium-vector/kbj-creative-abstract-letter-initial-symbol-icon-vector-logo-design_1237311-4358.jpg?semt=ais_hybrid&w=740&q=80"
      ),
      {
        protocol: "https",
        hostname: "mishu.my",
      },
      {
        protocol: "https",
        hostname: "orengacademy.com",
      },
      {
        protocol: "https",
        hostname: "www.plmgrp.com",
      },
      {
        protocol: "https",
        hostname: "infinity.edu.my",
      },
      {
        protocol: "https",
        hostname: "cadtraining.com.my",
      },
      {
        protocol: "https",
        hostname: "www.bikesrepublic.com",
      },
      {
        protocol: "https",
        hostname: "mmcgamudamrt.com.my",
      },
      {
        protocol: "https",
        hostname: "storage.googleapis.com",
      },
      {
        protocol: "https",
        hostname: "www.timetraining.ae",
      },
      {
        protocol: "https",
        hostname: "encrypted-tbn0.gstatic.com",
      },
      {
        protocol: "https",
        hostname: "cdn.hach.com",
      },
    ],
  },
};

export default nextConfig;
