import chai from 'chai';
import { after, before, describe, it } from 'mocha';
import { get as _get } from 'lodash';
import { ScoreService } from '../../../src/services';
// @ts-ignore
import { seedScore } from '../../helpers';
import { ScoreModel } from '../../../src/models';
import { generateUUID } from '../../../src/common/utils';

// Assertion style
chai.should();

let score: any = null;

describe('Score Service', async function () {
    before(async function () {
        // wipe the db
        await ScoreModel.deleteMany({});
        // seed a score instance
        score = await seedScore();
    });
    /*
    GIVEN 1 score instance in the database
    WHEN the init method is called
    THEN it should return 1 score
    */
    describe('init', function () {
        it('should init one score', async function () {
            try {
                const newScore = {
                    contest_uuid: generateUUID(),
                    status: 'active',
                };
                const initScore = ScoreService.init(newScore);
                initScore.should.have
                    .property('contest_uuid')
                    .eq(newScore.contest_uuid);
            } catch (err) {
                throw err;
            }
        });
    });
    /*
    GIVEN 1 score instance in the database
    WHEN the find method is called
    THEN it should return 1 score
    */
    describe('find', function () {
        it('should fetch all scores', async function () {
            try {
                const scores = await ScoreService.find({});
                scores.should.have.length(1);
            } catch (err) {
                throw err;
            }
        });
    });
    /*
    GIVEN 1 score instance in the database
    WHEN the findOne method is called
    THEN it should return 1 score
    */
    describe('findOne', function () {
        it('should fetch one score identified by uuid', async function () {
            try {
                const scores = await ScoreService.findOne({ uuid: score.uuid });
                scores.should.be.an('object');
                scores.should.have.property('uuid').eq(score.uuid);
            } catch (err) {
                throw err;
            }
        });
    });
    /*
    GIVEN 1 score instance in the database
    WHEN the create method is called
    THEN it should create and return 1 score
    */
    describe('create', function () {
        it('should create one score identified by uuid', async function () {
            try {
                const newScore = {
                    contest_uuid: generateUUID(),
                    status: 'active',
                };
                const scores = await ScoreService.create(newScore);
                scores.should.be.an('object');
                scores.should.have
                    .property('contest_uuid')
                    .eq(newScore.contest_uuid);
            } catch (err) {
                throw err;
            }
        });
    });
    /*
    GIVEN 2 score instance in the database
    WHEN the aggregate method is called
    THEN it should return 1 score
    */
    describe('aggregate', function () {
        it('should fetch one score identified by uuid', async function () {
            try {
                const sheetUUID = _get(score, ['sheet', 0, 'uuid'], null);
                if (!sheetUUID) {
                    throw Error('score instance has no sheet');
                }
                const match = { uuid: score.uuid };
                const project = {
                    sheet: {
                        $filter: {
                            input: '$sheet',
                            as: 'sheet',
                            cond: { $eq: ['$$sheet.uuid', sheetUUID] },
                        },
                    },
                    uuid: 1,
                };
                const pipeline = [{ $match: match }, { $project: project }];
                const scores = await ScoreService.aggregate(pipeline);
                scores.should.be.an('array').with.length(1);
                const aggregateScore = scores[0];
                aggregateScore.should.have.property('uuid').eq(match.uuid);
            } catch (err) {
                throw err;
            }
        });
    });
    /*
    GIVEN 2 score instance in the database
    WHEN the updateScore method is called
    THEN it should update 1 score
    */
    describe('updateScore', function () {
        it('should update one score identified by uuid', async function () {
            try {
                const update = {
                    status: 'inactive',
                };
                const updatedScore = await ScoreService.updateScore(
                    score.uuid,
                    update
                );
                updatedScore.should.be.an('object');
                updatedScore.should.have.property('status').eq(update.status);
            } catch (err) {
                throw err;
            }
        });
    });
    /*
    GIVEN 2 score instance in the database
    WHEN the updateSheet method is called
    THEN it should update 1 score sheet
    */
    describe('updateSheet', function () {
        it('should update one score sheet identified by sheetUUID', async function () {
            try {
                const sheetUUID = _get(score, ['sheet', 0, 'uuid'], null);
                if (!sheetUUID) {
                    throw Error('score instance has no sheet.uuid');
                }
                const update = { status: 'approved' };

                const updatedScore = await ScoreService.updateSheet(
                    sheetUUID,
                    update
                );
                updatedScore.should.be.an('object');
                updatedScore.should.have.property('sheet').with.length(1);
                const updatedSheet = updatedScore['sheet'][0];
                updatedSheet.should.have.property('status').eq(update.status);
            } catch (err) {
                throw err;
            }
        });
    });
    /*
    GIVEN 2 score instance in the database
    WHEN the updateSheetStrokes method is called
    THEN it should update 1 score sheet strokes
    */
    describe('updateSheetStrokes', function () {
        it('should update one score sheet strokes identified by sheetUUID and holeId', async function () {
            try {
                const sheetUUID = _get(score, ['sheet', 0, 'uuid'], null);
                if (!sheetUUID) {
                    throw Error('score instance has no sheet.uuid');
                }
                const holeId = '1';
                const update = { strokes: 3 };

                const updatedScore = await ScoreService.updateSheetStrokes(
                    sheetUUID,
                    holeId,
                    update
                );
                updatedScore.should.be.an('object');
                updatedScore.should.have.property('sheet').with.length(1);
                const updatedSheet = updatedScore['sheet'][0];
                const updatedHole = updatedSheet['holes']['1'];
                updatedHole.should.have.property('strokes').eq(update.strokes);
            } catch (err) {
                throw err;
            }
        });
    });
    /*
    GIVEN 2 score instance in the database
    WHEN the findParticipantSheet method is called
    THEN it should find 1 participant sheet
    */
    describe('findParticipantSheet', function () {
        it('should find one participant sheet identified by uuid and participant', async function () {
            try {
                const participant = _get(
                    score,
                    ['sheet', 0, 'participant'],
                    null
                );
                if (!participant) {
                    throw Error('score instance has no participant');
                }
                const match = { uuid: score.uuid };

                const participantSheet = await ScoreService.findParticipantSheet(
                    match,
                    participant
                );
                participantSheet.should.have
                    .property('participant')
                    .eq(participant);
            } catch (err) {
                throw err;
            }
        });
    });
});
