import { sheetScoreCalculator } from '../common/utils';
import { Constants } from '../common';

class Score {
    notification(): any {
        return (
            target: any,
            propertyKey: string | symbol,
            descriptor: PropertyDescriptor
        ) => {
            const originalMethod = descriptor.value;
            descriptor.value = async function (...args: any[]) {
                const result = await originalMethod.apply(this, args);
                Score._updateHandler(target, propertyKey, args, result);
                return result;
            };

            return descriptor;
        };
    }

    private static _updateHandler(
        target: any,
        key: string | symbol,
        args: any[],
        document: any
    ): void {
        switch (key) {
            case 'updateSheetStrokes': {
                const sheetUUID = args[0];
                const sheet = document.sheet.find(
                    ({ uuid }: { uuid: string }) => uuid === sheetUUID
                );
                const { score, strokes } = sheetScoreCalculator(sheet.holes);
                target.notify(
                    Constants.TOPICS.SCORES,
                    Constants.EVENTS.SCORES.STROKE_UPDATE,
                    JSON.stringify({
                        uuid: document.uuid,
                        contest_uuid: document.contest_uuid,
                        sheet_uuid: sheet.uuid,
                        participant_uuid: sheet.participant,
                        strokes,
                        score,
                    })
                );
                break;
            }
        }
    }
}

export default new Score();
