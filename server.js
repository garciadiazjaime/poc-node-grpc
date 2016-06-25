var grpc = require('grpc');
var proto = grpc.load(__dirname + '/interface.proto');

function getServer() {
  var server = new grpc.Server();
  server.addProtoService(proto.sample.SampleService.service, {
		save: function(clientCall, callback) {
			callback(null, save(clientCall.request));
		}
  });
  return server;
}

function save(person) {
  return "person saved, name: "+ person.name + ", color: " + person.color;
}

var routeServer = getServer();
routeServer.bind('0.0.0.0:50051', grpc.ServerCredentials.createInsecure());
routeServer.start();
