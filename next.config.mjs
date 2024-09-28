/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "komas500.s3.eu-north-1.amazonaws.com",
        port: "",
      },
    ],
  },
};

export default nextConfig;
