var request = require('request');
var expect = require('chai').expect;

describe('Hatena::Graph (verify)', function() {

  describe('without auth', function() {
    var responseHeader;

    beforeEach(function(done) {
      request('http://graph.hatena.ne.jp/api/config', function(err, res) {
        if (err) return done(err);
        response = res;
        done();
      });
    });

    it('statusCode = 401', function(done) {
      expect(response).to.have.property('statusCode', 401);
      done();
    });

    it('headers["WWW-Authenticate"]', function(done) {
      expect(response).to.have.deep.property(
        'headers.www-authenticate',
        'WSSE profile="UsernameToken"'
      );
      done();
    });
  });

});

