import { HTTPException } from '../common';
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

    response.status(status).json({ msg: message, data: null, err });
};

export default errorHandler;
