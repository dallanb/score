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

    public fetchAll = async (req: Request, res: Response): Promise<any> => {
        try {
            const scores = await this.service.find({});
            res.json({
                message: getReasonPhrase(StatusCodes.OK),
                data: {
                    scores,
                },
            });
        } catch ({
            statusCode = StatusCodes.INTERNAL_SERVER_ERROR,
            message,
            ...restErr
        }) {
            res.status(statusCode).json({ message, ...restErr });
        }
    };

    public fetch = async (req: Request, res: Response): Promise<any> => {
        try {
            const { uuid } = req.params;
            const scores = await this.service.findOne({ uuid });
            if (!scores) {
                this.throwError(StatusCodes.NOT_FOUND);
            }

            res.json({
                message: getReasonPhrase(StatusCodes.OK),
                data: {
                    scores,
                },
            });
        } catch ({
            statusCode = StatusCodes.INTERNAL_SERVER_ERROR,
            message,
            ...restErr
        }) {
            res.status(statusCode).json({ message, ...restErr });
        }
    };

    public fetchByContestUUID = async (
        req: Request,
        res: Response
    ): Promise<any> => {
        try {
            const { uuid: contest_uuid } = req.params;
            const scores = await this.service.findOne({ contest_uuid });
            if (!scores) {
                this.throwError(StatusCodes.NOT_FOUND);
            }
            res.json({
                message: getReasonPhrase(StatusCodes.OK),
                data: {
                    scores,
                },
            });
        } catch ({
            statusCode = StatusCodes.INTERNAL_SERVER_ERROR,
            message,
            ...restErr
        }) {
            res.status(statusCode).json({ message, ...restErr });
        }
    };

    public update = async (req: Request, res: Response): Promise<any> => {
        try {
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
                message: getReasonPhrase(StatusCodes.OK),
                data: {
                    scores,
                },
            });
        } catch ({
            statusCode = StatusCodes.INTERNAL_SERVER_ERROR,
            message,
            ...restErr
        }) {
            res.status(statusCode).json({ message, ...restErr });
        }
    };

    public updateHole = async (req: Request, res: Response): Promise<any> => {
        try {
            const { uuid, holeId } = req.params;
            const values = await this.cleanAsync(
                this.schema.updateHoleSchema,
                req.body
            );
            // consider triggering an event through this
            const scores = await this.service.findOneAndUpdate(
                { 'sheet.uuid': uuid },
                {
                    $set: {
                        [`sheet.$.holes.${holeId}`]: values,
                    },
                }
            );
            res.json({
                message: getReasonPhrase(StatusCodes.OK),
                data: {
                    scores,
                },
            });
        } catch ({
            statusCode = StatusCodes.INTERNAL_SERVER_ERROR,
            message,
            ...restErr
        }) {
            res.status(statusCode).json({ message, ...restErr });
        }
    };
}

export default new ScoreController();
