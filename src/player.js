class Player {
    constructor(city) {
        this.city = city
    }
    render() {
        context.fillStyle = SNOWY_MINT
        context.fillRect(this.city.x, this.city.y, 20, 20)
    }
    update(city) {
        this.city = city
    }
}
