module.exports = {
  reactStrictMode: true,

  webpack: (config, options) => {
    config.module.rules.push({
      test: /\.ya?ml$/,
      use: 'js-yaml-loader',
    })

    return config
  },
}
