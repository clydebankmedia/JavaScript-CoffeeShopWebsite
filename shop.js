// ClydeBank Coffee Shop
// Copyright (C) 2024 ClydeBank Media, All Rights Reserved.
// Written by Robert W. Oliver II, Author of JavaScript QuickStart Guide

// The locale and currency to use for formatting
// Alter these to suit your needs
const locale = "en-US"
const currency = "USD" 

// Menu structure
const menuLinks = {
    "Home": "index.html",
    "About": "index.html",
    "Contact": "index.html"
}

// Our inventory
const inventory = {
    "Regular Coffee": 3.00,
    "Espresso": 3.50,
    "Cappuccino": 4.00,
    "Latte": 4.25
}

// Random number to add to the end of IDs that aren't 
// specified to prevent collisions. Only one per page load is needed
const randomIdPostfix = Math.floor(Math.random() * 100000)

// This object is used here to format currency 
// (see addToCart() and listPrototype for use)
const intlFormat = new Intl.NumberFormat(locale, {
    style: "currency",
    currency: currency,
})

// Retrieve a cookie by name
function getCookie(name) {
  // Add the equal sign to the name (name=)
  let cookieName = name + "="

  // Decode cookie string to handle cookies with special characters
  let decodedCookie = decodeURIComponent(document.cookie)

  // Check if there are any cookies to process
  if (!decodedCookie) {
    return null 
  }

  // Split document.cookie on semicolons into an array
  let cookieArray = decodedCookie.split(";")

  // Iterate through the name=value pairs in the cookieArray
  for (let i = 0; i < cookieArray.length; i++) {
    let cookie = cookieArray[i]

    // Remove any leading spaces using a regular expression
    cookie = cookie.replace(/^\s+/, "")

    // If cookie is found, return its value
    if (cookie.indexOf(cookieName) === 0) { 
      return cookie.substring(cookieName.length, cookie.length)
    }
  }

  // If cookie name was not found, return null
  return null
}

function replaceNonAlphanumericWithDashes(input) {
    // Regular expression to match spaces and non-alphanumeric characters
    let regex = /[^a-zA-Z0-9]+/g
    // Replace matches with dashes
    let output = input.replace(regex, "-")
    return output
}

// Obtain the cart and return it as JSON
function getCart() {
    // Retrieve the "cart" cookie
    let cartCookie = getCookie("cart")
  
    // If it exists, parse contents and return the result
    // Otherwise return an empty object
    if (cartCookie) {
        return JSON.parse(cartCookie)
    } else {
        return {}
    }
}

function saveCart(cart) {
    // Save the updated cart back to the cookie
    document.cookie = "cart=" + encodeURIComponent(JSON.stringify(cart))
}

// Add an item to the cart
function addToCart(itemName, itemPrice, itemQnty) {
    // Load the existing cart from the cookie (if it exists)
    // If it doesn't exist, cart will be empty
    let cart = {}
    if (document.cookie) {
      cart = JSON.parse(document.cookie.replace("cart=", ""))
      // This strips "cart=stringifiedJSON" into "stringifiedJSON",
      // then parses that and assigns it to the cart object
    }
  
    // Create an object with the name, price, and quantity to add
    const item = {
      name: itemName,
      price: itemPrice,
      quantity: itemQnty
    }
  
    // If a cart item with the same name already exists, 
    // increment quantity. If not, add item to cart
    if (cart[itemName]) {
      cart[itemName].quantity += itemQnty
    } else {
      cart[itemName] = item
    }
  
    // Log to console for diagnostic purposes
    console.log("Added " + JSON.stringify(item) + " to cart!")

    // Save the cart back to the cookie
    saveCart(cart)
}

// Remove item from cart
function removeFromCart(itemName) {
    // Retrieve the "cart" cookie
    let cartCookie = getCookie("cart")
  
    // If it exists, parse contents
    if (cartCookie) {
      let cart = JSON.parse(cartCookie)
      
        // If the item exists in the cart, remove it
        if (cart[itemName]) {
            delete cart[itemName]
            
            // Save the update cart back to the cookie
            saveCart(cart)
        }
    }
}

