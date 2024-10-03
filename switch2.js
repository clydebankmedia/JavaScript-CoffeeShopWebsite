// Utility functions

function capFirstLetter(string) {
    return string.charAt(0).toUpperCase() + string.slice(1)
}

function changeBgColor(element, color) {
    element.style.backgroundColor = color
}

// Data for selector

const colors = {
    "red": "#FF0000",
    "orange": "#FFA500",
    "yellow": "#FFFF00",
    "green": "#008000",
    "blue": "#0000FF",
    "indigo": "#4B0082",
    "violet": "#EE82EE"
}

// Define function to be executed on the change event

function changeColor(swatch, event) {
    changeBgColor(swatch, event.target.value)
}

const selectorPrototype = {
    render: (values, parent, id, onChange, swatch = "", className = "") => {
        let select = document.createElement("select")
        select.id = id
        if (className) {
            select.className = className
        }
        for (let value in values) {
            let option = document.createElement("option")
            option.value = values[value]
            option.innerHTML = capFirstLetter(value)
            select.appendChild(option)
        }

        select.addEventListener("change", (event) => {
            onChange(swatch, event)
        })
        
        parent.appendChild(select)
    }
}

let colorSwatch = document.getElementById("colorSwatch")
let colorSelection = document.getElementById("colorSelection")

let colorSelector = Object.create(selectorPrototype)

colorSelector.render(colors, colorSelection, 
         "colorSelect", changeColor, colorSwatch)
