function InfectionRateHandler() {
    this.infectionRates = [2, 2, 2, 3, 3, 4, 4];
    this.infectionRateIndex = 0;
    this.infectionRate = this.infectionRates[this.infectionRateIndex];
}

InfectionRateHandler.prototype.render = function() {
    var x = 41 * this.infectionRateIndex + 761;
    var y = 188;

    context.fillStyle = CHATELLE;
    context.fillRect(x, y, 20, 20);
}

InfectionRateHandler.prototype.getInfectionRate = function() {
    return this.infectionRate;
}

InfectionRateHandler.prototype.incr = function() {
    this.infectionRateIndex++;
    this.infectionRateIndex = Math.min(this.infectionRateIndex, this.infectionRates.length - 1);
    this.infectionRate = this.infectionRates[this.infectionRateIndex];
}
