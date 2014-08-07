/*
 * Test this package by running this command from you app
 * folder:
 * 
 * > meteor test-packages layer-methods
 *
 */

Tinytest.add('layer-methods - main test', function (test) {
  LayerApi.config({
    cert: '',
    key: ''
    });

  var result = Meteor.call('/app/layer/createUser');
  console.log('result: ' + JSON.stringify(result));
  test.isTrue(result != undefined,'result cannot be undefined!');

});
