const path = require("path");
const HtmlWebpackPlugin = require("html-webpack-plugin");

const VENDOR_LIBS = [
  "react",
  "react-dom",
  "react-router-dom",
  "ash-text-analyzer",
  "text-analyzer-ui-kit",
];

module.exports = {
  entry: {
    bundle: './src/index.tsx',
    vendor: VENDOR_LIBS,
  },
  output: {
    path: path.resolve(__dirname, "dist"),
    filename: "[name].[hash].js",
    chunkFilename: "[name].[hash].js",
    publicPath: "auto",
  },
  resolve: {
    extensions: [".tsx", ".ts", ".js", ".css"],
  },
  module: {
    rules: [
      {
        test: /\.(ts|tsx)$/,
        exclude: /node_modules/,
        loader: "babel-loader",
        options: {
          babelrc: false,
          presets: [
            "@babel/preset-env",
            "@babel/preset-react",
            "@babel/preset-typescript",
          ],
          plugins: ["@babel/plugin-syntax-dynamic-import"],
        },
      },
      {
        test: /\.css$/,
        use: ["style-loader", "css-loader"],
      },
    ],
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: "./src/index.html",
    }),
  ],
  performance: {
    hints: false,
    maxEntrypointSize: 512000,
    maxAssetSize: 512000,
  },
  optimization: {
    splitChunks: { chunks: "all" },
  },
};
