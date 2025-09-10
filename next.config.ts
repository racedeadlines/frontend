import type { NextConfig } from "next"

import createMDX from "@next/mdx"

const nextConfig: NextConfig = {
  pageExtensions: ["mdx", "tsx"],
  reactStrictMode: true,
  images: {
    domains: [], // Add any external image domains here if needed
  },
  experimental: {
    mdxRs: true,
  },
}

const withMDX = createMDX({
  // Add markdown plugins here, as desired
})

// Merge MDX config with Next.js config
export default withMDX(nextConfig)
