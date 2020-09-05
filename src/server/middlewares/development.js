const {resolve} = require('path');
const webpack = require('webpack');
const webpackDevMiddleware = require('webpack-dev-middleware');
const webpackHotMiddleware = require('webpack-hot-middleware');
const webpackConfig = require('../../../config/webpack.config.dev');

const compiler = webpack(webpackConfig);

module.exports = function setup(app) {
  app.use(
    webpackDevMiddleware(compiler, {
      publicPath: webpackConfig.output.publicPath,
      stats: {
        colors: true
      }
    })
  );

  app.use(webpackHotMiddleware(compiler));

  //SPA for public user
  app.get('/share/:user', (req, res) => {
    let trackUser = req.cookies['user'];
    if (!trackUser) {
        res.cookie('user', 'detected')
        res.send('Intruder')
    } else {
        res.cookie('target', req.params.user)
        res.sendFile(resolve(__dirname, '..', '..', '..', 'build-dev', 'client', 'index.html'))
    }
  });

  //SPA for site owner
  app.get('/user', (req, res) => {
    res.send('admin site coming soon')
  })


};