function Player(city) {
    this.city = city;
}

Player.prototype.render = function() {
    context.fillStyle = SNOWY_MINT;
    context.fillRect(this.city.x, this.city.y, 20, 20);
}

Player.prototype.update = function(city) {
    this.city = city;
}
