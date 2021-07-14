class Menu {
	constructor() {
		this.isConfigured = false
		this.numberOfPlayers = 2
		this.difficulty = "Easy"
	}
	getIsConfigured() {
		return this.isConfigured
	}
	getNumberOfPlayers() {
		return this.numberOfPlayers
	}
	getDifficulty() {
		return this.difficulty
	}
	render() {
		context.fillStyle = FOAM
		context.fillRect(0, 0, WIDTH, HEIGHT)
		this.drawNumberOfPlayersSelection()
		this.drawDifficultySelection()
		this.renderText()
	}
	renderText() {
		var vOffset = 0
		this.drawText("Number of players:  2  3  4", BLACK, 0)
		this.drawText("Difficulty:  Easy  Medium  Hard", BLACK, 40)
	}
	drawText(value, textColorHex, vOffset) {
		context.textAlign = "left"
		context.textBaseline = "middle"
		context.font = 10 + "px Arial"

		var x = 100
		var y = 0
		var width = 20
		var height = 20

		context.fillStyle = textColorHex
		context.fillText(value, x + width / 2, y + height / 2 + vOffset)
	}
	drawNumberOfPlayersSelection() {
		var x, y = 5, width = 11, height = 10
		if (this.numberOfPlayers === 2) {
			x = 197
		} else if (this.numberOfPlayers === 3) {
			x = 208
		} else if (this.numberOfPlayers === 4) {
			x = 219
		}
		context.fillStyle = LAVENDER_BLUSH
		context.fillRect(x, y, width, height)
	}
	drawDifficultySelection() {
		var x, y = 45, width, height = 10
		if (this.difficulty === "Easy") {
			x = 155
			width = 24
		} else if (this.difficulty === "Medium") {
			x = 182
			width = 40
		} else if (this.difficulty === "Hard") {
			x = 223
			width = 25
		}
		context.fillStyle = LAVENDER_BLUSH
		context.fillRect(x, y, width, height)
	}
	update(mousePressed, mouseX, mouseY) {
	}
}
