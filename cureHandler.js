function CureHandler() {
    this.hasCureBlue = false;
    this.hasCureYellow = false;
    this.hasCureBlack = false;
    this.hasCureRed = false;
}

CureHandler.prototype.render = function () {
    var x = 398;
    var y = 785;
    var width = 20;
    var height = 20;
    var vOffset = 55;
    context.fillStyle = WHITE;

    if (this.hasCureBlue) {
        context.fillRect(x + 2 * vOffset, y, width, height);
    }
    if (this.hasCureYellow) {
        context.fillRect(x + 0 * vOffset, y, width, height);
    }
    if (this.hasCureBlack) {
        context.fillRect(x + 3 * vOffset - 5, y, width, height);
    }
    if (this.hasCureRed) {
        context.fillRect(x + 1 * vOffset, y, width, height);
    }
}

CureHandler.prototype.makeCure = function (color) {
    if (isBlue(color)) {
        this.hasCureBlue = true;
    } else if (isYellow(color)) {
        this.hasCureYellow = true;
    } else if (isBlack(color)) {
        this.hasCureBlack = true;
    } else if (isRed(color)) {
        this.hasCureRed = true;
    } else {
        console.log("Unsupported color: " + color);
    }
}

CureHandler.prototype.hasCure = function (color) {
    if (isBlue(color)) {
        return this.hasCureBlue;
    } else if (isYellow(color)) {
        return this.hasCureYellow;
    } else if (isBlack(color)) {
        return this.hasCureBlack;
    } else if (isRed(color)) {
        return this.hasCureRed;
    } else {
        console.log("Unsupported color: " + color);
    }
}
