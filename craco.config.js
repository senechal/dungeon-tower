const path = require("path");
module.exports = {
  webpack: {
    alias: {
      '@images': path.resolve(__dirname, "src/assets/img/"),
      '@fonts': path.resolve(__dirname, "src/assets/fonts/"),
      '@hooks': path.resolve(__dirname, "src/utils/hooks/"),
      '@components': path.resolve(__dirname, "src/components/"),
    }
  }
}