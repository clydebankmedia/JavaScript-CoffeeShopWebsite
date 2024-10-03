// Define iterable objects
expMonths = {}
expYears = {}

// Iterator object for expiration months
expMonths[Symbol.iterator] = function() {
	let m = 0
	return {
		next() {
			m += 1
			theValue = "<option value='" + m + "'>" + m + "</option>"
			if (m > 12) {
				return {value: theValue, done: true}
			} else {
				return {value: theValue, done: false}
			}
		}
	}
}

// Iterator object for expiration years
expYears[Symbol.iterator] = function() {
	let y = new Date().getFullYear() - 1
	return {
		next() {
			y += 1
			theValue = {html: "<option value='" + y + "'>" + y + "</option>", year: y}
			return {value:theValue, done:false}
		}
	}
}

// Construct the expiration month dropdown options
for (let month of expMonths) {
	document.getElementById("expMonth").innerHTML += month
}

// Construct the expiration year dropdown options
maxYear = new Date().getFullYear() + 10 
for (let year of expYears) {
	document.getElementById("expYear").innerHTML += year.html
	if (year.year >= maxYear) break
}
