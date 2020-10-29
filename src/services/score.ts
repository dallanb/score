import { BaseService } from './base';
import { ScoreModel } from '../models';
import { ScoreDecorator } from '../decorators';
import { Model } from 'mongoose';
import { set as _set } from 'lodash';

class ScoreService extends BaseService {
    private readonly _model: Model<any>;

    constructor() {
        super();
        this._model = ScoreModel;
    }

    public init(params: any): any {
        return new this._model(...params);
    }

    public async find(query: any): Promise<any> {
        return super.find(this._model, query);
    }

    public async findOne(query: any): Promise<any> {
        return super.findOne(this._model, query);
    }

    protected async findOneAndUpdate(query: any, update: any): Promise<any> {
        return super.findOneAndUpdate(this._model, query, update);
    }

    public async create(document: any): Promise<any> {
        return super.create(this._model, document);
    }

    @ScoreDecorator.notification()
    public async updateScore(uuid: string, params: any): Promise<any> {
        return this.findOneAndUpdate({ uuid }, { $set: params });
    }

    @ScoreDecorator.notification()
    public async updateSheet(sheetUUID: string, params: any): Promise<any> {
        return this.findOneAndUpdate(
            { 'sheet.uuid': sheetUUID },
            {
                $set: Object.entries(params).reduce(
                    (accum: any, [key, value]: any) =>
                        _set(accum, [`sheet.$.${key}`], value),
                    {}
                ),
            }
        );
    }

    @ScoreDecorator.notification()
    public async updateSheetStrokes(
        sheetUUID: string,
        hole: string,
        strokes: string
    ): Promise<any> {
        return this.findOneAndUpdate(
            { 'sheet.uuid': sheetUUID },
            {
                $set: {
                    [`sheet.$.holes.${hole}`]: strokes,
                },
            }
        );
    }
}

export default new ScoreService();
