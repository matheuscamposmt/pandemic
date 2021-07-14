class OutbreakMarker {
    constructor() {
        this.numberOfOutbreaks = 0
        this.maximumNumberOfOutbreaks = 8
    }
    render() {
        var xEven = 85
        var xOdd = 127

        var x = this.numberOfOutbreaks % 2 == 0 ? xEven : xOdd
        var y = 34 * this.numberOfOutbreaks + 466

        context.fillStyle = CHATELLE
        context.fillRect(x, y, 20, 20)
    }
    incr() {
        this.numberOfOutbreaks++
        this.numberOfOutbreaks = Math.min(this.maximumNumberOfOutbreaks, this.numberOfOutbreaks)
    }
    hasLost() {
        return this.numberOfOutbreaks == this.maximumNumberOfOutbreaks
    }
}
