import { Request, Response, NextFunction } from 'express';
import { getReasonPhrase, StatusCodes } from 'http-status-codes';

const notFoundHandler = (
    request: Request,
    response: Response,
    next: NextFunction
) => {
    const code = StatusCodes.NOT_FOUND;
    const message = getReasonPhrase(code);

    response.status(code).json({ message, data: null, error: null });
    next();
};

export default notFoundHandler;
