import { v4 as uuid_v4 } from 'uuid';

export const generateUUID = () => uuid_v4();

export const totalStrokeCalculator = (holes: any) =>
    Object.values(holes).reduce(
        (total: number, { strokes }: any) => total + strokes,
        0
    );
