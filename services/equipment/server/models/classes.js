import winston from 'winston';

const debugLogger = winston.loggers.get('debug');

module.exports = (Classes) => {
/**
 * Get Class by name
 * @param {number} id class id
 * @param {Function(Error)} callback
 */
  Classes.getName = function(id, callback) {
    debugLogger.debug('calling remote method');
    // TODO
    callback(null);
  };
};
