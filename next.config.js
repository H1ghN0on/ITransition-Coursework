/** @type {import('next').NextConfig} */

const withCSS = require("@zeit/next-css");

const removeImports = require("next-remove-imports")();

const nextConfig = {
  styledComponents: true,
  env: {
    AXIOS_BASE_URL: "https://voenmeh-practice-server.herokuapp.com",
    S3_USER_AVATARS:
      "https://itransition-coursework.s3.amazonaws.com/avatars/users",
    S3_COLLECTION_AVATARS:
      "https://itransition-coursework.s3.amazonaws.com/avatars/collections",
  },
};
module.exports = removeImports(nextConfig);
