/** @type {import('next').NextConfig} */
const nextConfig = {
    output: 'standalone',
    reactStrictMode: true,
    webpack: (config) => {
        if(process.env.NODE_ENV == 'development') {
            config.watchOptions = {
                poll: 1000,
                aggregateTimeout: 300,
            };
        }
        return config;
    }
}

module.exports = nextConfig
