import { Request, Response } from 'express';
import httpStatus from 'http-status-codes';

import { Score } from '../../models';
import { updateSchema } from './schema';

class Scores {
    public static async fetchAll(req: Request, res: Response): Promise<any> {
        try {
            const scores = await Score.find({}).exec();
            res.json({
                msg: 'OK',
                data: {
                    scores,
                },
            });
        } catch (err) {
            res.status(httpStatus.INTERNAL_SERVER_ERROR).json({
                msg: httpStatus[500],
                data: null,
                err: JSON.stringify(err),
            });
        }
    }

    public static async fetch(req: Request, res: Response): Promise<any> {
        try {
            const { uuid } = req.params;
            const scores = await Score.findOne({ uuid }).exec();

            res.json({
                msg: 'OK',
                data: {
                    scores,
                },
            });
        } catch (err) {
            res.status(httpStatus.INTERNAL_SERVER_ERROR).json({
                msg: httpStatus[500],
                data: null,
                err: JSON.stringify(err),
            });
        }
    }

    public static async fetchByContestUUID(
        req: Request,
        res: Response
    ): Promise<any> {
        try {
            const { uuid: contest_uuid } = req.params;
            const scores = await Score.findOne({ contest_uuid }).exec();

            res.json({
                msg: 'OK',
                data: {
                    scores,
                },
            });
        } catch (err) {
            res.status(httpStatus.INTERNAL_SERVER_ERROR).json({
                msg: httpStatus[500],
                data: null,
                err: JSON.stringify(err),
            });
        }
    }

    public static async update(req: Request, res: Response): Promise<any> {
        const { uuid } = req.params;

        try {
            const values = await updateSchema.validateAsync(req.body);
            const scores = await Score.findOneAndUpdate(
                { uuid },
                {
                    $set: values,
                },
                { new: true }
            ).exec();

            res.json({
                msg: 'OK',
                data: {
                    scores,
                },
            });
        } catch (err) {
            res.status(httpStatus.INTERNAL_SERVER_ERROR).json({
                msg: httpStatus[500],
                data: null,
                err,
            });
        }
    }
}

export default Scores;
