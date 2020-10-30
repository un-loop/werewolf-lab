module.exports = {
    mode: "development",
    entry:  __dirname + "/index.jsx",
    output: {
        filename: "bundle.js",
        path: __dirname
    },

    // Enable sourcemaps for debugging webpack's output.
    devtool: "source-map",

    resolve: {
        extensions: [".js", ".jsx", ".json"]
    },

    module: {

        rules: [
            {
                test: /\.(js|jsx)$/,
                exclude: /node_modules/,
                use: {
                    loader: "babel-loader",
                    options: {
                        presets: [
                            ["@babel/preset-env",
                            {
                                "targets": {
                                    "browsers": ["last 2 chrome versions"]
                                  }
                            }
                            ],
                            "@babel/preset-react",
                        ],
                        plugins: [
                            [
                                "@babel/plugin-transform-runtime",
                                {
                                  "corejs": false,
                                  "helpers": true,
                                  "regenerator": true,
                                  "useESModules": false
                                }
                              ]
                              ]
                    }
                }
            }
        ]
    }
};
