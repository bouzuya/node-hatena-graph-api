hatena-graph-api
==============================================================================

Hatena::Graph API for Node.js (unofficial)

Usage
------------------------------------------------------------------------------

### Installation

    $ npm install hatena-graph-api

### Example 1

    var hatenaGraph = require('hatena-graph');
    
    var graph = hatenaGraph('username', 'apikey');
    graph.getData({ graphname: 'graph' }, function(err, json) {
      console.log(json); // => { '2014-01-01': '12.34' }
    });

### Example 2

    // export HATENA_USERNAME='username'
    // export HATENA_APIKEY='apikey'
    var hatenaGraph = require('hatena-graph');
    
    var graph = hatenaGraph(); // use process.env.*
    graph.postData({
      graphname: 'graph',
      date: '2014-01-02',
      value: '56.78'
    }).then(function() {
      console.log('post');
    });

Test
------------------------------------------------------------------------------

    $ export HATENA_USERNAME='username'
    $ export HATENA_APIKEY='apikey'
    $
    $ npm test

