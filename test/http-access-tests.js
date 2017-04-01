'use strict';
const chai = require('chai');
chai.should();
const expect = require('chai').expect;
const supertest = require('supertest');
const app = require('../index');


describe('Importer Access Tests', function () {
  it('Responds 200 when accessing extractor', done => {
    supertest(app)
      .get('/')
      .set('Accept', 'application/json')
      .expect(200)
      .end(function (err, res) {
        if (err) return done(err);
        done();
      });
  });
});