class InfectionCubeHandler {
    constructor() {
        var initialValue = 24

        this.numberOfBlueCubes = initialValue
        this.numberOfYellowCubes = initialValue
        this.numberOfBlackCubes = initialValue
        this.numberOfRedCubes = initialValue
    }
    render() {
        context.textAlign = "center"
        context.textBaseline = "middle"
        context.font = 10 + "px Arial"

        var vOffset = 0
        this.renderStat(this.numberOfBlueCubes, BLUE, WHITE, 0)
        this.renderStat(this.numberOfYellowCubes, YELLOW, BLACK, 20)
        this.renderStat(this.numberOfBlackCubes, BLACK, WHITE, 40)
        this.renderStat(this.numberOfRedCubes, RED, WHITE, 60)
    }
    renderStat(value, colorHex, textColorHex, vOffset) {
        var x = 0
        var y = 0
        var width = 20
        var height = 20

        context.fillStyle = colorHex
        context.fillRect(x, y + vOffset, width, height)
        context.fillStyle = textColorHex
        context.fillText(value, x + width / 2, y + height / 2 + vOffset)
    }
    incr(color, numberOfCubes) {
        if (isBlue(color))
            this.numberOfBlueCubes += numberOfCubes
        else if (isYellow(color))
            this.numberOfYellowCubes += numberOfCubes
        else if (isBlack(color))
            this.numberOfBlackCubes += numberOfCubes
        else if (isRed(color))
            this.numberOfRedCubes += numberOfCubes
        else {
            console.log("Unsupported color: " + color)
        }
    }
    decr(color, numberOfCubes) {
        if (isBlue(color))
            this.numberOfBlueCubes -= numberOfCubes
        else if (isYellow(color))
            this.numberOfYellowCubes -= numberOfCubes
        else if (isBlack(color))
            this.numberOfBlackCubes -= numberOfCubes
        else if (isRed(color))
            this.numberOfRedCubes -= numberOfCubes
        else {
            console.log("Unsupported color: " + color)
        }
    }
    hasLost() {
        var remainingBlueCubes = 0 < this.numberOfBlueCubes
        var remainingYellowCubes = 0 < this.numberOfYellowCubes
        var remainingBlackCubes = 0 < this.numberOfBlackCubes
        var remainingRedCubes = 0 < this.numberOfRedCubes
        return !remainingBlueCubes || !remainingYellowCubes || !remainingBlackCubes || !remainingRedCubes
    }
}
