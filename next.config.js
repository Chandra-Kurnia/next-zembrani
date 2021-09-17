module.exports = {
  reactStrictMode: true,
  images: {
    domains: ['localhost'],
  },
  env: {
    API_SERVER: 'http://localhost:4646',
    // API_SERVER: 'https://zembrani.herokuapp.com',
    APP_URL: 'http://localhost:3000'
    // APP_URL: 'https://next-zembrani.vercel.app/api/login'
  },
  typescript: {
    // !! WARN !!
    // Dangerously allow production builds to successfully complete even if
    // your project has type errors.
    // !! WARN !!
    ignoreBuildErrors: true,
  },
};
