Meteor.methods ({
  /**
   * Creates a Layer user
   *  @method '/app/layer/createUser'
   *  @param {String} userId The ID of the user to create in layer. Usually the user's Meteor ID
   *  @returns See example success and error objects.
   *  @see Official Layer API Documentation: https://docs-beta.layer.com/ios#backendapi
   *  @example success response: {"status":true,"users":[{"layer_id":"4cb2a445-0cb7-435e-8c9f-aff2a8361fa5","remote_id":"TPaJhYvAmaDqW43JH"}]}
   *  @example error response: {"status":false,"message":"User with id TPaJhYvAmaDqW43JH already exists","error":"UserExists"}
   *  @example On successful creation the method writes layer information to the services node of the Meteor user record:
   *  { "layer" : { "layer_id" : "3eaaefca-eb7a-4d6e-9015-1fd2fc6d757d" , "remote_id" : "qLQoGuv5f3juva7Xi"}}
   @memberof Server-Methods
   */
  '/app/layer/createUser': function (userId) {

    var https = Npm.require ('https');

    //console.log('LayerApi.cert: ' + JSON.stringify(LayerApi.cert));
    //console.log('LayerApi.key: ' + JSON.stringify(LayerApi.key));

    var options = {
      host: 'api-beta.layer.com',
      port: 443,
      path: '/users',
      method: 'POST',
      cert: LayerApi.cert,
      key: LayerApi.key
    };

    var accessToken = Meteor.uuid ();
    var userInfo = [
      {
        "id": userId,
        "access_token": accessToken
      }
    ];

    var fut = new Future ();

    //console.log ('/app/layer/createUser request: ' + JSON.stringify (options));

    var req = https.request (options,
      Meteor.bindEnvironment (
        function (res) {
          console.log ("statusCode: ", res.statusCode);
          console.log ("headers: ", res.headers);
          res.setEncoding ('utf8');

          res.on ('data', Meteor.bindEnvironment (
              function (responseData) {

                console.log ('responseData: ' + JSON.stringify (responseData));
                var result = JSON.parse (responseData);



                if (result.status == true) { // If we were successful, let's update the user
                  // Update the user Id
                  var layer_id = result.users[0].layer_id;
                  var remote_id = result.users[0].remote_id;

                  Meteor.users.update ({_id: userId}, {$set: {'services.layer.layer_id': layer_id, 'services.layer.remote_id': remote_id}});
                }
                fut.return (result);
              }
              , function (ex) {
                console.log ('options: ' + JSON.stringify (options) + '  / error: ' + JSON.stringify (ex));
                //throw ex;
              })
          );

        }, function (ex) {
          console.log ('/app/layer/createUser error: ' + JSON.stringify (ex));
          throw ex;
        }
      )
    );

    req.write (JSON.stringify (userInfo));
    req.end ();

    req.on ('error', function (e) {
      console.error ('layer error:' + e);
    });

    return fut.wait ()

  }
})