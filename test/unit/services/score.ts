import chai from 'chai';
import { after, describe, it } from 'mocha';
import { get as _get } from 'lodash';
import { MongoDB } from '../../../src/libs';
import { ScoreService } from '../../../src/services';
// @ts-ignore
import { seedScore } from '../../fixtures';

// Assertion style
chai.should();
// TODO: Globalize or something similar for mongo
describe('Score Service', async function () {
    let mongo: any = null;
    let score: any = null;
    before(async function () {
        // connect to mongo
        mongo = MongoDB;
        await mongo.connect();
        // wipe db
        await mongo.db.dropDatabase();
        // seed score
        score = await seedScore();
    });

    after(async function () {
        // wipe the db
        await mongo.db.dropDatabase();

        // disconnect to from the mongo
        await mongo.disconnect();
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
});
