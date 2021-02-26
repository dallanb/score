import chai from 'chai';
import chaiHttp from 'chai-http';
import { after, before, describe, it } from 'mocha';
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
    let db: any = null;
    before(async function () {
        db = MongoDB;
        await db.connect();
    });
    /*
    GIVEN a Express application configured for testing
    WHEN the GET endpoint 'fetchAll' is requested
    THEN check that the response is valid
    */
    describe('GET /scores', function () {
        it('should get all the scores', async function () {
            try {
                await ScoreModel.create({
                    contest_uuid: generateUUID(),
                    status: 'active',
                });
                const res = await chai.request(host).get('/scores');
                res.should.have.status(200);
                res.body.should.be.a('object');
                res.body.should.have.property('message').eq('OK');
                console.log(res.body);
            } catch (err) {
                throw err;
            }
        });
    });

    after(function () {
        db.disconnect();
    });
    /*
    GIVEN a Express application configured for testing
    WHEN the GET endpoint 'fetch' is requested
    THEN check that the response is valid
    */
    /*
    GIVEN a Express application configured for testing
    WHEN the GET endpoint 'fetchByContestUUID' is requested
    THEN check that the response is valid
    */
    /*
    GIVEN a Express application configured for testing
    WHEN the GET endpoint 'fetchParticipantSheetByContestUUID' is requested
    THEN check that the response is valid
    */
    /*
    GIVEN a Express application configured for testing
    WHEN the PUT endpoint 'update' is requested
    THEN check that the response is valid
    */
    /*
    GIVEN a Express application configured for testing
    WHEN the PUT endpoint 'updateSheet' is requested
    THEN check that the response is valid
    */
    /*
    GIVEN a Express application configured for testing
    WHEN the PUT endpoint 'updateHole' is requested
    THEN check that the response is valid
    */
});
