var http = require("http");
var path = require("path");
var fs = require("fs");


function requestEvent(req, res){

	var contentType = "text/html";
	var resource = req.url;
	var ext = path.extname(resource);
	
	if(resource === "/"){
		resource = "/holaMundo.html";
	}

	resource = "." + resource;

	//Los diferentes tipos de contentType que pueden haber
	switch(ext){
		case ".css":
			contentType = "text/css";
			break;
		case ".js":
			contentType = "text/javascript";
			break;
	}

	//buscamos el archivo
	fs.exists(resource, function(exist){
		//Si existe
		if (exist) {
			fs.readFile(resource, function(err, data){
				//Si no se puede leer
				if (err) {
					res.writeHead(500);
					res.end("Internal error");
				}else{
					//Leer el archivo con el content type que tenga
					res.writeHead(200,{"content-type": contentType});
					res.end(data);
				};
			});
		}else{ //Si no muestra mensaje
			res.writeHead(404);
			res.end("Not found");
		};
	});



	/**
	res.writeHead(200,{"content-type":"text/html"}
	);
	res.end("<H1>Fin de la peticion</H1>");
	**/
}

//Se crea el servidor
var server = http.createServer(requestEvent);

//Se selecciona el puerto
server.listen(8888);
console.log("server running");
