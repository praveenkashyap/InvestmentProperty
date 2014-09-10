/**
 * @author Praveen
 * Takes the incoming url and routes it to the correct handler
 */
var fs = require("fs");

function route(handle, pathname, response, postData, urlString) {
	console.log("About to route a request for " + pathname);

	//For source files, send the files to the client
	//AI: Send minified files if exist and pipe them instead of reading
	if((pathname.indexOf('.js') != -1) || (pathname.indexOf('.htm') != -1) || (pathname.indexOf('.css') != -1)){ //check pathname if it contains '.js, .htm or .css'
        fs.readFile('.' + pathname, function (err, data) {
          if (err) console.log(err);
          console.log('Sending file: .' + pathname);
          if(pathname.indexOf('.js') != -1)
        	  response.writeHead(200, {'Content-Type': 'text/javascript'});
          if(pathname.indexOf('.htm') != -1)
        	  response.writeHead(200, {'Content-Type': 'text/html'});
          if(pathname.indexOf('.css') != -1)
        	  response.writeHead(200, {'Content-Type': 'text/css'});
          response.write(data);
          response.end();
        });
      }//if source code
	else if (typeof handle[pathname] === 'function') {
		handle[pathname](response, postData, urlString);
	} else {
		console.log("No request handler found for " + pathname);
		response.writeHead(404, {"Content-Type": "text/plain"});
		response.write("404 Not found");
		response.end();
	}
}

exports.route = route;