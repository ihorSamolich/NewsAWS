/** @type {import('next').NextConfig} */
const nextConfig = {
    reactStrictMode: false,
    images:{
        remotePatterns:[
            {
                protocol: 'https',
                hostname: "tailwindui.com"
            },
            {
                protocol: 'http',
                hostname: "localhost",
                port: "5170"
            },
            {
                protocol: 'http',
                hostname: "appaspapi",
                port: "8080"
            },
            {
                protocol: 'https',
                hostname: "blog.ihor.fun",
            }
        ]
    },
    experimental: {
        serverActions: {
            bodySizeLimit: "20mb",
        },
    },
}

export default nextConfig;
