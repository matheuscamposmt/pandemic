// PADRAO STATE
class Phase {
    execute(gameState) {
        throw new Error("execute method must be implemented by subclass");
    }
}

class TurnPhase extends Phase {
    execute(gameState) {
        if (gameState.actionsRemaining <= 0) {
            console.log("🎬 Turn phase complete, moving to draw phase");
            return new DrawPhase();
        }
        
        console.log(`🎮 Turn phase continuing - ${gameState.actionsRemaining} actions remaining`);
        return this;
    }
    
    canMoveTo(player, city) {
        // Can move to adjacent cities or if player has appropriate cards
        return city.neighbors && city.neighbors.includes(player.location) || 
               player.hasCard(city.name) ||
               (player.location.hasResearchStation && city.hasResearchStation);
    }
    
    buildResearchStation(player, city, gameState) {
        if (player.hasCard(city.name)) {
            player.discard(city.name);
            city.hasResearchStation = true;
            gameState.researchStationCount = (gameState.researchStationCount || 0) + 1;
            console.log(`Research station built in ${city.name}`);
            return true;
        }
        return false;
    }
    
    discoverCure(player, gameState) {
        if (player.canDiscoverCure(gameState)) {
            const colors = ["Blue", "Yellow", "Black", "Red"];
            
            for (let color of colors) {
                if (player.hasEnoughCardsForCure(color) && !gameState.curedDiseases.has(color)) {
                    player.useCureCards(color);
                    gameState.addCure(color);
                    console.log(`Cure discovered for ${color} disease!`);
                    return true;
                }
            }
        }
        return false;
    }
}

class DrawPhase extends Phase {
    execute(gameState) {
        console.log("📥 DRAW PHASE: Drawing 2 player cards");
        
        const currentPlayer = gameState.getCurrentPlayer();
        const handBefore = currentPlayer.hand.length;
        
        gameState.drawPlayerCards(2);
        
        const handAfter = currentPlayer.hand.length;
        const cardsDrawn = handAfter - handBefore;
        
        console.log(`${currentPlayer.name} drew ${cardsDrawn} cards (hand: ${handAfter}/7)`);
        
        // Check hand limit
        if (currentPlayer.hand.length > 7) {
            console.log(`⚠️ ${currentPlayer.name} has ${currentPlayer.hand.length} cards, must discard to 7`);
            // TODO: Implement discard logic
        }
        
        console.log("Draw phase complete, moving to infect phase");
        return new InfectPhase();
    }
}

class InfectPhase extends Phase {
    execute(gameState) {
        const currentRate = gameState.getCurrentInfectionRate();
        console.log(`🦠 INFECT PHASE: Drawing ${currentRate} infection cards`);
        
        const infectedCitiesBefore = gameState.board.getInfectedCities().length;
        
        gameState.drawInfectionCards(currentRate);
        
        const infectedCitiesAfter = gameState.board.getInfectedCities().length;
        const newInfections = infectedCitiesAfter - infectedCitiesBefore;
        
        if (newInfections > 0) {
            console.log(`💀 ${newInfections} new cities infected`);
        }
        
        // Check lose conditions
        if (gameState.checkLoseCondition()) {
            console.log("💀 GAME OVER: Lose condition triggered during infection phase");
            gameState.gameOver = true;
            return this;
        }
        
        // Move to next player
        gameState.nextPlayer();
        console.log("Infect phase complete, starting next player's turn");
        return new TurnPhase();
    }
} 