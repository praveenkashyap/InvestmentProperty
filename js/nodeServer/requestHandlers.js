/**
 * @author Praveen
 */
var exec = require("child_process").exec;
var spawn = require("child_process").spawn;
var url = require("url");
var querystring = require("querystring");
//var formidable = require("formidable");
var os = require("os"); 
var fs = require("fs");

function start(response) {
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

}function startSmall(response) {
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
	var linuxPropertyDatabase = "/home/praveen/Aptana/PropertyDatabase";
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
		    	console.log('stdout: ' + data);
		    	//Create an array of the files in the database
		    	fileArray = data.toString().split("\n");
		    	console.log("File Array:");
				for(var i = 0; i < fileArray.length; i++)
					console.log(fileArray[i]);
				var body = '<select id = "optionList">';
				for(var i = 0; i < fileArray.length - 1; i++)
					body = body + '<option value="' + fileArray[i] + '">' + fileArray[i] + '</option> ' ;
				body = body + '</select>' + 
				'<button onclick="readPropertyData(document.getElementById(\'optionList\').value)"> Submit </button> ';
				
				response.writeHead(200, {"Content-Type": "text/text"});
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

function fileCreate(response){
	var code = "";

	//Need to fix these fixed paths....
	if (os.platform() === "win32")
		code = ".\\index.html";
	if (os.platform() === "linux")
		code = "/home/praveen/Aptana/InvestmentProperty/index.html";
	else
		console.log("Error: unsupported OS");
	
	console.log("Request handler 'fileCreate' was called.");
	fs.readFile(code, function(err, data){
		if (err) throw err;
		console.log('Sending file:' + code);
		response.writeHead(200, {"Content-Type": "text/html"});
		response.write(data);
		response.end();
	});
} //fileCreate

function fileold(response){
	console.log("Request handler 'file' was called.");
	var winPropertyDatabase = "..\\..\\..\\PropertyDatabase";
	var linuxPropertyDatabase = "/home/praveen/Aptana/PropertyDatabase";
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
				'<form name = "File" action="/fileCreate" method="post" onsubmit="storeFile(this.value)">' +
				'<select name = "optionList" id = "optionList">' + 
				'<option value = "New"> New </option>';
				for(var i = 0; i < fileArray.length - 1; i++)
					body = body + '<option value="' + fileArray[i] + '">' + fileArray[i] + '</option> ' ;
				body = body + '</select> <input type="submit" value="Submit File" />' +
				'</form>';

				// Create form for entering address information. Show it only if a New property is created. There are three options, property address, neighborhood or state.
/*				body = body + '<div id = "AddressDiv"> <p> If property is not in the database, add its address or create a template</p>' + 
				'<form name = "Property Address" action="/fileCreate" method="post">'+
					'Street address: <input type="text" name ="StreetAddress">'+
					'City: <input type="text" name ="City">'+
					'State: <input type="text" name ="State">'+
					'<input type="submit" value="Submit address" /> <br>'+
				'</form> </div>';
				//Add script to control visibility
				body = body + '<script>;' +
				'document.getElementById("AddressDiv").style.visibility="hidden";' +
				'function manageVisibility(){' +
					'if (optionList == "New"){' +
						'document.getElementById("AddressDiv").style.visibility="visible";}}' +
				'</script>' +
*/				
				body = body + '<script>' +
				//Store filename on local storage only if the browser supports it
				'function storeFile(file){' +
					'if(window.localStorage) {' + 
						'localStorage.fileName = file;}' +
					'else {' +
						'alert("Local storage does not exist ");}}'+
				'</script>' + 
				'</body>'+ '</html>';

				
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
} //function fileold

function fileCreateold(response, postData){
	var propertyDatabase = "/home/praveen/Aptana/PropertyDatabase/";
	var options = {cwd: "/home/praveen/Aptana/PropertyDatabase"};
	var code = "/home/praveen/Aptana/InvestmentProperty/index.html";
//Need to fix these fixed paths....
	
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
		fs.readFile(code, function(err, data){
			  if (err) throw err;
			  console.log('Sending file:' + code);
			  response.writeHead(200, {"Content-Type": "text/html"});
			  response.write(data);
			  response.end();
		});

		/*
		fs.readFile(propertyDatabase + fileName, function(err, data){
			  if (err) throw err;
			  console.log('File: ' + fileName + ' is:' + data);
			  response.writeHead(200, {"Content-Type": "text/plain"});
			  response.write(data);
			  response.end();
		});
*/
		
	} //linux

} //fileCreateold

