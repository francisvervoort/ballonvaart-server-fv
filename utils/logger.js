const winston = require("winston");
const fs = require("fs");

const { format } = require('winston');
const { combine, timestamp, printf } = format;

const myFormat = printf(({ level, message, timestamp }) => {
  return `${timestamp} - ${level}: ${message}`;
});

const logDir = "log";

if (!fs.existsSync(logDir)) {
  fs.mkdirSync(logDir);
}

const logger = new winston.createLogger({
  format: combine(
    timestamp(),
    myFormat
  ),
  transports: [
    new winston.transports.File({
      filename: `${logDir}/full.log`,
      level: process.env.LOG_LEVEL
    })
  ]
});

if (process.env.NODE_ENV !== "production") {
  logger.add(
    new winston.transports.Console({
      colorize: true,
      level: "debug"
    })
  );
}

module.exports = logger;