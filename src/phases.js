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
        
        // Clear infection results at the start of a new turn
        if (gameState.actionsRemaining === 4) {
            gameState.clearInfectionResults();
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
        gameState.clearInfectionResults();
        console.log("📥 DRAW PHASE: Drawing 2 player cards");
        
        const currentPlayer = gameState.getCurrentPlayer();
        console.log("CURRENT PLAYER IS: " + currentPlayer.name);
        
        gameState.drawPlayerCards(2);
        
        // Enforce hand limit after drawing
        gameState.enforceHandLimit(currentPlayer);
        
        console.log("Draw phase complete, moving to infect phase");
        return new InfectPhase();
    }
    
    handleEpidemic(gameState) {
        console.log("💥 EPIDEMIC EVENT TRIGGERED!");
        
        // 1. Increase infection rate
        const oldRate = gameState.getCurrentInfectionRate();
        gameState.increaseInfectionRate();
        const newRate = gameState.getCurrentInfectionRate();
        console.log(`📈 Infection rate increased: ${oldRate} → ${newRate}`);
        
        // 2. Draw bottom card from infection deck and infect with 3 cubes
        const bottomCard = gameState.infectionDeck.drawBottom();
        if (bottomCard && bottomCard.city) {
            console.log(`🦠 Epidemic infection: ${bottomCard.city.name} gets 3 cubes`);
            gameState.board.infect(bottomCard.city, 3, gameState);
        }
        
        // 3. Intensify - shuffle infection discard pile and place on top
        gameState.infectionDeck.intensify();
        console.log("🔄 Infection deck intensified");
    }
}

class InfectPhase extends Phase {
    execute(gameState) {
        // Check if infection should be skipped (One Quiet Night effect)
        console.log(`🌙 Checking One Quiet Night flag: ${gameState.skipNextInfection}`);
        if (gameState.skipNextInfection) {
            gameState.skipNextInfection = false; // Reset the flag
            
            // Keep epidemic results but clear normal infection results
            gameState.lastInfectionResults = [];
            
            gameState.nextPlayer();
            return new TurnPhase();
        }
        
        const currentRate = gameState.getCurrentInfectionRate();
        
        // Clear previous normal infection results (but preserve epidemic results)
        
        // Draw infection cards based on current rate
        for (let i = 0; i < currentRate; i++) {
            const card = gameState.infectionDeck.draw();
            if (card && card.city) {
                const cubesBefore = card.city.getInfectionCount(card.city.color);
                const outbreaksBefore = gameState.getOutbreakCount();
                
                // Check if infection would be prevented (e.g., by Medic + cured disease)
                const infectionPrevented = gameState.hasCure(card.city.color) && 
                    card.city.checkMedicPrevention(card.city.color, gameState);
                
                const success = gameState.board.infect(card.city, 1, gameState);
                const cubesAfter = card.city.getInfectionCount(card.city.color);
                const outbreaksAfter = gameState.getOutbreakCount();
                
                const actualCubesAdded = cubesAfter - cubesBefore;
                const outbreakOccurred = outbreaksAfter > outbreaksBefore;
                
                let displayCubes = actualCubesAdded;
                if (infectionPrevented) {
                    displayCubes = 0;
                }
                
                gameState.lastInfectionResults.push({
                    cityName: card.city.name,
                    color: card.city.color,
                    cubesAdded: displayCubes,
                    totalCubes: cubesAfter,
                    outbreak: outbreakOccurred,
                    prevented: infectionPrevented
                });
                
                console.log(`🦠 Infection result: ${card.city.name} - Before: ${cubesBefore}, After: ${cubesAfter}, Added: ${displayCubes}, Outbreak: ${outbreakOccurred}, Prevented: ${infectionPrevented}`);
            }
        }
        
        // Check lose conditions after infection
        if (gameState.checkLoseCondition()) {
            gameState.gameOver = true;
            return this;
        }
        
        // Move to next player AFTER infection phase
        gameState.nextPlayer();
        return new TurnPhase();
    }
} 