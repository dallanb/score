import { ScoreModel } from '../../src/models';
import { generateUUID } from '../../src/common/utils';

const seedScore = async () => {
    return await ScoreModel.create({
        contest_uuid: generateUUID(),
        status: 'active',
        sheet: [
            {
                uuid: generateUUID(),
                participant: generateUUID(),
                handicap: null,
                status: 'pending',
                holes: {
                    '1': {
                        name: 'Uno',
                        uuid: generateUUID(),
                        distance: 424,
                        par: 4,
                        strokes: null,
                    },
                },
            },
        ],
    });
};

export default seedScore;
