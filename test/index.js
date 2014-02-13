var expect = require('chai').expect;
var hatenaGraph = require('../');

describe('Hatena::Graph', function() {

  var graph;

  beforeEach(function(done) {
    var username = process.env.HATENA_USERNAME;
    var password = process.env.HATENA_APIKEY;
    graph = hatenaGraph(username, password);
    done();
  });

  describe('constructor', function() {

    var original = process.env;

    beforeEach(function() {
      original = process.env;
      process.env = {};
    });

    afterEach(function() { process.env = original; });

    describe('arguments', function() {

      describe('without auth', function() {

        it('throw Error', function(done) {
          expect(function() {
            hatenaGraph();
          }).to.throw(Error);
          done();
        });

      });

      describe('with auth', function() {

        it('not throw Error', function(done) {
          expect(function() {
            hatenaGraph('username', 'password');
          }).to.not.throw(Error);
          done();
        });

      });

    });

    describe('environment variables', function() {

      describe('without auth', function() {

        it('throw Error', function(done) {
          process.env = {};
          expect(function() {
            hatenaGraph(); // use process.env
          }).to.throw(Error);
          done();
        });

      });

      describe('with auth', function() {

        it('not throw Error', function(done) {
          process.env = {
            HATENA_USERNAME: 'username',
            HATENA_APIKEY: 'password'
          };
          expect(function() {
            hatenaGraph(); // use process.env
          }).to.not.throw(Error);
          done();
        });

      });

    });

  });

  describe('CONFIG API', function() {

    describe('getConfig', function() {

      describe('use callback', function() {

        it('works', function(done) {
          graph.getConfig({ graphname: 'test' }, function(err, json) {
            expect(err).to.be.null;
            expect(json).to.not.be.null;
            done();
          });
        });

      });

      describe('use promise', function() {

        it('works', function(done) {
          var promise = graph.getConfig({ graphname: 'test' });
          expect(promise).to.be.ok;
          promise.then(function(json) {
            expect(json).to.not.be.null;
            done();
          });
        });

      });

    });

    describe('postConfig', function() {

      describe('use callback', function() {

        it('works', function(done) {
          graph.postConfig({
            graphname: 'test',
            graphcolor: '000000'
          }, function(err) {
            expect(err).to.be.null;
            done();
          });
        });

      });

      describe('use promise', function() {

        it('works', function(done) {
          var promise = graph.postConfig({
            graphname: 'test',
            graphcolor: '000000'
          });
          expect(promise).to.be.ok;
          promise.then(function() {
            done();
          });
        });

      });

    });

    describe('DATA API', function() {

      describe('getData', function() {

        describe('use callback', function() {

          it('works', function(done) {
            graph.getData({ graphname: 'test' }, function(err, json) {
              expect(err).to.be.null;
              expect(json).to.not.be.null;
              done();
            });
          });

        });

        describe('use promise', function() {

          it('works', function(done) {
            var promise = graph.getData({ graphname: 'test' })
            expect(promise).to.be.ok;
            promise.then(function(json) {
              expect(json).to.not.be.null;
              done();
            });
          });

        });

      });

      describe('postData', function() {

        describe('use callback', function() {

          it('works', function(done) {
            graph.postData({
              graphname: 'test',
              date: '2014-02-02',
              value: '2.5'
            }, function(err) {
              expect(err).to.be.null;
              done();
            });
          });

        });

        describe('use promise', function() {

          it('works', function(done) {
            var promise = graph.postData({
              graphname: 'test',
              date: '2014-02-02',
              value: '2.5'
            });
            expect(promise).to.be.ok;
            promise.then(function() {
              done();
            });
          });

        });

      });

    });

  });

});

