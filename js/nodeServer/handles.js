/**
 * @author Praveen
 */
var server = require("./server");
var router = require("./router");
var requestHandlers = require("./requestHandlers");
var handle = {};

handle["/"] = requestHandlers.start;
handle["/start"] = requestHandlers.start;
handle["/startSmall"] = requestHandlers.startSmall;
handle["/upload"] = requestHandlers.upload;
handle["/show"] = requestHandlers.show;
handle["/file"] = requestHandlers.file;
handle["/fileCreate"] = requestHandlers.fileCreate;
handle["/ajaxRequest"] = requestHandlers.ajaxRequest;
handle["/ajaxResponse"] = requestHandlers.ajaxResponse;
handle["/propertyFileWrite"] = requestHandlers.propertyFileWrite;
handle["/propertyFileRead"] = requestHandlers.propertyFileRead;

server.startServer(router.route, handle);