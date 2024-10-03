const http = require("http")
const url = require("url")

const hostname = "127.0.0.1"
const port = 3000

const server = http.createServer((req, res) => {
	// Parse the URL and obtain the GET vars, also
	// known as the query string
	const parsedUrl = url.parse(req.url, true)
	const getVars = parsedUrl.query

	res.statusCode = 200
	res.setHeader("Content-Type", "application/json")

	// Display the getVars in the browser
	res.end(JSON.stringify(getVars))
})

// Start the server
server.listen(port, hostname, () => {
	console.log(`Node.js is listening at http://${hostname}:${port}/`)
})
