/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
}

module.exports = {
  images: {
    domains: ['localhost']
  },
  env: {
    apiLink: process.env.API
  }
}
