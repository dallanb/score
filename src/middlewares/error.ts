import {HTTPException, logger} from '../common';
import { Request, Response, NextFunction } from 'express';
import { getReasonPhrase, StatusCodes } from 'http-status-codes';

const errorHandler = (
    error: HTTPException,
    request: Request,
    response: Response,
    next: NextFunction
) => {
    const status = error.statusCode || StatusCodes.INTERNAL_SERVER_ERROR;
    const message = error.message || getReasonPhrase(status);
    const err = error.error;
    logger.error({
        msg: message,
        status,
    });
    response.status(status).json({ message, data: null, error: err });
    next();
};

export default errorHandler;
