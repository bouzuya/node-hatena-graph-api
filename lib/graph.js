var request = require('request');
var wsse = require('wsse')();

var DATA_URL = 'http://graph.hatena.ne.jp/api/data';
var CONFIG_URL = 'http://graph.hatena.ne.jp/api/config';

var HatenaGraph = function(username, apikey) {
  if (!username) throw new Error('username required'); 
  if (!apikey) throw new Error('apikey required'); 
  this.username = username;
  this.apikey = apikey;
};

HatenaGraph.prototype._merge = function() {
  var sources = Array.prototype.slice.call(arguments);
  return sources.reduce(function(result, source) {
    for (var property in source) {
      result[property] = source[property];
    }
    return result;
  }, {});
};

HatenaGraph.prototype.http = function(method, url, params, callback) {
  var p = method === 'get' ? this._merge(params, { type: 'json' }) : params;
  var options = {};
  options.method = method;
  options.url = url;
  options[method === 'get' ? 'qs' : 'form'] = p;
  options.headers = {
    'Authorization': 'WSSE profile="UsernameToken"',
    'X-WSSE': 'UsernameToken ' + wsse.getUsernameToken(
    this.username, this.apikey, { nonceBase64: true })
  };

  request(options, function(err, res, body) {
    if (err) return callback(err);
    if ((method === 'get' && res.statusCode !== 200) ||
        (method === 'post' && res.statusCode !== 201)) {
      var e = new Error('statusCode = ' + res.statusCode);
      return callback(e);
    }
    callback(null, body);
  });

};

HatenaGraph.prototype.getConfig = function(graphname, callback) {
  this.http(
    'get',
    CONFIG_URL,
    { graphname: graphname }, 
    function(err, body) {
      if (err) return callback(err);
      callback(null, JSON.parse(body));
    });
};

HatenaGraph.prototype.postConfig = function(params, callback) {
  this.http('post', CONFIG_URL, params, callback);
};

// getData(graphname, function(...
// getData(graphname, username, function(...
HatenaGraph.prototype.getData = function(graphname, username, callback) {
  if (typeof username === 'function') {
    callback = username;
    username = this.username;
  };

  this.http(
    'get',
    DATA_URL,
    { graphname: graphname, username: username },
    function(err, body) {
      if (err) return callback(err);
      callback(null, JSON.parse(body));
    });
};

HatenaGraph.prototype.postData = function(graphname, date, value, callback) {
  this.http('post', DATA_URL, { graphname: graphname, date: date, value: value }, callback);
};

module.exports = function(username, apikey) {
  username = username || process.env.HATENA_USERNAME;
  apikey = apikey || process.env.HATENA_APIKEY;
  return new HatenaGraph(username, apikey);
};

