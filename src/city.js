class City {
    constructor(name, x, y, color) {
        this.name = name;
        this.color = color;
        this.x = x;
        this.y = y;
        this.width = 20;
        this.height = 20;
        this.neighborCities = [];

        this.infections = {};
        this.wasOutbreakInThisRound = false;

        this.hasResearchCenter = false;
    }
    render() {
        var hOffset = 20;

        context.fillStyle = LAVENDER_BLUSH;
        context.fillStyle = BLACK;
        context.textAlign = "center";
        context.textBaseline = "middle";
        context.font = 10 + "px Arial";

        var vOffset = 0;
        for (var [infection, occurrences] of Object.entries(this.infections)) {
            for (var i = 0; i < occurrences; i++) {
                var colorHex;
                if (infection === "Blue")
                    colorHex = BLUE;
                else if (infection === "Yellow")
                    colorHex = YELLOW;
                else if (infection === "Black")
                    colorHex = BLACK;
                else if (infection === "Red")
                    colorHex = RED;
                else
                    console.log("Unsupported color: " + color);

                context.fillStyle = colorHex;
                context.fillRect(this.x + hOffset, this.y + vOffset, this.width, this.height);
                vOffset += this.height;
            }
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
    isClicked(pointX, pointY) {
        var isCityClicked = this.isCityClicked(pointX, pointY);
        var isInfectionClicked = this.isInfectionClicked(pointX, pointY);
        var isResearchCenterClicked = this.isResearchCenterClicked(pointX, pointY);
        return isCityClicked || isInfectionClicked || isResearchCenterClicked;
    }
    isCityClicked(pointX, pointY) {
        return pointIntersectsWithSquare(pointX, pointY, this.x, this.y, this.width, this.height);
    }
    setNeighborCities(cities) {
        this.neighborCities = cities;
    }
    // Infections
    /// public
    startMultipleInfections(outbreakMarker, infectionCubeHandler, cureHandler, numberOfInfections) {
        for (var i = 0; i < numberOfInfections; i++) {
            this.startInfection(outbreakMarker, infectionCubeHandler, cureHandler);
        }
    }
    startInfection(outbreakMarker, infectionCubeHandler, cureHandler) {
        this.infect(this.color, outbreakMarker, infectionCubeHandler, cureHandler);
        this.cleanInfectionFlag();
    }
    /// private
    infect(color, outbreakMarker, infectionCubeHandler, cureHandler) {
        if (this.wasOutbreakInThisRound)
            return;
        if (cureHandler.hasCure(color))
            return;

        var numberOfInfectionsByColor = this.infections[color] || 0
        if (numberOfInfectionsByColor < 3) {
            infectionCubeHandler.decr(color, 1);
            this.infections[color] = 1 + numberOfInfectionsByColor
        } else {
            this.outbreak(color, outbreakMarker, infectionCubeHandler, cureHandler);
        }
    }
    outbreak(color, outbreakMarker, infectionCubeHandler, cureHandler) {
        this.wasOutbreakInThisRound = true;
        outbreakMarker.incr();

        for (var i = 0; i < this.neighborCities.length; i++) {
            var neighborCity = this.neighborCities[i];
            neighborCity.infect(color, outbreakMarker, infectionCubeHandler, cureHandler);
        }
    }
    cleanInfectionFlag() {
        if (!this.wasOutbreakInThisRound)
            return;

        this.wasOutbreakInThisRound = false;
        for (var i = 0; i < this.neighborCities.length; i++) {
            this.neighborCities[i].cleanInfectionFlag();
        }
    }
    isInfected() {
        for (var [_, occurrences] of Object.entries(this.infections)) {
            if (0 < occurrences) {
                return true
            }
        }
        return false
    }
    disinfect(infectionCubeHandler, cureHandler, pointX, pointY) {
        if (this.isInfected()) {
            var infection = this.getClickedInfection(pointX, pointY);
            var hasCure = cureHandler.hasCure(infection);
            if (hasCure) {
                var disinfectionRate = this.infections[infection];
                this.infections[infection] = 0
            } else {
                var disinfectionRate = 1;
                this.infections[infection] -= 1 // Maybe check consistency 0 <= #infections
            }
            infectionCubeHandler.incr(infection, disinfectionRate);
        }
    }
    isInfectionClicked(pointX, pointY) {
        return this.getClickedInfection(pointX, pointY) != undefined;
    }
    getClickedInfection(pointX, pointY) {
        if (!this.isInfected()) {
            return undefined
        }

        var vOffset = 0;
        for (var [color, occurrences] of Object.entries(this.infections)) {
            for (var i = 0; i < occurrences; i++) {
                var intersects = pointIntersectsWithSquare(pointX, pointY, this.x + this.width, this.y + vOffset, this.width, this.height);
                if (intersects)
                    return color;

                vOffset += this.height;
            }
        }

        return undefined;
    }
    // Research center
    isResearchCenterClicked(pointX, pointY) {
        return this.hasResearchCenter && pointIntersectsWithSquare(pointX, pointY, this.x - this.width, this.y, this.width, this.height);
    }
    makeResearchCenter() {
        this.hasResearchCenter = true;
    }
}

var pointIntersectsWithSquare = function (pointX, pointY, squareX, squareY, squareWidth, squareHeight) {
    return squareX <= pointX && pointX <= squareX + squareWidth
        && squareY <= pointY && pointY <= squareY + squareHeight;
}
