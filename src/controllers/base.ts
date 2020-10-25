import { StatusCodes, getReasonPhrase } from 'http-status-codes';
import Joi from 'joi';
import { HTTPException, logger } from '../common';
import { BaseService } from '../services';

export class BaseController {
    protected logger: typeof logger;
    constructor() {
        this.logger = logger;
    }

    protected clean = (schema: Joi.Schema, instance: any) => {
        try {
            return BaseService.clean(schema, instance);
        } catch (err) {
            this.throwError(StatusCodes.BAD_REQUEST, err);
        }
    };

    protected cleanAsync = async (schema: Joi.Schema, instance: any) => {
        try {
            return await BaseService.cleanAsync(schema, instance);
        } catch (err) {
            this.throwError(StatusCodes.BAD_REQUEST, undefined, err);
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
