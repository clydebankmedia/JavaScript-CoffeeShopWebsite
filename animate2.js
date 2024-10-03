// Query the element
let element = document.getElementById('box')

// Define animation
let animation = element.animate([
	{ transform: 'translateX(0px)' },
	{ transform: 'translateX(240px)' }
], 
	{ duration: 2500,
	  iterations: Infinity,
      direction: 'alternate'
    }
)

// Bind event buttons
document.getElementById("play").addEventListener("click", playAnimation)
document.getElementById("pause").addEventListener("click", pauseAnimation)
document.getElementById("reverse").addEventListener("click", reverseAnimation)
document.getElementById("incRate").addEventListener("click", incPlaybackRate)
document.getElementById("decRate").addEventListener("click", decPlaybackRate)

// Pause the animation at the beginning
animation.pause()

// Play the animation
function playAnimation() {
	console.log("Playing animation.")
	animation.play()
}

// Pause the animation
function pauseAnimation() {
	console.log("Animation paused.")
	animation.pause()
}

// Reverse the animation
function reverseAnimation() {
	console.log("Reversing animation.")
	animation.reverse()
}

// Increase playback rate by 0.5x
function incPlaybackRate() {
	animation.playbackRate += 0.5
	console.log(`Playback rate increased to ${animation.playbackRate}`)
}

// Decrease playback rate by 0.5x
function decPlaybackRate() {
	if (animation.playbackRate > 0) {
		animation.playbackRate -= 0.5
		console.log(`Playback rate decreased to ${animation.playbackRate}`)
	}
}
