var url = require('url');
var grpc = require('grpc');

var proto = grpc.load('interface.proto');
var client = new proto.sample.SampleService('127.0.0.1:50051', grpc.credentials.createInsecure());

function savePerson(response, query) {
	var name = query.name || 'jaime';
	var color = query.color || 'green';

	var request = {
		name: name,
		color: color
	}

	client.save(request, function(error, data) {
		if (error) {
			response.end(JSON.stringify(error));
		} else {
			response.end("Response = " + JSON.stringify(data) + "\n");
		}
	});
}

var http = require('http');
var server = http.createServer(function(request, response) {
	response.writeHead(200, {
		"Content-Type": "text/plain"
	});
	savePerson(response, url.parse(request.url, true).query);
});
server.listen(3000);
