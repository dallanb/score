import Joi from 'joi';
import { Document, Model } from 'mongoose';

export class BaseService {
    public static clean(schema: Joi.Schema, instance: any) {
        return schema.validate(instance);
    }
    public static async cleanAsync(schema: Joi.Schema, instance: any) {
        return await schema.validateAsync(instance);
    }

    protected async find(model: Model<any>, query: any) {
        return await model.find(query).exec();
    }
    protected async findOne(model: Model<any>, query: any) {
        return await model.findOne(query).exec();
    }

    protected async findOneAndUpdate(
        model: Model<any>,
        query: any,
        update: any
    ) {
        return await model
            .findOneAndUpdate(query, update, { new: true })
            .exec();
    }

    protected async create(model: Model<any>, document: any) {
        return await model.create(document);
    }
}
