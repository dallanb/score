import chai from 'chai';
import chaiHttp from 'chai-http';
import { describe, it } from 'mocha';
import App from '../../../src/providers/app';
// Assertion style
chai.should();

chai.use(chaiHttp);

const server = App.httpServer;

describe('Scores API', () => {
    /*
    GIVEN a Express application configured for testing
    WHEN the GET endpoint 'fetchAll' is requested
    THEN check that the response is valid
    */
    describe('GET /scores', () => {
        it('It should get all the scores', (done) => {
            chai.request(server)
                .get('/ping')
                .end((err, res) => {
                    res.should.have.status(200);
                    res.body.should.be.an('array');
                    res.body.length.should.be.eq(3);
                });
        });
    });
    /*
    GIVEN a Express application configured for testing
    WHEN the GET endpoint 'fetch' is requested
    THEN check that the response is valid
    */
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
