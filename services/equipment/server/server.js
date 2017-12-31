
import loopback from 'loopback';
import boot from 'loopback-boot';
import winston from '../logging/logger';
import path from 'path';
const app = module.exports = loopback();
const appLogger = winston.loggers.get('application');

app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

app.start = () => {
  // start the web server
  return app.listen(() => {
    app.emit('started');
    let baseUrl = app.get('url').replace(/\/$/, '');
    appLogger.info('Web server listening at: %s', baseUrl);
    if (app.get('loopback-component-explorer')) {
      let explorerPath = app.get('loopback-component-explorer').mountPath;
      appLogger.info('Browse your REST API at %s%s', baseUrl, explorerPath);
    }
    appLogger.info(`Running with ${process.env.NODE_ENV}`);
  });
};

// Bootstrap the application, configure models, datasources and middleware.
// Sub-apps like REST API are mounted via boot scripts.
boot(app, __dirname, (err) => {
  if (err) { throw err; }

  // start the server if `$ node server.js`
  if (require.main === module) {
    app.start();
  }
});
