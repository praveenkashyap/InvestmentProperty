/**
 * @author Praveen
 */
var exec = require("child_process").exec;
var spawn = require("child_process").spawn;
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
	var winPropertyDatabase = "..\\..\\..\\PropertyDatabase";
	var linuxPropertyDatabase = "../../../PropertyDatabase";
	var fileArray;

	console.log("OS type:" + os.type());
	console.log("OS platoform:" + os.platform());
	if (os.platform() === "win32"){	
/*
		exec("dir " + winPropertyDatabase + " /a-d /b /on", function (error, fileName, stderr) {
  		    console.log("cmd:" + "dir " + winPropertyDatabase + " /a-d /b /on" );
		    console.log("stdout:" + fileName);
		    console.log("type:" + typeof fileName);
		    console.log("error:" + stderr);
		    if (error !== null) {
		        console.log('exec error: ' + error);
		    };		    
		});
*/
	}//win32

	if (os.platform() === "linux"){	
	    var ls = spawn('ls', [linuxPropertyDatabase]);
		    ls.stdout.on('data', function (data) {
		    	console.log('stdout: ' + data + " type:" + typeof data);
		    	//Create an array of the files in the database
		    	fileArray = data.toString().split("\n");
/*
		    	console.log("File Array1:");
				for(var i = 0; i < fileArray.length; i++)
					console.log(fileArray[i]);
*/
				var body = '<!DOCTYPE html> <html>'+ '<head>'+ '<meta http-equiv="Content-Type" content="text/html; '+ 'charset=UTF-8" />'+
				'</head>'+ '<body>'+ 
				'<p> Existing Property addresses </p>' + 
				'<form name = "File" action="/fileCreate" method="post">' +
				'<select name = "optionList" id = "optionList">' + 
				'<option value = "" selected> </option>';
				for(var i = 0; i < fileArray.length - 1; i++)
					body = body + '<option value="' + fileArray[i] + '">' + fileArray[i] + '</option> ' ;
				body = body + '</select> <input type="submit" value="Submit File" />' ;
				'</form> <br>';

				// Create form for entering address information. Show it only if a New property is created. There are three options, property address, neighborhood or state.
				body = body + '<div id = "AddressDiv"> <p> If property is not in the database, add its address or create a template</p>' + 
				'<form name = "Property Address" action="/fileCreate" method="post">'+
					'Street address: <input type="text" name ="StreetAddress">'+
					'City: <input type="text" name ="City">'+
					'State: <input type="text" name ="State">'+
					'<input type="submit" value="Submit address" /> <br>'+
				'</form>'+ 
				'<p> To create a template, enter state or neighborhood </p>' +
				'<form name = "Neighborhood" action="/fileCreate" method="post">'+
					'Neighborhood: <input type="text" name ="TempNeighborhood">'+
					'<input type="submit" value="Submit Neighborhood" />'+
				'</form>'+ 
				'<form name = "State" action="/fileCreate" method="post">'+
					'State: <input type="text" name ="TempState">'+
					'<input type="submit" value="Submit State" />'+
				'</form> </div>' + 
				'</body> </html>';
				
				response.writeHead(200, {"Content-Type": "text/html"});
				response.write(body);
				response.end();

		    });

		    ls.stderr.on('data', function (data) {
		      console.log('stderr: ' + data);
		    });

		    ls.on('close', function (code) {
		      console.log('child process exited with code ' + code);
		    });
	} //linux
} //function file

function fileCreate(response, postData){
	var propertyDatabase = "../../../PropertyDatabase/";
	var options = {cwd: "/home/praveen/Aptana/PropertyDatabase"};
	
	console.log("Request handler 'fileCreate' was called.");
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
			console.log("key:" + x + " value:" + value);
			fileName = fileName + value;
		}
		console.log("post Data:" + postData + " query:" + query + " fileName:" + fileName);
		
		fs.open(propertyDatabase + fileName, "a+", function(err, fd){
			  if (err) throw err;
			  console.log('successfully created file: ' + fileName);
			  fs.close(fd);
		});
		fs.readFile(propertyDatabase + fileName, function(err, data){
			  if (err) throw err;
			  console.log('File: ' + fileName + ' is:' + data);
			  response.writeHead(200, {"Content-Type": "text/plain"});
			  response.write(data);
			  response.end();
		});
	} //linux

} //fileCreate

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