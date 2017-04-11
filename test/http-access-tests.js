'use strict';
const chai = require('chai');
chai.should();
const expect = require('chai').expect;
const supertest = require('supertest');
const app = require('../index');


describe('Importer Access Tests', function () {
  this.timeout(10000);
  it('Responds 200 when accessing extractor', done => {
    supertest(app)
      .get('/api')
      .set('Accept', 'application/json')
      .expect(200)
      .end(function (err, res) {
        if (err) return done(err);
        done();
      });
  });

    it('Responds 200 when aggregating extractors', done => {
        supertest(app)
            .get('/api?aggregate=true')
            .set('Accept', 'application/json')
            .expect(200)
            .end(function (err, res) {
                if (err) return done(err);
                expect(res.body).to.be.an('array');
                done();
            });
    });
});