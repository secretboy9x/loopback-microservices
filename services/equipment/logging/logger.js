import path from 'path';
import fs from 'fs';

const dir = 'logs';

if (!fs.existsSync(dir)) {
  fs.mkdirSync(dir);
}

let logger = require('winston-config').fromFileSync(path.join(__dirname, 'winston-config.json'));

process.on('uncaughtException', (error) => {
  logger.loggers.get('exception').error(error);
});

module.exports = logger;
