import { v4 as uuid_v4 } from 'uuid';

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
