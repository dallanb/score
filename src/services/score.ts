import { BaseService } from './base';
import { ScoreModel } from '../models';
import { Model } from 'mongoose';

class ScoreService extends BaseService {
    private readonly _model: Model<any>;
    constructor() {
        super();
        this._model = ScoreModel;
    }

    public find = async (query: any) => super.find(this._model, query);

    public findOne = async (query: any) => super.findOne(this._model, query);

    public findOneAndUpdate = async (query: any, update: any) =>
        super.findOneAndUpdate(this._model, query, update);
}

export default new ScoreService();
