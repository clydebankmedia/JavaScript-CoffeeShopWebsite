const http = require("http")

const hostname = "127.0.0.1"
const port = 3000

const server = http.createServer((req, res) => {
	// Create a sample JSON object
	const exampleJSON = {
		"firstName": "Robert",
	}

	// Set the status code to 200, signifying success to the browser
	res.statusCode = 200
	// Set the mimetype to application/json, so the browser 
	// knows how to handle the response
	res.setHeader("Content-Type", "application/json")

	// Set CORS headers to allow any page to send requests
	// This is only for development, don't do this in production!
	res.setHeader("Access-Control-Allow-Origin", "*")
	res.setHeader("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE")
	res.setHeader("Access-Control-Allow-Headers", "Content-Type")

	// Send the JSON object as a string
	res.end(JSON.stringify(exampleJSON))
})

server.listen(port, hostname, () => {
	console.log(`Node.js is listening at http://${hostname}:${port}/`)
})
