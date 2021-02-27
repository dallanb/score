import chai from 'chai';
import { after, before, describe, it } from 'mocha';
import { get as _get } from 'lodash';
import { ScoreService } from '../../../src/services';
// @ts-ignore
import { seedScore } from '../../helpers';

// Assertion style
chai.should();

let score: any = null;

before(async function () {
    score = await seedScore();
});

after(async function () {
    // wipe the db
});

describe('Score Service', async function () {
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
