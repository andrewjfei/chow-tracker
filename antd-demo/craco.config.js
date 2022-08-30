const cracoLessPlugin = require('craco-less');

module.exports = {
  plugins: [
    {
      plugin: cracoLessPlugin,
      options: {
        lessLoaderOptions: {
          lessOptions: {
            modifyVars: {
              '@primary-color': '#FF7B33',
            },
            javascriptEnabled: true,
          },
        },
      },
    },
  ],
};
