// Only bind after element exists
$(function() {
    // Bind to the click event of the editGreeting button
    $("#editGreeting").on("click", function() {
       // Get the firstName value from the input box
        let firstName = $("#firstName").val()
        // Adjust the greeting text in the p tag with the name
        $("#greeting").text(`Hello, ${firstName}!`)
        // Move the purple box to the right by:
        //   1) setting its opacity to 0.25 (25%)
        //   2) adding 340px to its left position
        //   3) setting the final width to 0px
        //   4) setting the final height to 0px
        //   5) animating the change over 3 seconds
        $("#purpleBox").animate({
            opacity: "0.0",
            left: "+=340px",
            height: "0px",
            width: "0px"
        }, 3000)
    })
})
