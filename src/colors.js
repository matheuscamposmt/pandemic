var WHITE = "#FFFFFF"
var BLACK = "#000000"
var BROWN = "#7A5230"
var LIGHT_BROWN = "#947459"
var RED = "#FF0000"
var GREEN = "#00FF00"
var BLUE = "#0000FF"
var LIGHT_BLUE = "#ADD8E6"
var YELLOW = "#FFFF00"
var FOAM = "#E2F7FD"
var BEESWAX = "#FDF5BD"
var SNOWY_MINT = "#D6FFD6"
var CHATELLE = "#BBB1BF"
var LAVENDER_BLUSH = "#FFE3EA"


function isColor(color, colorText, colorHex) {
    return color == colorText || color == colorHex
}

function isBlue(color) {
    return this.isColor(color, "Blue", BLUE)
}

function isYellow(color) {
    return this.isColor(color, "Yellow", YELLOW)
}

function isBlack(color) {
    return this.isColor(color, "Black", BLACK)
}

function isRed(color) {
    return this.isColor(color, "Red", RED)
}

function textToHex(colorText) {
    if (colorText === "Blue") {
        return BLUE
    } else if (colorText === "Yellow") {
        return YELLOW
    } else if (colorText === "Black") {
        return BLACK
    } else if (colorText === "Red") {
        return RED
    } else {
        console.log("Unsupported color: " + colorText)
    }
}
