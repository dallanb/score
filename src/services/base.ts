import Joi from 'joi';
import { Document, Model } from 'mongoose';
import { Libs } from '../providers';

export class BaseService {
    public static clean(schema: Joi.Schema, instance: any) {
        return schema.validate(instance);
    }
    public static async cleanAsync(schema: Joi.Schema, instance: any) {
        return await schema.validateAsync(instance);
    }

    protected async aggregate(model: Model<any>, pipeline: any) {
        return await model.aggregate(pipeline).exec();
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

    protected async notify(topic: string, key: string, messages: any[]) {
        return Libs.producer.send([
            {
                topic,
                key,
                messages,
            },
        ]);
    }
}
