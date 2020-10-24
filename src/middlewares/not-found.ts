import { Request, Response, NextFunction } from 'express';
import { getReasonPhrase, StatusCodes } from 'http-status-codes';

const notFoundHandler = (
    request: Request,
    response: Response,
    next: NextFunction
) => {
    const code = StatusCodes.NOT_FOUND;
    const message = getReasonPhrase(code);

    response.status(code).json({ msg: message, data: null, err: null });
};

export default notFoundHandler;
