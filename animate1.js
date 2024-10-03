// Bind event to button click
let element = document.getElementById("theButton")

// Pass the function to the click event
element.addEventListener("click", animateButton)

// Toggle direction of animation (1 for right, -1 for left)
let direction = 1
// Set the speed of the animation
let speed = 1
// Declare the interval variable
let id
  
function animateButton() {
  // If an existing interval exists, clear it
  clearInterval(id)  
  
  // Get current position of the element
  let position = parseInt(window.getComputedStyle(element).left, 10)
  
  // Create the interval
  id = setInterval(frame, 10)

  // This is called every 10 milliseconds
  function frame() {
    // Check to see if position is greater than 
    // or equal to 500 and direction is right
    if (position >= 500 && direction == 1) {
      // If so, change to left
      direction = -1
    } else if (position <= 0 && direction == -1) {
      // Stop animation when we reach the leftmost end and reset direction
      clearInterval(id)
      direction = 1
    } else {
      // Increment or decrement position
      position += direction * speed
      // Set style to match new position in pixels
      element.style.left = position + "px"
    }
  }
}
