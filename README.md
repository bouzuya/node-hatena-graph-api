hatena-graph-api
==============================================================================

Hatena::Graph API for Node.js (unofficial)

Usage
------------------------------------------------------------------------------

    $ npm install hatena-graph-api

    var hatenaGraph = require('hatena-graph');
    
    var graph = hatenaGraph('username', 'apikey');
    graph.getData('graph', function(err, json) {
      console.log(json); // => { '2014-01-01': '12.34' }
    });

Test
------------------------------------------------------------------------------

    $ export HATENA_USERNAME='username'
    $ export HATENA_APIKEY='apikey'
    $
    $ npm test

