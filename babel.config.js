module.exports = function (api) {
  api.cache(true);
  return {
    presets: ["babel-preset-expo"],
    plugins: [
      [
        "module-resolver",
        {
          alias: {
            "@": "./",
            src: "./src/",
          },
          extensions: [".js", ".jsx", ".ts", ".tsx"],
        },
      ],
      "react-native-reanimated/plugin",
      [
        "transform-inline-environment-variables",
        {
          include: ["NODE_ENV"],
        },
      ],
    ],
  };
};
