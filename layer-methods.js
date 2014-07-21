
Future = Npm.require('fibers/future');

LayerApi = {};

LayerApi.config =  function(config) {

  LayerApi.cert = config.cert;
  LayerApi.key = config.key;

}