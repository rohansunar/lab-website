/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    domains: ["localhost", "homestaybucket.s3.ap-south-1.amazonaws.com"],
  },
};

module.exports = nextConfig;
