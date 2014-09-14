/**
 * @author Praveen
 */
var server = require("./server");
var router = require("./router");
var requestHandlers = require("./requestHandlers");
var handle = {};

handle["/file"] = requestHandlers.file;
handle["/fileCreate"] = requestHandlers.fileCreate;
handle["/propertyFileWrite"] = requestHandlers.propertyFileWrite;
handle["/propertyFileRead"] = requestHandlers.propertyFileRead;

server.startServer(router.route, handle);