const https = require("https");
const fs = require("fs");
const path = require("path");

const mimeTypes = {
	".html": "text/html",
	".js": "text/javascript",
	".css": "text/css",
	".json": "application/json",
	".png": "image/png",
	".jpg": "image/jpg",
	".gif": "image/gif",
	".svg": "image/svg+xml",
	".wav": "audio/wav",
	".mp4": "video/mp4",
	".woff": "application/font-woff",
	".ttf": "application/font-ttf",
	".eot": "application/vnd.ms-fontobject",
	".otf": "application/font-otf",
	".wasm": "application/wasm"
};

const PORT = 314;

const authorizePath = "/services/oauth2";

main();
function main(){
	this.server = https.createServer({
		key:  fs.readFileSync("key.pem"),
		cert: fs.readFileSync("cert.pem")
	});
	
	this.server.listen(PORT, () => console.log("Starting development server at: https://localhost:" + PORT));
	this.server.on("error", console.log);
	
	this.server.on("request", (request, response) => {
		console.log("request ", request.url);
		
		if(request.url.startsWith("/api"))
			handleApiRequest(request, response);
		else
			handleFileRequest(request, response);
	});
}

function handleFileRequest(request, response){
	let filePath = ".." + request.url;
	console.log(filePath, "\n");
	if(filePath == "../")
		filePath = "../index.html";

	let extname = String(path.extname(filePath)).toLowerCase();

	let contentType = mimeTypes[extname] || "application/octet-stream";

	fs.readFile(filePath, (error, content) => {
		if(error)
			if(error.code == "ENOENT")
				fs.readFile("./404.html", (error, content) => {
					response.writeHead(404, { "Content-Type": "text/html" });
					response.end(content, "utf-8");
				});
			else{
				response.writeHead(500);
				response.end("Sorry, check with the site admin for error: "+error.code+" ..\n");
			}
		
		else{
			response.writeHead(200, {"Content-Type": contentType});
			response.end(content, "utf-8");
		}
	});
}

function handleApiRequest(request, response){
	
}