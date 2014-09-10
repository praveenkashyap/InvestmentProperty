/**
 * @author Praveen
 */
var http = require("http");
var url = require("url");
var querystring = require("querystring");

function startServer(route, handle) {
	function onRequest(request, response) {
		var postData = "";
		var pathname = url.parse(request.url).pathname;
		var query = querystring.parse(url.parse(request.url).query);
		
		//Extract the url and post data (if any) from the request
		console.log("Request for " + pathname + " received" + " query is:" + url.parse(request.url).query);
		for(var x in query){
			console.log("key:" + x + " value:" + query[x]);
		}
		
		request.setEncoding("utf8");
		request.addListener("data", function(postDataChunk) {
			postData += postDataChunk;
			console.log("Received POST data chunk '"+
					postDataChunk + "'.");
			});
		//Route the request to the router along with the pathname, post data and url/
		request.addListener("end", function() {
			route(handle, pathname, response, postData, request.url);
			});
//		route(handle, pathname, response);
	}
	http.createServer(onRequest).listen(8888);
	console.log("Server has started.");
}

exports.startServer = startServer;