import { StatusCodes, getReasonPhrase } from 'http-status-codes';
import Joi, { Err } from 'joi';
import { HTTPException } from '../common';
import { BaseService } from '../services';

export class BaseController {
    protected clean = (schema: Joi.Schema, instance: any) => {
        try {
            return BaseService.clean(schema, instance);
        } catch (err) {
            this.throwError(StatusCodes.BAD_REQUEST, err);
        }
    };

    protected cleanAsync = async (schema: Joi.Schema, instance: any) => {
        try {
            return BaseService.cleanAsync(schema, instance);
        } catch (err) {
            this.throwError(StatusCodes.BAD_REQUEST, err);
        }
    };

    protected throwError = (
        httpCode: StatusCodes,
        msg?: string,
        err?: Error
    ) => {
        throw new HTTPException(
            httpCode,
            msg || getReasonPhrase(httpCode),
            err
        );
    };
}
