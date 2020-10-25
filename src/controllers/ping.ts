import { Request, Response } from 'express';
import { getReasonPhrase, StatusCodes } from 'http-status-codes';

class PingController {
    public static index(req: Request, res: Response): any {
        return res.json({
            msg: getReasonPhrase(StatusCodes.OK),
            data: {
                message: 'pong',
            },
        });
    }
}

export default PingController;
