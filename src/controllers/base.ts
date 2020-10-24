import {
    ReasonPhrases,
    StatusCodes,
    getReasonPhrase,
    getStatusCode,
} from 'http-status-codes';
import Joi, { Err } from 'joi';
import { HTTPException } from '../common';

class Base {
    constructor() {}

    clean = (schema: Joi.Schema, instance: any) => {
        try {
        } catch (err) {
            if (Joi.isError(err)) {
                err = err.details.message;
            }
            this.throwError(StatusCodes.INTERNAL_SERVER_ERROR, err);
        }
    };

    throwError = (httpCode: StatusCodes, msg?: string, err?: string) => {
        throw new HTTPException(
            httpCode,
            msg || getReasonPhrase(httpCode),
            err
        );
    };
}
