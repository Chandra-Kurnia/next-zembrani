module.exports = {
  reactStrictMode: true,
  images: {
    domains: ['localhost'],
  },
  env: {
    API_SERVER: 'https://zembrani.herokuapp.com',
  },
  typescript: {
    // !! WARN !!
    // Dangerously allow production builds to successfully complete even if
    // your project has type errors.
    // !! WARN !!
    ignoreBuildErrors: true,
  },
};
