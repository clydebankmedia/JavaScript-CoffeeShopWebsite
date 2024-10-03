let widthValue = document.getElementById('width')
let heightValue = document.getElementById('height')

function displayWindowSize() {
    widthValue.innerHTML = window.innerWidth
    heightValue.innerHTML = window.innerHeight
}

displayWindowSize()
window.addEventListener('resize', displayWindowSize)
