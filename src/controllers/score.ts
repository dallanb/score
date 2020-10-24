import { Request, Response } from 'express';
import { getReasonPhrase, StatusCodes } from 'http-status-codes';

import { BaseController } from './base';
import { ScoreSchema } from '../schemas';
import { ScoreService } from '../services';

class ScoreController extends BaseController {
    private readonly schema: typeof ScoreSchema;
    private readonly service: typeof ScoreService;
    constructor() {
        super();
        this.schema = ScoreSchema;
        this.service = ScoreService;
    }

    public async fetchAll(req: Request, res: Response): Promise<any> {
        const scores = await this.service.find({});
        res.json({
            msg: getReasonPhrase(StatusCodes.OK),
            data: {
                scores,
            },
        });
    }

    public async fetch(req: Request, res: Response): Promise<any> {
        const { uuid } = req.params;
        const scores = await this.service.findOne({ uuid });
        if (!scores) {
            this.throwError(StatusCodes.NOT_FOUND);
        }

        res.json({
            msg: getReasonPhrase(StatusCodes.OK),
            data: {
                scores,
            },
        });
    }

    public async fetchByContestUUID(req: Request, res: Response): Promise<any> {
        const { uuid: contest_uuid } = req.params;
        const scores = await this.service.findOne({ contest_uuid });
        if (!scores) {
            this.throwError(StatusCodes.NOT_FOUND);
        }
        res.json({
            msg: getReasonPhrase(StatusCodes.OK),
            data: {
                scores,
            },
        });
    }

    public async update(req: Request, res: Response): Promise<any> {
        const { uuid } = req.params;
        const values = await this.cleanAsync(
            this.schema.updateSchema,
            req.body
        );
        const scores = await this.service.findOneAndUpdate(
            { uuid },
            { $set: values }
        );

        res.json({
            msg: getReasonPhrase(StatusCodes.OK),
            data: {
                scores,
            },
        });
    }
}

export default new ScoreController();
