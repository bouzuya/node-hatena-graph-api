var hatenaGraph = require('../');

var username = process.env.HATENA_USERNAME;
var apikey = process.env.HATENA_APIKEY;

var graph = hatenaGraph(username, apikey);

// get data (callback)
graph.getData({ graphname: 'test' }, function(err, json) {
  console.log(json);
});

// get data (promise)
graph.getData({ graphname: 'test' }).then(function(json) {
  console.log(json);
});

// post data (callback)
// use process.env.HATENA_USERNAME='username'
// use process.env.HATENA_APIKEY='apikey'
var graph2 = hatenaGraph();
graph2.postData({
  graphname: 'test',
  date: '2014-02-04',
  value: '56.78'
}, function() {
  console.log('post data (callback)');
});

// post data (promise)
graph2.postData({
  graphname: 'test',
  date: '2014-02-05',
  value: '90.12'
}, function() {
  console.log('post data (promise)');
});

