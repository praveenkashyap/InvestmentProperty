/**
 * @author Praveen
 */
var exec = require("child_process").exec;
var querystring = require("querystring");
//var formidable = require("formidable");
var os = require("os"); 
var fs = require("fs");

function start(response, postData) {
	console.log("Request handler 'start' was called.");

	var body = '<html>'+ '<head>'+ '<meta http-equiv="Content-Type" content="text/html; '+ 'charset=UTF-8" />'+
		'</head>'+ '<body>'+
		'<form action="/upload" method="post">'+
			'<textarea name="text" rows="20" cols="60"></textarea>'+
			'<input type="submit" value="Submit text" />'+
		'</form>'+ '</body>'+ '</html>';
//	exec("ls -lah", function (error, stdout, stderr) {
/*	exec("dir", function (error, stdout, stderr) {
		response.writeHead(200, {"Content-Type": "text/plain"});
		response.write(stdout);
		response.write(stderr);
		response.end();
	});
*/
	response.writeHead(200, {"Content-Type": "text/html"});
	response.write(body);
	response.end();

}function startSmall(response, postData) {
	console.log("Request handler 'startSmall' was called.");

	var body = '<html>'+ '<head>'+ '<meta http-equiv="Content-Type" content="text/html; '+ 'charset=UTF-8" />'+
		'</head>'+ '<body>'+
		'<form action="/upload" method="post">'+
			'Number: <input type="text" name ="Number">'+
			'<input type="submit" value="Submit number" />'+
		'</form>'+ '</body>'+ '</html>';
	response.writeHead(200, {"Content-Type": "text/html"});
	response.write(body);
	response.end();

}

function upload(response, postData) {
	console.log("Request handler 'upload' was called.");
	response.writeHead(200, {"Content-Type": "text/plain"});
	response.write("You have sent the text: " + querystring.parse(postData).text +"\n");
	response.write("You have sent the post data: "+ postData);
	response.end();
}

function show(response) {
	console.log("Request handler 'show' was called.");
	response.writeHead(200, {"Content-Type": "image/png"});
	fs.createReadStream("/tmp/test.png").pipe(response);
}

function file(response){
	console.log("Request handler 'file' was called.");
		
	var body = '<html>'+ '<head>'+ '<meta http-equiv="Content-Type" content="text/html; '+ 'charset=UTF-8" />'+
	'</head>'+ '<body>'+ 
	'<p> For rental property analysis, input the address and city </p>' + 
	'<form name = "Property Address" action="/fileCreate" method="post">'+
		'Street address: <input type="text" name ="StreetAddress">'+
		'City: <input type="text" name ="City">'+
		'State: <input type="text" name ="State">'+
		'<input type="submit" value="Submit address" /> <br>'+
	'</form>'+ 
	'<p> To create a template, enter state or neighborhood </p>' +
	'<form name = "Neighborhood" action="/fileCreate" method="post">'+
		'Neighborhood: <input type="text" name ="Neighborhood">'+
		'<input type="submit" value="Submit Neighborhood" />'+
	'</form>'+ 
	'<form name = "State" action="/fileCreate" method="post">'+
		'State: <input type="text" name ="State">'+
		'<input type="submit" value="Submit State" />'+
	'</form>'+ 
	'</body>'+ '</html>';
	response.writeHead(200, {"Content-Type": "text/html"});
	response.write(body);
	response.end();

} //function file

function fileCreate(response, postData){
	console.log("Request handler 'fileCreate' was called.");
	
	console.log("OS type:" + os.type());
	console.log("OS platoform:" + os.platform());
	if (os.platform() === "win32"){	
		exec("dir", function (error, stdout, stderr) {
			response.writeHead(200, {"Content-Type": "text/plain"});
			response.write(stdout);
			response.write(stderr);
			response.end();
		});
	}
	if (os.platform() === "linux"){	
		var query = querystring.parse(postData);
		var fileName = "";
		for(var x in query){
			var value = query[x].trim();
			while(value.indexOf(" ") != -1)
				value = value.replace(" ", "");
			console.log("key:" + value);
			fileName = fileName + value;
		}
		console.log("post Data:" + postData + " query:" + query + " fileName:" + fileName);
		
		fs.open("./" + fileName, "a+", function(err, fd){
			  if (err) throw err;
			  console.log('successfully created file: ' + postData);
			  fs.close(fd);
		});
		exec("ls -la", function (error, stdout, stderr) {
			response.writeHead(200, {"Content-Type": "text/plain"});
			response.write(stdout);
			response.write(stderr);
			response.end();
		    if (error !== null) {
		        console.log('exec error: ' + error);
		    };
		});
	} //linux

} //function file

function ajaxRequest(response){
	console.log("Request handler 'ajaxRequest' was called.");
/*	var body = '<!DOCTYPE html> <html> <head>' + 
		'<script>' + 
		'function loadXMLDoc(){' +
		'var xmlhttp;' +
		'if (window.XMLHttpRequest)' +
			'{// code for IE7+, Firefox, Chrome, Opera, Safari' +
			'xmlhttp=new XMLHttpRequest();}' +
	  	'xmlhttp.onreadystatechange=function(){' +
			'if (xmlhttp.readyState==4 && xmlhttp.status==200){' + 
				'document.getElementById("myDiv").innerHTML=xmlhttp.responseText;}' +
				'} //function loadXMLDoc' +
	  	'xmlhttp.open("GET","/ajaxResponse",true);' + 
	  	'xmlhttp.send();' + 
	'}' +
	'</script>' +
	'</head> <body>' +
	'<div id="myDiv"><h2>Let AJAX change this text</h2></div>' +
	'<button type="button" onclick="loadXMLDoc()">Change Content</button>' +
	'</body> </html>';
*/
	var body = '<!DOCTYPE html> <html> <head> <meta http-equiv="Content-Type" content="text/html; '+ 'charset=UTF-8" />' + 
	'<script>' + 
	'function loadXMLDoc(){' +
	'var xmlhttp;' +
	'if (window.XMLHttpRequest){' +
	  'xmlhttp=new XMLHttpRequest();}' +
	'xmlhttp.onreadystatechange=function(){' +
	  'if (xmlhttp.readyState==4 && xmlhttp.status==200){' +
	    'document.getElementById("myDiv").innerHTML=xmlhttp.responseText;}};' +
	'xmlhttp.open("GET","/ajaxResponse?gws_rd=ssl",true);' +
	'xmlhttp.send();}' +
	'</script>' +
	'</head> <body>' +
	'<div id="myDiv"><h2>Let AJAX change this text</h2></div>' +
	'<button type="button" onclick="loadXMLDoc()">Change Content</button>' +
	'</body> </html>';

	response.writeHead(200, {"Content-Type": "text/html"});
	response.write(body);
	response.end();
} //ajaxRequest

function ajaxResponse(response, postData){
	console.log("Request handler 'ajaxResponse' was called.");
	response.writeHead(200, {"Content-Type": "text/plain"});
	response.write("You have sent the post data: "+ postData);
	response.end();
	
} //ajaxResponse

exports.start = start;
exports.startSmall = startSmall; 
exports.upload = upload;
exports.show = show;
exports.file = file;
exports.fileCreate = fileCreate;
exports.ajaxRequest = ajaxRequest;
exports.ajaxResponse = ajaxResponse;