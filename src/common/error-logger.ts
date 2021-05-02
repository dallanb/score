import expressWinston from 'express-winston';
import logger from './logger';

const errorLogger = expressWinston.errorLogger({
    winstonInstance: logger,
});

export default errorLogger;