function ajaxRequest(response){
	console.log("Request handler 'ajaxRequest' was called.");

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

function ajaxResponse(response, postData, urlString){
	var query = querystring.parse(url.parse(urlString).query);
	
	console.log("Request handler 'ajaxResponse' was called.");
	response.writeHead(200, {"Content-Type": "text/plain"});
	response.write("You have sent the post data: "+ postData + " and query:");
	for(var x in query){
		response.write("key:" + x + " value:" + query[x]);
	}
	response.end();
	
} //ajaxResponse

function propertyFileWrite(response, postData){
	var propertyDatabase = "/home/praveen/Aptana/PropertyDatabase/";
	var options = {cwd: "/home/praveen/Aptana/PropertyDatabase"};
	var code = "/home/praveen/Aptana/InvestmentProperty/index.html";
//Need to fix these fixed paths....
	
	console.log("Request handler 'propertyFileWrite' was called.");
	if (os.platform() === "win32"){	
		exec("dir", function (error, stdout, stderr) {
			response.writeHead(200, {"Content-Type": "text/plain"});
			response.write(stdout);
			response.write(stderr);
			response.end();
		});
	}//win
	
	if (os.platform() === "linux"){	
		var query = querystring.parse(postData);
		
		for(var x in query){
			console.log("key:" + x + " value:" + query[x]);
			if(x === "data")
				var data = query[x];
		}
		
		fs.writeFile(propertyDatabase + query.fileName, data, function(err){
			if (err) throw err;
			console.log('successfully saved file: ' + query.fileName);
			response.writeHead(200, {"Content-Type": "text/plain"});
			response.write('successfully saved file: ' + query.fileName);
			response.end();
		});		
	} //linux

} //propertyFileWrite

function propertyFileRead(response, postData, urlString){
	var propertyDatabase = "/home/praveen/Aptana/PropertyDatabase/";
	var options = {cwd: "/home/praveen/Aptana/PropertyDatabase"};
	var code = "/home/praveen/Aptana/InvestmentProperty/index.html";
	var query = querystring.parse(url.parse(urlString).query);
//Need to fix these fixed paths....
	
	console.log("Request handler 'propertyFileRead' was called.");
	if (os.platform() === "win32"){	
		exec("dir", function (error, stdout, stderr) {
			response.writeHead(200, {"Content-Type": "text/plain"});
			response.write(stdout);
			response.write(stderr);
			response.end();
		});
	}//win
	
	if (os.platform() === "linux"){	
		for(var x in query){
			console.log("key:" + x + " value:" + query[x]);
		}
				
		fs.readFile(propertyDatabase + query.fileName, function(err, data){
			if (err) throw err;
			console.log('successfully read file: ' + query.fileName);
			response.writeHead(200, {"Content-Type": "text/plain"});
			response.write(data);
			response.end();
		});		
	} //linux

} //propertyFileRead


exports.start = start;
exports.startSmall = startSmall; 
exports.upload = upload;
exports.show = show;
exports.file = file;
exports.fileCreate = fileCreate;
exports.ajaxRequest = ajaxRequest;
exports.ajaxResponse = ajaxResponse;
exports.propertyFileWrite = propertyFileWrite;
exports.propertyFileRead = propertyFileRead;
