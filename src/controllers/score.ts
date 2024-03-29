import { Request, Response } from 'express';
import { getReasonPhrase, StatusCodes } from 'http-status-codes';

import { BaseController } from './base';
import { ScoreSchema } from '../schemas';
import { ScoreService } from '../services';
import { generateUUID } from '../common/utils';

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
                msg: getReasonPhrase(StatusCodes.OK),
                data: {
                    scores,
                },
            });
        } catch ({
            statusCode = StatusCodes.INTERNAL_SERVER_ERROR,
            msg,
            ...restErr
        }) {
            res.status(statusCode).json({ msg, ...restErr });
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
                msg: getReasonPhrase(StatusCodes.OK),
                data: {
                    scores,
                },
            });
        } catch ({
            statusCode = StatusCodes.INTERNAL_SERVER_ERROR,
            msg,
            ...restErr
        }) {
            res.status(statusCode).json({ msg, ...restErr });
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
                msg: getReasonPhrase(StatusCodes.OK),
                data: {
                    scores,
                },
            });
        } catch ({
            statusCode = StatusCodes.INTERNAL_SERVER_ERROR,
            msg,
            ...restErr
        }) {
            res.status(statusCode).json({ msg, ...restErr });
        }
    };

    // This can probably be combined with the function below
    public fetchParticipantSheetByContestUUID = async (
        req: Request,
        res: Response
    ): Promise<any> => {
        try {
            const { uuid: contest_uuid, participantUUID } = req.params;

            const sheets = await this.service.findParticipantSheet(
                { contest_uuid },
                participantUUID
            );
            if (!sheets) {
                this.throwError(StatusCodes.NOT_FOUND);
            }

            res.json({
                msg: getReasonPhrase(StatusCodes.OK),
                data: {
                    sheets,
                },
            });
        } catch ({
            statusCode = StatusCodes.INTERNAL_SERVER_ERROR,
            msg,
            ...restErr
        }) {
            res.status(statusCode).json({ msg, ...restErr });
        }
    };

    public update = async (req: Request, res: Response): Promise<any> => {
        try {
            const { uuid } = req.params;
            const values = await this.cleanAsync(
                this.schema.updateSchema,
                req.body
            );
            const scores = await this.service.updateScore(uuid, values);

            res.json({
                msg: getReasonPhrase(StatusCodes.OK),
                data: {
                    scores,
                },
            });
        } catch ({
            statusCode = StatusCodes.INTERNAL_SERVER_ERROR,
            msg,
            ...restErr
        }) {
            res.status(statusCode).json({ msg, ...restErr });
        }
    };

    public updateSheet = async (req: Request, res: Response): Promise<any> => {
        try {
            const { uuid } = req.params;
            const values = await this.cleanAsync(
                this.schema.updateSheetSchema,
                req.body
            );

            // consider triggering an event for this action
            const scores = await this.service.updateSheet(uuid, values);
            res.json({
                msg: getReasonPhrase(StatusCodes.OK),
                data: { scores },
            });
        } catch ({
            statusCode = StatusCodes.INTERNAL_SERVER_ERROR,
            msg,
            ...restErr
        }) {
            res.status(statusCode).json({ msg, ...restErr });
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
            const scores = await this.service.updateSheetStrokes(
                uuid,
                holeId,
                values
            );
            res.json({
                msg: getReasonPhrase(StatusCodes.OK),
                data: {
                    scores,
                },
            });
        } catch ({
            statusCode = StatusCodes.INTERNAL_SERVER_ERROR,
            msg,
            ...restErr
        }) {
            res.status(statusCode).json({ msg, ...restErr });
        }
    };
}

export default new ScoreController();
