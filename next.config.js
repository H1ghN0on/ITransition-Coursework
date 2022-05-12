/** @type {import('next').NextConfig} */

const withCSS = require("@zeit/next-css");

const removeImports = require("next-remove-imports")();

const nextConfig = {
  reactStrictMode: false,
  styledComponents: true,
  env: {
    AXIOS_BASE_URL: "http://localhost:3001",
  },
};
module.exports = removeImports(nextConfig);
