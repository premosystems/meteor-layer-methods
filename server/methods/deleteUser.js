/**
 * Created by vincilbishop on 7/21/14.
 */

Meteor.methods ({
  '/app/layer/deleteUser': function (userId) {

    var https = Npm.require('https');

    var path = '/users/' + userId

    var options = {
      host: 'api-beta.layer.com',
      port: 443,
      path: path,
      method: 'DELETE',
      cert:LayerApi.cert,
      key:LayerApi.key
    };

    var fut = new Future ();
    console.log('/app/layer/deleteUser request: ' + JSON.stringify(options));

    var req = https.request(options, function(res) {
      console.log("statusCode: ", res.statusCode);
      console.log("headers: ", res.headers);
      res.setEncoding('utf8');

      res.on('data', function(responseData) {

        //var result = JSON.parse(responseData);

        console.log('responseData: ' + responseData);

        fut.return(result);
      });

    });

    req.end();

    req.on('error', function(e) {
      console.error('layer error:' + e);
    });

    return fut.wait()

  }
})