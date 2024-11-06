/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        // Cloudinary's hostname
        protocol: "https",
        hostname: "res.cloudinary.com",
        // Optionally, specify a pathname if needed
        // pathname: '/**', // Uncomment and adjust if you want to limit the path
      },
    ],
  },
};

export default nextConfig;
