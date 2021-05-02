import { v4 as uuid_v4 } from 'uuid';
import winston from "winston";

export const generateUUID = () => uuid_v4();

export const sheetScoreCalculator = (
    holes: any
): { score: number; strokes: number } =>
    Object.values(holes).reduce(
        (
            sheetScore: { score: number; strokes: number },
            { strokes, par }: any
        ) => {
            if (strokes) {
                sheetScore.strokes += strokes;
                sheetScore.score += strokes - par;
            }
            return sheetScore;
        },
        { score: 0, strokes: 0 }
    );


export const prettyJson = winston.format.printf(info => {
    if (info.message.constructor === Object) {
        info.message = JSON.stringify(info.message, null, 4);
    }
    return `${info.level}: ${[info.metadata.timestamp]}: ${info.message}`;
});
