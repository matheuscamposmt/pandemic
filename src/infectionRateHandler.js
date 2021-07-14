class InfectionRateHandler {
    constructor() {
        this.infectionRates = [2, 2, 2, 3, 3, 4, 4]
        this.infectionRateIndex = 0
        this.infectionRate = this.infectionRates[this.infectionRateIndex]
    }
    render() {
        var x = 41 * this.infectionRateIndex + 761
        var y = 188

        context.fillStyle = CHATELLE
        context.fillRect(x, y, 20, 20)
    }
    getInfectionRate() {
        return this.infectionRate
    }
    incr() {
        this.infectionRateIndex++
        this.infectionRateIndex = Math.min(this.infectionRateIndex, this.infectionRates.length - 1)
        this.infectionRate = this.infectionRates[this.infectionRateIndex]
    }
}
