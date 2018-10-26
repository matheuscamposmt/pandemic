function OutbreakMarker() {
    this.numberOfOutbreaks = 0;
    this.maximumNumberOfOutbreaks = 8;
}

OutbreakMarker.prototype.render = function() {
    var xEven = 85;
    var xOdd = 127;

    var x = this.numberOfOutbreaks % 2 == 0 ? xEven : xOdd;
    var y = 34 * this.numberOfOutbreaks + 466;

    context.fillStyle = CHATELLE;
    context.fillRect(x, y, 20, 20);
}

OutbreakMarker.prototype.incr = function() {
    this.numberOfOutbreaks++;
    this.numberOfOutbreaks = Math.min(this.maximumNumberOfOutbreaks, this.numberOfOutbreaks);
}

OutbreakMarker.prototype.hasLost = function() {
    return this.numberOfOutbreaks == this.maximumNumberOfOutbreaks;
}
