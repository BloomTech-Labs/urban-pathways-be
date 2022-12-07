var pg = require('pg');
//or native libpq bindings
//var pg = require('pg').native

var conString = "postgres://sgkcrvxz:lEP8UVRo_9GlIDFHeyBPXqM5D_2fdPZD@peanut.db.elephantsql.com/sgkcrvxz?" //Can be found in the Details page
var client = new pg.Client(conString);
client.connect(function(err) {
  if(err) {
    return console.error('could not connect to postgres', err);
  }
  client.query('SELECT NOW() AS "theTime"', function(err, result) {
    if(err) {
      return console.error('error running query', err);
    }
    console.log(result.rows[0].theTime,'Database is connected 🚀🚀');
    // >> output: 2018-08-23T14:02:57.117Z
    client.end();
  });
});