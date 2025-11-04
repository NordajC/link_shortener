const winston = require('winston');

// Determine the log level based on the environment
const level = process.env.NODE_ENV === 'production' ? 'info' : 'debug';

// Define different formats for development and production
const format = process.env.NODE_ENV === 'production'
  ? winston.format.combine(
      winston.format.timestamp(),
      winston.format.json(),
      winston.format.errors({ stack: true })
      //development format
    )
  : winston.format.combine(
      winston.format.colorize(),
      winston.format.timestamp({ format: 'YYYY-MM-DD HH:mm:ss' }),
      winston.format.errors({ stack: true }),
      winston.format.printf(info => `${info.timestamp} ${info.level}: ${info.message}`)
      //production format
    );

// Create the logger instance
const logger = winston.createLogger({
  level: level,
  format: format,
  transports: [
    // All logs will be output to the console
    new winston.transports.Console(),
  ],
});

module.exports = logger;