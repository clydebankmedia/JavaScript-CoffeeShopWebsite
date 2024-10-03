let theButton = document.getElementById("theButton");

theButton.addEventListener("click", (function() {
	// Initially set the clickCount to 0
	let clickCount = 0

	return function() {
	// Increment the clickCount
		clickCount += 1
		// Update the button's textContent
		this.textContent = `Clicked ${clickCount} times!`
	}
})())
