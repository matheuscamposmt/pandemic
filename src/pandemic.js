class Pandemic {
    constructor(numberOfPlayers, difficulty) {
        var map = new StandardMap();
        this.cities = map.setupCities();
        var Atlanta = this.cities[0];
        this.players = [];
        for (var playerNumber = 0; playerNumber < numberOfPlayers; playerNumber++) {
            var newPlayer = new Player(Atlanta);
            this.players.push(newPlayer);
        }
        this.numberOfPlayers = numberOfPlayers;
        this.playerTurn = 0;

        this.outbreakMarker = new OutbreakMarker();
        this.infectionCubeHandler = new InfectionCubeHandler();
        this.cureHandler = new CureHandler();
        this.infectionRateHandler = new InfectionRateHandler();
        this.infectionDeck = new InfectionDeck(this.cities);

        this.numberOfActionsPerTurn = 4;
        this.numberOfActionsLeft = this.numberOfActionsPerTurn;

        this.startGame();
    }
    startGame() {
        var Atlanta = this.cities[0];
        Atlanta.makeResearchCenter();
        this.startGameInfectCities();
    }
    startGameInfectCities() {
        var numberOfCitiesToInfectPerRound = 3;
        var numberOfRounds = 3;
        for (var i = numberOfRounds; 0 < i; i--) {
            for (var j = 0; j < numberOfCitiesToInfectPerRound; j++) {
                var city = this.infectionDeck.getCard();
                city.startMultipleInfections(this.outbreakMarker, this.infectionCubeHandler, this.cureHandler, i);
            }
        }
    }
    render() {
        context.drawImage(backgroundImage, 0, 0, WIDTH, HEIGHT);
        this.outbreakMarker.render();
        this.infectionCubeHandler.render();
        this.cureHandler.render();
        this.infectionRateHandler.render();

        for (var i = 0; i < this.players.length; i++) {
            this.players[i].render();
        }

        for (var i = 0; i < this.cities.length; i++) {
            this.cities[i].render();
        }
    }
    update(mousePressed, mouseX, mouseY) {
        if (this.hasLost()) {
            return;
        }

        var currentPlayer = this.players[this.playerTurn];
        if (mousePressed) {
            for (var i = 0; i < this.cities.length; i++) {
                var city = this.cities[i];
                var isClicked = city.isClicked(mouseX, mouseY);
                if (isClicked) {
                    this.handleAction(currentPlayer, city, mouseX, mouseY);
                }
            }
        }

        if (this.numberOfActionsLeft == 0) {
            for (var infectionNumber = 0; infectionNumber < this.infectionRateHandler.getInfectionRate(); infectionNumber++) {
                var city = this.infectionDeck.getCard();
                city.startInfection(this.outbreakMarker, this.infectionCubeHandler, this.cureHandler);
            }
            // TODO: Draw 2 player cards
            this.numberOfActionsLeft = this.numberOfActionsPerTurn;
            this.nextPlayer();
        }
    }
    handleAction(currentPlayer, city, mouseX, mouseY) {
        if (city.neighborCities.includes(currentPlayer.city)) {
            currentPlayer.update(city);
        } else if (city === currentPlayer.city) {
            if (city.isInfected() && city.isInfectionClicked(mouseX, mouseY)) {
                city.disinfect(this.infectionCubeHandler, this.cureHandler, mouseX, mouseY);
            } else if (city.isCityClicked(mouseX, mouseY) && !city.hasResearchCenter) {
                city.makeResearchCenter();
            } else if (city.isResearchCenterClicked(mouseX, mouseY)) {
                this.cureHandler.makeCure("Blue");
            } else {
                console.log("Nothing");
                return;
            }
        } else {
            console.log("Nothing");
            return;
        }
        this.numberOfActionsLeft--;
    }
    nextPlayer() {
        this.playerTurn = (this.playerTurn + 1) % this.players.length;
        console.log("Player " + (this.playerTurn + 1) + "'s turn")
    }
    hasLost() {
        return this.infectionCubeHandler.hasLost()
            || this.outbreakMarker.hasLost();
    }
}
