// PADRAO FACADE
class Game {
    constructor(numberOfPlayers = 2, difficulty = 'Normal') {
        this.gameState = new GameState(numberOfPlayers, difficulty);
    }
    
    startGame() {
        this.gameState.setupInitialState();
        this.gameState.startGame();
        console.log("Pandemic game started!");
        console.log(`Players: ${this.gameState.players.map(p => p.name).join(', ')}`);
        console.log(`Difficulty: ${this.gameState.difficulty}`);
        return true;
    }
    
    // Player actions
    movePlayer(cityName) {
        const currentPlayer = this.gameState.getCurrentPlayer();
        const targetCity = this.gameState.board?.findCityByName(cityName);
        
        if (!targetCity) {
            console.log(`City ${cityName} not found`);
            return false;
        }

        if (currentPlayer.moveTo(targetCity, this.gameState)) {
            console.log(`${currentPlayer.name} moved to ${cityName}`);
            return true;
        }
        
        console.log(`Cannot move to ${cityName}`);
        return false;
    }
    
    treatDisease() {
        const currentPlayer = this.gameState.getCurrentPlayer();
        return currentPlayer.treatDisease(this.gameState, this.gameState.board);
    }
    
    buildResearchStation() {
        const currentPlayer = this.gameState.getCurrentPlayer();
        const currentCity = currentPlayer.location;
        
        if (this.gameState.currentPhase instanceof TurnPhase) {
            return this.gameState.currentPhase.buildResearchStation(
                currentPlayer, 
                currentCity, 
                this.gameState
            );
        }
        
        console.log("Can only build research stations during turn phase");
        return false;
    }
    
    discoverCure() {
        const currentPlayer = this.gameState.getCurrentPlayer();
        
        if (this.gameState.currentPhase instanceof TurnPhase) {
            return this.gameState.currentPhase.discoverCure(currentPlayer, this.gameState);
        }
        
        console.log("Can only discover cures during turn phase");
        return false;
    }
    
    shareKnowledge(otherPlayerName, cardName) {
        const currentPlayer = this.gameState.getCurrentPlayer();
        const otherPlayer = this.gameState.players.find(p => p.name === otherPlayerName);
        
        if (!otherPlayer) {
            console.log(`Player ${otherPlayerName} not found`);
            return false;
        }
        
        const success = currentPlayer.shareKnowledge(otherPlayer, cardName);
        return success;
    }
    
    // Game flow
    endTurn() {
        console.log(`${this.gameState.getCurrentPlayer().name} ending turn`);
        
        // Force actions to 0 to trigger phase transition
        this.gameState.actionsRemaining = 0;
        
        // Let the phase system naturally execute until it stops at TurnPhase
        this.gameState.nextPhase();
        
        if (this.gameState.gameWon) {
            console.log("Congratulations! You saved the world!");
            return { gameOver: true, won: true };
        }
        
        if (this.gameState.checkLoseCondition()) {
            console.log("Game Over! The diseases have spread too far.");
            return { gameOver: true, won: false };
        }
        
        return { gameOver: false, won: false };
    }
    
    // Game state queries
    getCurrentPlayer() {
        return this.gameState.getCurrentPlayer();
    }
    
    getGameState() {
        return {
            currentPlayer: this.gameState.getCurrentPlayer().name,
            actionsRemaining: this.gameState.getActions(),
            phase: this.gameState.currentPhase.constructor.name,
            outbreaks: this.gameState.getOutbreakCount(),
            cures: this.gameState.getAllCures(),
            infectionRate: this.gameState.getCurrentInfectionRate(),
            gameOver: this.gameState.gameOver,
            gameWon: this.gameState.gameWon
        };
    }
    
    // Utility methods
    getCityInfo(cityName) {
        const city = this.gameState.board?.findCityByName(cityName);
        if (city) {
            return {
                name: city.name,
                color: city.color,
                infections: city.infections,
                hasResearchStation: city.hasResearchStation,
                neighbors: city.neighbors?.map(n => n.name) || []
            };
        }
        return null;
    }
    
    getPlayerInfo(playerName) {
        const player = this.gameState.players.find(p => p.name === playerName);
        if (player) {
            return {
                name: player.name,
                location: player.location?.name,
                role: player.role.constructor.name,
                hand: player.hand.map(card => card.name),
                actionsRemaining: this.gameState.getActions()
            };
        }
        return null;
    }
} 