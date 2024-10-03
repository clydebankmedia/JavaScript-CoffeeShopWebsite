const http = require("http")
const sqlite3 = require("sqlite3")

const address = "127.0.0.1"
const port = 3000

// SQL query to use
const sqlQuery = "SELECT * FROM tracks;"

const server = http.createServer((req, res) => {
	res.statusCode = 200
	res.setHeader("Content-Type", "application/json")

// Set CORS headers to allow any page to send requests
// This is only for development, don't do this in production!
res.setHeader("Access-Control-Allow-Origin", "*")
res.setHeader("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE")
res.setHeader("Access-Control-Allow-Headers", "Content-Type")


	// Connect to the sTunes database
	let db = new sqlite3.Database("./sTunes.db", sqlite3.OPEN_READONLY, (err) => {
		if (err) {
			console.error(`Database connection error: ${err.message}`)
		}
		console.log("Connection established.")
	})

	// Create an array to accumulate rows of results
	let results = []

	// Query the database
	db.serialize(() => {
		// Iterate through each row in the table
		db.each(sqlQuery, (err, row) => {
			if (err) {
				// If an error occurs, log to console
				console.error(err.message)
				} else {
				// Add the row (track) to the array
					results.push(row)	
				}
			}, (err, count) => { 
			// This code is executed when all rows have been retrieved
			// We don’t use it, but the count variable has the total
			// number of rows retrieved from the result.
			if (err) {
				// If an error occurred, log it in the console
				console.error(err.message)
			} else {
				// Send results to the web browser
				res.end(JSON.stringify(results))
			}
		})
	})
})

server.listen(port, address, () => {
	console.log(`Node.js is listening at http://${address}:${port}/`)
})
