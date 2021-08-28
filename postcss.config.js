module.exports = {
  plugins: [
    require('postcss-simple-vars'),
    require('postcss-preset-env')({
      stage: 0,
    }),
  ],
};
