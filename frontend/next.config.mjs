
const nextConfig = {
  output: "standalone",

    async rewrites() {
        return [
            {
                source: '/api/:path*',
                destination:
                    process.env.NODE_ENV === 'development'
                        ? 'http://127.0.0.1:8000/:path*'
                        : '/api/',
            },
        ];
    },
};

export default nextConfig;