// Define a button prototype
const buttonPrototype = {
    // HTML element id (defaults to hamburger)
    // Plus random postfix to prevent collisions  
    id: "button" + randomIdPostfix,
    // The text to be displayed on the button
    text: "Click Me",
    // The color of the button
    color: "#CAD317",
    // The border style of the button
    borderStyle: "1px solid #3B1C0B",
    // The click event handler
    clickEvent: false,
    // The CSS class name (defaults to "")
    className: "",
    // The render method (with the parent element as an argument)
    render: function(parent) {
        // Set the variables from properties of this object with the same name
        let {id, text, color, borderStyle, clickEvent, className} = this

        // Construct the button
        let button = document.createElement("button")
        
        // Set the attributes
        button.id = id
        button.textContent = text
        button.style.border = borderStyle
        
        // Assign the clickEvent argument (passed as function) to the onclick event
        button.onclick = clickEvent

        // If className is set, assign it, otherwise ignore
        if (className) {
            button.className = className
        }
        
        // Set the background color
        button.style.backgroundColor = color

        // Add the button to the parent element
        parent.appendChild(button)
    }
}

// Define hamburger menu prototype
const hamburgerMenuPrototype = {
    // HTML element id (defaults to hamburger)
    // Plus random postfix to prevent collisions
    id: "hamburger" + randomIdPostfix,
    // The ID of the mainMenu div (defaults to mainMenu)
    mainMenuId: "mainMenu",
    // The width and height of the hamburgerMenu (by default, 40)
    width: 40,
    height: 40,
    // The color of the hamburgerMenu
    color: "#CAD317",
    // The render method (with the parent element as an argument)
    render: function(parent) {
        // Set the variables from properties of this object with the same name
        let {id, mainMenuId, width, height, color} = this

        // Construct the SVG
        const svgUrl = "http://www.w3.org/2000/svg"
        let svg = document.createElementNS(svgUrl, "svg")
        let rect1 = document.createElementNS(svgUrl, "rect")
        let rect2 = document.createElementNS(svgUrl, "rect")
        let rect3 = document.createElementNS(svgUrl, "rect")

        // Set the attributes for the SVG
        svg.id = id
        svg.classList.add("hamburger")
        svg.setAttribute("width", width)
        svg.setAttribute("height", height)
        svg.setAttribute("viewBox", "0 0 100 80")
        svg.setAttribute("fill", color)

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
const mainMenuPrototype = {
    // The links to be displayed in the menu
    links: {},
    // The ID of the mainMenu div (defaults to mainMenu)
    // Plus a random postfix to prevent collisions
    id: "mainMenu" + randomIdPostfix,
    // The ID of the hamburger menu (defaults to hamburger)
    hamburgerId: "hamburger",
    // The minimum width and minimum height of the menu (defaults to 300px, 800px)
    minWidth: "300px",
    maxWidth: "800px",
    // The background color of the menu (defaults to #F4F1DE)
    backgroundColor: "#F4F1DE",
    // The border color of the menu (defaults to #3B1C0B)
    borderColor: "#3B1C0B",
    // The link color of the menu (defaults to #3B1C0B)
    linkColor: "#3B1C0B",
    // The render method (with the parent element as an argument)
    render: function(parent) {
        // Set the variables from properties of this object with the same name
        let {links, id, minWidth, maxWidth, backgroundColor, borderColor, linkColor} = this

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

            // Add the completed HTML of the link 
            // (i.e., <a href="...">...</a>) to the list item
            li.innerHTML = a.outerHTML

            // Add the list item (li) to the unordered list (ul)
            ul.appendChild(li)
        }

        // When the parent of the menu (i.e., the main div) 
        // is clicked, hide the menu
        div.addEventListener("click", (event) => {
            // Hide the menu
            div.style.display = "none"
        })

        // Add the list's completed HTML to the div
        div.innerHTML = ul.outerHTML
                
        parent.appendChild(div)
    }
}

// The list prototype
const listPrototype = {
    // Values to be displayed in the list
    values: {},
    // The HTML element id (defaults to list + random number)
    // The random number is used to prevent duplicate IDs in the case
    // of multiple lists on the same page
    id: "list" + randomIdPostfix,
    // The separator between the key and value (defaults to " - $")
    separator: " - ",
    // The class name of the list (defaults to "")
    className: "",
    // Should we format the values as currency? (defaults to true)
    formatCurrency: true,
    // The render method, with the parent element as an argument
    render: function(parent) {
        // Set the variables from properties of this object with the same name
        let {values, id, separator, className, formatCurrency} = this
        
        if (!parent) {
            throw new Error("listPrototype: parent property not defined")
        }
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

            // Add an id to the li element based on the name
            li.id = "item-" + replaceNonAlphanumericWithDashes(k)

            // Add the text content to the li element with the separator
            // If formatCurrency is true, format the value as currency
            if (formatCurrency) {
                li.textContent = k + separator + intlFormat.format(v)
            } else {
                li.textContent = k + separator + v
            }

            // Append the li element to the unordered list
            ul.appendChild(li)
        }

        // Append the unordered list to the parent element
        parent.appendChild(ul)
    }
}

