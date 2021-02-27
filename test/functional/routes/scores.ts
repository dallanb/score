import chai from 'chai';
import chaiHttp from 'chai-http';
import { after, before, describe, it } from 'mocha';
import { get as _get } from 'lodash';
import config from '../../../src/config';
import { generateUUID } from '../../../src/common/utils';
import { ScoreModel } from '../../../src/models';
import { MongoDB } from '../../../src/libs';

// Assertion style
chai.should();
chai.use(chaiHttp);

const host = `${config.HOST}:${config.PORT}`;

describe('Scores API', function () {
    this.timeout(20000);
    let mongo: any = null;
    let score: any = null;

    // connect to mongo
    before(async function () {
        mongo = MongoDB;
        await mongo.connect();
    });

    // wipe the db
    after(async function () {
        mongo.db.dropDatabase();
    });

    // seed a single score instance
    before(async function () {
        score = await ScoreModel.create({
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
    });
    /*
    GIVEN a Express application configured for testing
    WHEN the GET endpoint 'fetchAll' is requested
    THEN check that the response is valid
    */
    describe('GET /scores', function () {
        it('should get all scores', async function () {
            try {
                const res = await chai.request(host).get('/scores');
                res.should.have.status(200);
                res.body.should.be.a('object');
                res.body.should.have.property('message').eq('OK');
                res.body.should.have.nested.property('data.scores');
                const scores = res.body['data']['scores'];
                scores.should.have.length(1);
            } catch (err) {
                throw err;
            }
        });
    });

    /*
    GIVEN a Express application configured for testing
    WHEN the GET endpoint 'fetch' is requested
    THEN check that the response is valid
    */
    describe('GET /scores/:uuid', function () {
        it('should get single score identified by uuid', async function () {
            try {
                const res = await chai
                    .request(host)
                    .get(`/scores/${score.uuid}`);
                res.should.have.status(200);
                res.body.should.be.a('object');
                res.body.should.have.property('message').eq('OK');
                res.body.should.have.nested.property('data.scores');
            } catch (err) {
                throw err;
            }
        });
    });
    /*
    GIVEN a Express application configured for testing
    WHEN the GET endpoint 'fetchByContestUUID' is requested
    THEN check that the response is valid
    */
    describe('GET /scores/contest/:uuid', function () {
        it('should get single score identified by contest_uuid', async function () {
            try {
                const res = await chai
                    .request(host)
                    .get(`/scores/contest/${score.contest_uuid}`);
                res.should.have.status(200);
                res.body.should.be.a('object');
                res.body.should.have.property('message').eq('OK');
                res.body.should.have.nested.property('data.scores');
            } catch (err) {
                throw err;
            }
        });
    });
    /*
    GIVEN a Express application configured for testing
    WHEN the GET endpoint 'fetchParticipantSheetByContestUUID' is requested
    THEN check that the response is valid
    */
    describe('GET /scores/contest/:uuid/sheets/:participantUUID', function () {
        it('should get single participant sheet identified by contest_uuid and participant_uuid', async function () {
            try {
                const participant = _get(
                    score,
                    ['sheet', 0, 'participant'],
                    null
                );
                if (!participant) {
                    throw Error('score instance has no participant');
                }
                const res = await chai
                    .request(host)
                    .get(
                        `/scores/contest/${score.contest_uuid}/sheets/${participant}`
                    );
                res.should.have.status(200);
                res.body.should.be.a('object');
                res.body.should.have.property('message').eq('OK');
                res.body.should.have.nested.property('data.sheets');
            } catch (err) {
                throw err;
            }
        });
    });
    /*
    GIVEN a Express application configured for testing
    WHEN the PUT endpoint 'update' is requested
    THEN check that the response is valid
    */
    describe('PUT /scores/:uuid', function () {
        it('should update single score identified by uuid', async function () {
            try {
                const update = { status: 'inactive' };
                const res = await chai
                    .request(host)
                    .put(`/scores/${score.uuid}`)
                    .send(update);
                res.should.have.status(200);
                res.body.should.be.a('object');
                res.body.should.have.property('message').eq('OK');
                res.body.should.have.nested.property('data.scores');
                const scores = res.body['data']['scores'];
                scores.should.have.property('status').eq(update.status);
            } catch (err) {
                throw err;
            }
        });
    });
    /*
    GIVEN a Express application configured for testing
    WHEN the PUT endpoint 'updateSheet' is requested
    THEN check that the response is valid
    */
    describe('PUT /scores/sheets/:uuid', function () {
        it('should update single sheet identified by sheet uuid', async function () {
            try {
                const uuid = _get(score, ['sheet', 0, 'uuid'], null);
                if (!uuid) {
                    throw Error('score instance has no sheet');
                }
                const update = { status: 'approved' };
                const res = await chai
                    .request(host)
                    .put(`/scores/sheets/${uuid}`)
                    .send(update);
                res.should.have.status(200);
                res.body.should.be.a('object');
                res.body.should.have.property('message').eq('OK');
                res.body.should.have.nested.property('data.scores');
                const scores = res.body['data']['scores'];
                scores.should.have.property('sheet').length(1);
                const sheet = scores['sheet'][0];
                sheet.should.have.property('status').eq(update.status);
            } catch (err) {
                throw err;
            }
        });
    });
    /*
    GIVEN a Express application configured for testing
    WHEN the PUT endpoint 'updateHole' is requested
    THEN check that the response is valid
    */
    describe('PUT /scores/sheets/:uuid/hole/:holeId', function () {
        it('should update single hole identified by sheet uuid and hole id', async function () {
            try {
                const sheetUUID = _get(score, ['sheet', 0, 'uuid'], null);
                if (!sheetUUID) {
                    throw Error('score instance has no sheet');
                }
                const holeId = 1;
                const update = { strokes: 3 };
                const res = await chai
                    .request(host)
                    .put(`/scores/sheets/${sheetUUID}/holes/${holeId}`)
                    .send(update);
                res.should.have.status(200);
                res.body.should.be.a('object');
                res.body.should.have.property('message').eq('OK');
                res.body.should.have.nested.property('data.scores');
                const scores = res.body['data']['scores'];
                scores.should.have.property('sheet').length(1);
                const hole = scores['sheet'][0]['holes']['1'];
                hole.should.have.property('strokes').eq(update.strokes);
            } catch (err) {
                throw err;
            }
        });
    });
    // wipe the db
    after(async function () {
        mongo.db.dropDatabase();
    });

    // disconnect to from the mongo
    after(async function () {
        await mongo.disconnect();
    });
});
