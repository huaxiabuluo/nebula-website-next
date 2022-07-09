const path = require('path');

/** @type {import('next').NextConfig} */
module.exports = {
  webpack5: true,
  reactStrictMode: true,
  swcMinify: true,
  sassOptions: {
    includePaths: [path.join(__dirname, 'components'), path.join(__dirname, 'styles'), path.join(__dirname, 'src')],
  },
};
