// ClydeBank Coffee Shop

var currentPage = "main"

// Define hamburger menu object
const hamburgerMenu = {
    render: (parent, id = "hamburger", mainMenuId = "mainMenu", width = 40, height = 40) => {

        // Construct the SVG
        let svg = document.createElementNS("http://www.w3.org/2000/svg", "svg")
        let rect1 = document.createElementNS("http://www.w3.org/2000/svg", "rect")
        let rect2 = document.createElementNS("http://www.w3.org/2000/svg", "rect")
        let rect3 = document.createElementNS("http://www.w3.org/2000/svg", "rect")

        // Set the attributes for the SVG
        svg.id = id
        svg.classList.add("hamburger")
        svg.setAttribute("width", width)
        svg.setAttribute("height", height)
        svg.setAttribute("viewBox", "0 0 100 80")
        svg.setAttribute("fill", "#cad317")

        // Set the attributes for the rectangles
        rect1.setAttribute("width", "100")
        rect1.setAttribute("height", "20")

        rect2.setAttribute("y", "30")
        rect2.setAttribute("width", "100")
        rect2.setAttribute("height", "20")

        rect3.setAttribute("y", "60")
        rect3.setAttribute("width", "100")
        rect3.setAttribute("height", "20")

        // Add the rectangles to the SVG
        svg.appendChild(rect1)
        svg.appendChild(rect2)
        svg.appendChild(rect3)

        // When the hamburger is clicked, show the menu
        // But first, get the menu
        let menu = document.getElementById(mainMenuId)
        svg.addEventListener("click", (event) => {
            // Show the menu
            menu.style.display = "block"
        })
                
        parent.appendChild(svg)
    }
}

// Define a menu
const mainMenu = {
    render: (parent, links, id = "mainMenu", hamburgerId = "hamburger",
        minWidth = "300px", maxWidth = "800px", 
        backgroundColor = "#F4F1DE", borderColor = "#3B1C0B", 
        linkColor = "#3B1C0B") => {

        // Create the div element
        let div = document.createElement("div")

        // Set attributes
        div.id = id
        div.style.minWidth = minWidth
        div.style.maxWidth = maxWidth
        div.style.top = "-1px"
        div.style.left = "-1px"
        div.style.position = "absolute"
        div.style.height = "70%"
        div.style.backgroundColor = backgroundColor
        div.style.border = "1px solid " + borderColor

        // We want the menu to be hidden by default
        div.style.display = "none"

        // Construct the menu
        let ul = document.createElement("ul")

        // Add some padding to the ul element and make the text bigger
        ul.style.padding = "1em"
        ul.style.fontSize = "1.25em"

	// Build the menu
        for (let link in links) {

          // Create the needed elements
          let li = document.createElement("li")
          let a = document.createElement("a")

	  // Make sure the link is readable
          a.style.color = linkColor

          // Hide the dot
          li.style.listStyle = "none"

          // Create the link
          a.href = links[link]
          a.innerHTML = link

          // If the link is a pound sign, treat differently
          if (links[link] == "#") {
            // When the link is clicked, hide the menu
            a.addEventListener("click", (event) => {
              // Prevent the default action (i.e., following the link)
              event.preventDefault()
              // If "Home" is link title, make newPage "main"
              let newPage
              if (link == "Home") {
                newPage = "main"
              } else {
	        // Otherwise, set lowercase version of the new page name
    	         newPage = link.toLocaleLowerCase()                    	
              }

              // Hide the current page if not main, since it contains everything else
	            if (currentPage != "main") {
                document.getElementById(currentPage).style.display = "none"
	            }

              // Show the new page
              document.getElementById(newPage).style.display = "block"

              // Set the currentPage variable to the new page
              currentPage = newPage 
            })
	}

          // Add the list item (li) to the unordered list (ul) with the link
          li.appendChild(a)
          ul.appendChild(li)
		    }

        // When the parent of the menu (i.e., the main div) 
        // is clicked, hide the menu
        div.addEventListener("click", (event) => {
          // Hide the menu
          div.style.display = "none"
        })

        // Add the list's completed HTML to the div
        div.appendChild(ul)
        
        // Now add the main div to the parent
        parent.appendChild(div)
     }
  }

// The list prototype
const listPrototype = {
    render: (values, parent, id, separator = " - $", className = "") => {
       
        // Create the unordered list element
        let ul = document.createElement("ul")
        
        // Assign the HTML element ID
        ul.id = id

        // If className is set, assign it, otherwise ignore
        if (className) {
            ul.className = className
        }

        // Loop through the values array and create a new li element for each
        for (let key in values) {
            // Create a key/value pair in the variables k and v
            let k = key
            let v = values[key]

            // Create the li element
            let li = document.createElement("li")

            // Add the text content to the li element with the separator
            li.textContent = k + separator + v.toFixed(2)

            // Append the li element to the unordered list
            ul.appendChild(li)
        }

        // Append the unordered list to the parent element
        parent.appendChild(ul)
    }
}

// Menu structure
// (for now, these are all links to the home page)

const menuLinks = {
    "Home": "#",
    "About": "#",
    "Contact": "#"
}

// Our inventory
let inventory = {
    "Regular Coffee": 3.00,
    "Espresso": 3.50,
    "Cappuccino": 4.00,
    "Latte": 4.25
}

// Run only when the document is loaded and ready to go
document.addEventListener("DOMContentLoaded", function(event) { 

    // The main div
    const header = document.getElementsByTagName("header")[0]
    
    // Obtain reference to the menu list by ID
    let menuList = document.getElementById("coffee-menu-container")

    // Create the menu object from the prototype
    let menu = Object.create(listPrototype)

    // Render the inventory menu
    menu.render(inventory, menuList, "coffee-menu", " - $", "coffee-list")

    // Render the menu (hidden by default)
    mainMenu.render(main, menuLinks)

    // Render the hamburger menu
    hamburgerMenu.render(header)
    
})
