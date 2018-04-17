/* eslint-disable */
module.exports = ({ webpack = false } = {}) => {
  const config = {
    "presets": [
      "@babel/preset-env",
      "@babel/preset-react",
      "@babel/preset-stage-0"
    ],
    "plugins": [
      "inline-dotenv"
    ],
    "env": {
      "development": {
        "plugins": [
          "react-hot-loader/babel"
        ]
      },
    },
  }

  const nodeEnv = {
    "plugins": [
      "dynamic-import-node",
      // [
      //   "transform-require-ignore",
      //   {
      //     "extensions": [".sass", ".scss", ".less"]
      //   }
      // ]
    ]
  }

  if (process.env.BABEL_ENV === 'node' && !webpack) config.env.node = nodeEnv

  return config
}
