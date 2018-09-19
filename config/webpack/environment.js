const {environment} = require('@rails/webpacker');

environment.loaders.append('js.erb', {
  test: /\.js(\.erb)?$/,
  exclude: /node_modules/,
  loader: 'babel-loader',
  options: {
    presets: [
      ['env', {modules: false}]
    ]
  }
});


environment.loaders.append('less', {
  test: /\.less$/,
  use: [{
    loader: 'style-loader'
  }, {
    loader: 'css-loader'
  }, {
    loader: 'less-loader',
    options: {
      javascriptEnabled: true
    }
  }]
});

environment.loaders.get('sass').use.splice(-1, 0, {
  loader: 'resolve-url-loader',
  options: {
    attempts: 1
  }
});

module.exports = environment;