// Cart view prototype
const cartViewPrototype = {
    // The background color of the cart (defaults to #F4F1DE)
    backgroundColor: "#F4F1DE",
    // The border of the cart (defaults to #3B1C0B)
    borderStyle: "1px solid #3B1C0B",
    // The padding of the cart (defaults to 1em)
    padding: "1em",
    // The title of the cart (defaults to "Your Cart")
    cartTitle: "Your Cart",
    // The contents of the cart (defaults to {})
    cartContents: {},
    render: () => {
        // Set the variables from properties of this object with the same name
        let {backgroundColor, borderStyle, padding, cartTitle, cartContents} = this

        // Create a container div in the middle of the screen
        let div = document.createElement("div")
        div.style.position = "absolute"
        div.style.top = "50%"
        div.style.left = "50%"
        div.style.transform = "translate(-50%, -50%)"
        div.style.backgroundColor = backgroundColor
        div.style.border = borderStyle
        div.style.padding = padding
        div.style.minWidth = "300px"
        div.style.maxWidth = "600px"

        // Add a title to the cart
        let h2 = document.createElement("h1")
        h2.textContent = cartTitle
        div.appendChild(h2)

        // Create the unordered list element
        let ul = document.createElement("ul")
        
        // Loop through the cart and create a new li element for each
        for (let item in cartContents) {
            // Create a key/value pair in the variables k and v
            let price = cartContents[item]

            // Create the li element
            let li = document.createElement("li")

            // Add the text content to the li element with the separator
            li.textContent = k + separator + v

            // Append the li element to the unordered list
            ul.appendChild(li)
        }

        // Append the unordered list to the parent element
        div.appendChild(ul)
    }
}

// Run only when the document is loaded and ready to go
document.addEventListener("DOMContentLoaded", function(event) { 
    
    // Important divs to reference
    // Technically, body is not a div, but it's a useful shortcut
    const body = document.body
    const header = document.getElementsByTagName("header")[0]
    const coffeeMenu = document.getElementById("coffee-menu-container")

    // Create the menu object from the prototype
    let menu = Object.create(listPrototype)
    menu.values = inventory
    menu.className = "coffee-list"
    menu.render(coffeeMenu) 

    // Create add to cart buttons for each menu item
    for (let item in inventory) {
        // Create the button
        let button = Object.create(buttonPrototype)
 
        // Give the button a unique name
        button.id = "button" + "-" + replaceNonAlphanumericWithDashes(item)
 
        // Add the text and style to the button
        button.text = "Add to Cart"
        button.className = "add-to-cart-button"
        
        // Handle the button click
        button.clickEvent = function() {
            // Add the item to the cart
            // Use 1 quantity for now, but this could be added
            // as a property of the button later
            addToCart(item, inventory[item], 1)
            alert("Item added to cart!")
        }
        
        // Get the li element to add the add to cart button to
        const itemId = "item-" + replaceNonAlphanumericWithDashes(item)
        const li = document.getElementById(itemId)

        // Render the button
        button.render(li)
    }

    // Render the menu (hidden by default)
    let mainMenu = Object.create(mainMenuPrototype)
    mainMenu.id = "mainMenu"
    mainMenu.links = menuLinks
    mainMenu.render(body)
    
    // Render the hamburger menu
    let hamburgerMenu = Object.create(hamburgerMenuPrototype)
    hamburgerMenu.id = "hamburger"
    hamburgerMenu.render(header)
    
})
