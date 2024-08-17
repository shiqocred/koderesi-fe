/** @type {import('next').NextConfig} */
const nextConfig = {
    images: {
        remotePatterns: [
            {
                hostname: "images.unsplash.com"
            },
            {
                hostname: "koderesi.raventech.my.id"
            }
        ]
    }
};

export default nextConfig;