// STRATEGY PATTERN - Role classes define different player abilities
class Role {
    constructor() {
        if (this.constructor === Role) {
            throw new Error("Role is a base class and cannot be instantiated directly");
        }
    }
    
    move(player, targetCity, gameState) {
        // Default movement logic
        if (player.name != gameState.getCurrentPlayer().name) {
            return false;
        }
        if (this.canMoveToCity(player, targetCity) || gameState.airliftEvent) {
            player.location = targetCity;
            console.log(`${player.name} moved to ${targetCity.name}`);
            
            // If airlift was used, deactivate it after movement
            if (gameState.airliftEvent) {
                gameState.deactivateAirlift();
            }
            
            return true;
        }
        return false;
    }
    
    canMoveToCity(player, targetCity) {
        // Basic movement: adjacent cities or with matching card
        return targetCity.neighbors.includes(player.location) || 
               player.hasCard(targetCity.name) ||
               (player.location.hasResearchStation && targetCity.hasResearchStation);
    }
    
    treat(player, gameState, board) {
        // Default treat: remove 1 cube
        if (player.location.hasInfection()) {
            // Find first infected color and remove 1 cube
            for (let color of ['Blue', 'Yellow', 'Black', 'Red']) {
                if (player.location.hasInfection(color)) {
                    const removed = player.location.disinfect(color, gameState);
                    if (removed > 0) {
                        console.log(`${player.name} treated ${color} disease in ${player.location.name}`);
                        return true;
                    }
                }
            }
        }
        return false;
    }
    
    canDiscoverCure(player, gameState) {
        return player.location.hasResearchStation;
    }
    
    getCureRequirement() {
        return 5; // Default: 5 cards needed
    }
    
    getColor() {
        return "gray"; // Default color
    }
    

}

class Scientist extends Role {
    getCureRequirement() {
        return 4; // Scientist only needs 4 cards
    }
    
    getColor() {
        return "white";
    }
    
}

class Medic extends Role {
    treat(player, gameState, board) {
        if (!player.location.hasInfection()) {
            return false;
        }
        
        // Medic removes all cubes of one color at a time
        for (let color of ['Blue', 'Yellow', 'Black', 'Red']) {
            if (player.location.hasInfection(color)) {
                const count = player.location.getInfectionCount(color);
                if (count > 0) {
                    // Remove all cubes of this color
                    const removed = player.location.removeInfection(color, count);
                    if (removed > 0) {
                        gameState.incrementCubes(color, removed);
                        console.log(`${player.name} (Medic) treated all ${removed} ${color} cubes in ${player.location.name}`);
                        return true;
                    }
                }
            }
        }
        return false;
    }
    
    // Medic automatically treats cured diseases when entering a city
    move(player, targetCity, gameState) {
        const success = super.move(player, targetCity, gameState);
        if (success) {
            this.autoTreatCuredDiseases(player, gameState);
        }
        return success;
    }
    
    autoTreatCuredDiseases(player, gameState) {
        // Automatically treat all cubes of cured diseases in current location
        for (let color of ['Blue', 'Yellow', 'Black', 'Red']) {
            if (gameState.hasCure(color) && player.location.hasInfection(color)) {
                const count = player.location.getInfectionCount(color);
                if (count > 0) {
                    const removed = player.location.removeInfection(color, count);
                    gameState.incrementCubes(color, removed);
                    console.log(`🏥 Medic auto-treated ${removed} ${color} cubes (disease cured)`);
                }
            }
        }
    }
    
    // Prevent placement of cured disease cubes in Medic's location and adjacent cities
    preventsInfection(city, color, gameState) {
        if (gameState.hasCure(color)) {
            // Check if medic is in this city or adjacent
            const medic = gameState.players.find(p => p.role instanceof Medic);
            if (medic && (medic.location === city || 
                         (city.neighbors && city.neighbors.includes(medic.location)))) {
                console.log(`🛡️ Medic prevents ${color} infection in ${city.name}`);
                return true;
            }
        }
        return false;
    }
    
    getColor() {
        return "orange";
    }
    
}

class Researcher extends Role {
    shareKnowledge(player, otherPlayer, cardName, gameState) {
        // Researcher can give any city card (not just matching city)
        if (player.location !== otherPlayer.location) {
            console.log("Players must be in the same city to share knowledge");
            return false;
        }
        
        const card = player.hand.find(c => c.name === cardName);
        if (!card) {
            console.log(`${player.name} doesn't have card ${cardName}`);
            return false;
        }
        
        // Researcher can only give city cards, not event cards or epidemic cards
        if (card.type !== 'CityCard') {
            console.log("Researcher can only share city cards");
            return false;
        }
        
        const discardedCard = player.discard(cardName);
        if (discardedCard && otherPlayer.addCard(discardedCard)) {
            console.log(`${player.name} (Researcher) gave ${cardName} to ${otherPlayer.name}`);
            return true;
        }
        
        if (discardedCard) {
            player.hand.push(discardedCard); // Return card if transfer failed
        }
        return false;
    }
    
    getColor() {
        return "brown";
    }
    
}

class Dispatcher extends Role {
    move(player, targetCity, gameState) {
        return this.moveAnyPawn(player,gameState, targetCity)
    }
    
    moveAnyPawn(player, gameState, targetCity) {
        // Move any player to any city with another player
        if (this.canMoveToCity(player, targetCity) || gameState.airliftEvent) {
            player.location = targetCity;
            console.log(`${player.name} moved to ${targetCity.name}`);
            
            // If airlift was used, deactivate it after movement
            if (gameState.airliftEvent) {
                gameState.deactivateAirlift();
            }
            
            return true;
        }
        return false;
    }
    
    getColor() {
        return "purple";
    }
    
}