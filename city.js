function City(name, x, y, color) {
    this.name = name;
    this.color = color;
    this.x = x;
    this.y = y;
    this.width = 20;
    this.height = 20;
    this.neighborCities = [];

    this.infections = [];
    this.wasOutbreakInThisRound = false;

    this.hasResearchCenter = false;
}

City.prototype.render = function() {
    var hOffset = 20;

    context.fillStyle = LAVENDER_BLUSH;
    context.fillStyle = BLACK;
    context.textAlign = "center"; 
    context.textBaseline="middle";
    context.font = 10 + "px Arial";

    var vOffset = 0;
    for (var i = 0; i < this.infections.length; i++) {
        var infection = this.infections[i];
        context.fillStyle = infection;
        context.fillRect(this.x + hOffset, this.y + vOffset, this.width, this.height);
        vOffset += this.height;
    }

    if (this.hasResearchCenter) {
        context.fillStyle = LAVENDER_BLUSH;
        context.fillRect(this.x - this.width, this.y, this.width, this.height);
    }

    // context.fillStyle = LAVENDER_BLUSH;
    // context.fillRect(this.x, this.y, this.width, this.height);

    // context.strokeStyle = this.color;
    // for (var i = 0; i < this.neighborCities.length; i++) {
    //     var neighborCity = this.neighborCities[i];
    //     context.beginPath();
    //     context.moveTo(this.x + 5, this.y);
    //     context.lineTo(neighborCity.x - 5, neighborCity.y);
    //     context.stroke();
    // }
}

City.prototype.isClicked = function(pointX, pointY) {
    var isCityClicked = this.isCityClicked(pointX, pointY);
    var isInfectionClicked = this.isInfectionClicked(pointX, pointY);
    var isResearchCenterClicked = this.isResearchCenterClicked(pointX, pointY);
    return isCityClicked || isInfectionClicked || isResearchCenterClicked;
}

City.prototype.isCityClicked = function(pointX, pointY) {
    return pointIntersectsWithSquare(pointX, pointY, this.x, this.y, this.width, this.height);
}

var pointIntersectsWithSquare = function(pointX, pointY, squareX, squareY, squareWidth, squareHeight) {
     return squareX <= pointX && pointX <= squareX + squareWidth
        &&  squareY <= pointY && pointY <= squareY + squareHeight;
}

City.prototype.setNeighborCities = function(cities) {
    this.neighborCities = cities;
}

// Infections
/// public
City.prototype.startMultipleInfections = function(outbreakMarker, infectionCubeHandler, cureHandler, numberOfInfections) {
    for (var i = 0; i < numberOfInfections; i++) {
        this.startInfection(outbreakMarker, infectionCubeHandler, cureHandler);
    }
}

City.prototype.startInfection = function(outbreakMarker, infectionCubeHandler, cureHandler) {
    this.infect(this.color, outbreakMarker, infectionCubeHandler, cureHandler);
    this.cleanInfectionFlag();
}

/// private
City.prototype.infect = function(color, outbreakMarker, infectionCubeHandler, cureHandler) {
    if (this.wasOutbreakInThisRound) return;
    if (cureHandler.hasCure(color)) return;

    if (this.infections.length < 3) {
        infectionCubeHandler.decr(color, 1);

        var colorHex;

        if      (color === "Blue")   colorHex = BLUE;
        else if (color === "Yellow") colorHex = YELLOW;
        else if (color === "Black")  colorHex = BLACK;
        else if (color === "Red")    colorHex = RED;
        else console.log("Unsupported color: " + color);

        this.infections.push(colorHex);
    } else {
        this.outbreak(outbreakMarker, infectionCubeHandler, cureHandler);
    }
}

City.prototype.outbreak = function(outbreakMarker, infectionCubeHandler, cureHandler) {
    this.wasOutbreakInThisRound = true;
    outbreakMarker.incr();

    for (var i = 0; i < this.neighborCities.length; i++) {
        var neighborCity = this.neighborCities[i];
        neighborCity.infect(this.color, outbreakMarker, infectionCubeHandler, cureHandler);
    }
}

City.prototype.cleanInfectionFlag = function() {
    if (!this.wasOutbreakInThisRound) return;

    this.wasOutbreakInThisRound = false;
    for (var i = 0; i < this.neighborCities.length; i++) {
        this.neighborCities[i].cleanInfectionFlag();
    }
}

City.prototype.isInfected = function() {
    return 0 < this.infections.length;
}

City.prototype.disinfect = function(infectionCubeHandler, cureHandler, pointX, pointY) {
    if (this.isInfected()) {
        var infectionIndex = this.getClickedInfection(pointX, pointY);
        if (infectionIndex == undefined) infectionIndex = this.infections.length - 1;
        var infection = this.infections.splice(infectionIndex, 1);

        var disinfectionRate = 1;
        var hasCure = cureHandler.hasCure(infection);
        if (hasCure) {
            for (var i = this.infections.length - 1; 0 <= i; i--) {
                var potentialDisinfection = this.infections[i];
                if (potentialDisinfection == infection) {
                    this.infections.splice(i, 1);
                    disinfectionRate++;
                }
            }
        }
        infectionCubeHandler.incr(infection, disinfectionRate);
    }
}

City.prototype.isInfectionClicked = function(pointX, pointY) {
    return this.getClickedInfection(pointX, pointY) != undefined;
}

City.prototype.getClickedInfection = function(pointX, pointY) {
    var vOffset = 0;
    for (var i = 0; i < this.infections.length; i++) {
        var intersects = pointIntersectsWithSquare(pointX, pointY, this.x + this.width, this.y + vOffset, this.width, this.height);
        if (intersects) return i;

        vOffset += this.height;
    }

    return undefined;
}

// Research center
City.prototype.isResearchCenterClicked = function(pointX, pointY) {
    return this.hasResearchCenter && pointIntersectsWithSquare(pointX, pointY, this.x - this.width, this.y, this.width, this.height);
}

City.prototype.makeResearchCenter = function() {
    this.hasResearchCenter = true;
}
