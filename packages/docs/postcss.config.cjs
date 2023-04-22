module.exports = {
  plugins: [
    require('tailwindcss/nesting')(require('postcss-nesting')),
    require('tailwindcss'),
    require('postcss-preset-env')({
      stage: 0,
      features: {'nesting-rules': false},
    }),
  ],
};
