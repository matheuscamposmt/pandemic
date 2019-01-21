function Menu() {
    this.isConfigured = false;
	this.numberOfPlayers;
	this.difficulty;	
}

Menu.prototype.getIsConfigured = function() {
	return this.isConfigured;
}

Menu.prototype.getNumberOfPlayers = function() {
	return this.numberOfPlayers;
}

Menu.prototype.getDifficulty = function() {
	return this.difficulty;
}

Menu.prototype.render = function () {
	context.fillStyle = BLACK;
    context.fillRect(0, 0, WIDTH, HEIGHT);
    this.renderText();
};

Menu.prototype.renderText = function() {
    var vOffset = 0;
    this.drawText("Number of players:  1  2  3  4",  WHITE, 0);
    this.drawText("Difficulty:  Easy  Medium  Hard", WHITE, 40);
}

Menu.prototype.drawText = function(value, textColorHex, vOffset) {
	context.textAlign = "left"; 
    context.textBaseline="middle";
    context.font = 10 + "px Arial";

    var x = 100;
    var y = 0;    
    var width = 20;
    var height = 20;

    context.fillStyle = textColorHex;
    context.fillText(value, x + width / 2, y + height / 2 + vOffset);
}


Menu.prototype.update = function(mousePressed, mouseX, mouseY) {
    
}
