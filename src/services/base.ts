import Joi from 'joi';
import { Model } from 'mongoose';

export class BaseService {
    public static clean(schema: Joi.Schema, instance: any) {
        return schema.validate(instance);
    }
    public static async cleanAsync(schema: Joi.Schema, instance: any) {
        return schema.validateAsync(instance);
    }

    protected async find(model: Model<any>, query: any) {
        return model.find(query).exec();
    }
    protected async findOne(model: Model<any>, query: any) {
        return model.findOne(query).exec();
    }

    protected async findOneAndUpdate(
        model: Model<any>,
        query: any,
        update: any
    ) {
        return model.findOneAndUpdate(query, update, { new: true }).exec();
    }
}
