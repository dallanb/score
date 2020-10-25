import { BaseService } from './base';
import { ScoreModel } from '../models';
import { Document, Model } from 'mongoose';

class ScoreService extends BaseService {
    private readonly _model: Model<any>;
    constructor() {
        super();
        this._model = ScoreModel;
    }

    public init = (params: any) => new this._model(...params);

    public find = async (query: any) => super.find(this._model, query);

    public findOne = async (query: any) => super.findOne(this._model, query);

    public findOneAndUpdate = async (query: any, update: any) =>
        super.findOneAndUpdate(this._model, query, update);

    public create = async (document: any) =>
        super.create(this._model, document);
}

export default new ScoreService();
