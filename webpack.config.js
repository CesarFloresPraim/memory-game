const loader = require("css-loader");
const webpack = require("webpack");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const ReactRefreshWebpackPlugin = require("@pmmmwh/react-refresh-webpack-plugin");
const { CleanWebpackPlugin } = require("clean-webpack-plugin");
const CopyWebpackPlugin = require("copy-webpack-plugin");
const path = require("path");

module.exports = (env) => {
  let Base_URL = "";
  let SourceMapType = "";
  let mode = "";

  if (env.development) {
    mode = "development";
    Base_URL = "";
    // SourceMapType = "eval-cheap-module-source-map";
    SourceMapType = false;
  }

  if (env.uat) {
    mode = "development";
    Base_URL = "";
    SourceMapType = false;
  }

  if (env.production) {
    mode = "production";
    Base_URL = "";
    SourceMapType = false;
  }

  return {
    mode,
    entry: "./src/index.js",
    output: {
      path: path.join(__dirname, "build"),
      filename: "js/main.js",
      publicPath: "/",
    },
    devtool: SourceMapType,
    resolve: {
      extensions: [".js", ".jsx", ".ts", ".vue", ".json"],
      alias: {
        "@": path.resolve(__dirname, "src"),
      },
    },
    devServer: {
      hot: true,
      port: 3000,
      //https: {
      //  key: './key.pem',
      //  cert: './cert.pem',
      //},
      open: false,
      compress: true,
      historyApiFallback: true,
      proxy: {
        "/api": {
          target: "https://api.github.com",
          pathRewrite: {
            "^/api": "",
          },
          changeOrigin: true,
        },
      },
    },
    module: {
      rules: [
        {
          test: /\.js$/,
          exclude: /node_modules/,
          use: [
            {
              loader: "babel-loader",
              options: {
                presets: [
                  ["@babel/preset-env"],
                  [
                    "@babel/preset-react",
                    {
                      runtime: "automatic",
                    },
                  ],
                ],
                plugins:
                  mode === "production"
                    ? [
                        ["@babel/plugin-transform-runtime"],
                        ["inline-react-svg"],
                      ]
                    : [
                        ["react-refresh/babel"],
                        ["@babel/plugin-transform-runtime"],
                        ["inline-react-svg"],
                      ],
              },
            },
          ],
        },
        {
          test: /\.css$/,
          use: [
            "style-loader",
            {
              loader: "css-loader",
              options: {
                importLoaders: 1,
                esModule: false,
              },
            },
            {
              loader: "postcss-loader",
              options: {
                postcssOptions: {
                  plugins: [
                    require("tailwindcss"),
                    require("autoprefixer"),
                    require("postcss-preset-env"),
                  ],
                },
              },
            },
          ],
        },
        {
          test: /\.(jpg|png|gif|svg|jpeg|mp3)/,
          use: [
            {
              loader: "url-loader",
              options: {
                esModule: false,
                name: "[name].[hash:6].[ext]",
                outputPath: "img",
                limit: 30 * 1024,
              },
            },
          ],
        },
        {
          test: /\.(ttf|eof|woff2?)$/,
          type: "asset/resource",
          generator: {
            filename: "font/[name].[hash:6][ext]",
          },
        },
      ],
    },
    plugins: [
      new HtmlWebpackPlugin({
        title: "Memory Game",
        template: "./public/index.html",
        favicon: "./public/favicon.ico",
        manifest: "./public/manifest.json",
      }),
      new CopyWebpackPlugin({
        patterns: [
          {
            from: "public",
            globOptions: {
              ignore: ["**/index.html"],
            },
          },
        ],
      }),
      new CleanWebpackPlugin(),
      new ReactRefreshWebpackPlugin(),
      new webpack.DefinePlugin({
        API_URL: JSON.stringify(Base_URL),
      }),
    ],
  };
};
