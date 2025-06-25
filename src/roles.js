// STRATEGY PATTERN - Role classes define different player abilities
class Role {
    constructor() {
        if (this.constructor === Role) {
            throw new Error("Role is a base class and cannot be instantiated directly");
        }
    }
    
    move(player, targetCity, gameState) {
        // Default movement logic
        if (this.canMoveToCity(player, targetCity)) {
            player.location = targetCity;
            console.log(`${player.name} moved to ${targetCity.name}`);
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
    
    useAbility() {
        // To be overridden by specific roles
        console.log("Using default ability");
    }
}

class Scientist extends Role {
    getCureRequirement() {
        return 4; // Scientist only needs 4 cards
    }
    
    getColor() {
        return "white";
    }
    
    useAbility() {
        console.log("Scientist: Need only 4 cards to discover cure");
    }
}

class Medic extends Role {
    treat(player, gameState, board) {
        if (player.location.hasInfection()) {
            // Medic removes all cubes of one color
            for (let color of ['Blue', 'Yellow', 'Black', 'Red']) {
                if (player.location.hasInfection(color)) {
                    const count = player.location.getInfectionCount(color);
                    const removed = player.location.removeInfection(color, count);
                    if (removed > 0) {
                        gameState.incrementCubes(color, removed);
                        console.log(`${player.name} (Medic) treated all ${color} disease in ${player.location.name}`);
                        
                        // Auto-prevent cured diseases
                        if (gameState.curedDiseases.has(color)) {
                            console.log(`Medic prevents future ${color} infections`);
                        }
                        return true;
                    }
                }
            }
        }
        return false;
    }
    
    getColor() {
        return "orange";
    }
    
    useAbility() {
        console.log("Medic: Remove all cubes of one color when treating, prevent placing cured disease cubes");
    }
}

class Researcher extends Role {
    shareKnowledge(player, otherPlayer, cardName) {
        // Researcher can give any card (not just matching city)
        if (player.location === otherPlayer.location) {
            const card = player.discard(cardName);
            if (card && otherPlayer.draw(card)) {
                console.log(`${player.name} (Researcher) gave ${cardName} to ${otherPlayer.name}`);
                return true;
            }
            if (card) player.hand.push(card);
        }
        return false;
    }
    
    getColor() {
        return "brown";
    }
    
    useAbility() {
        console.log("Researcher: Can give any city card to other players in same city");
    }
}

class Dispatcher extends Role {
    move(player, targetCity, gameState) {
        // Dispatcher can move other players
        return this.moveOtherPlayer(gameState, targetCity) || super.move(player, targetCity, gameState);
    }
    
    moveOtherPlayer(gameState, targetCity) {
        // Move any player to any city with another player
        for (let otherPlayer of gameState.players) {
            if (otherPlayer.location === targetCity) {
                console.log(`Dispatcher can move players to ${targetCity.name}`);
                return true;
            }
        }
        return false;
    }
    
    getColor() {
        return "purple";
    }
    
    useAbility() {
        console.log("Dispatcher: Move other players' pawns or move any pawn to a city with another pawn");
    }
}

class OperationsExpert extends Role {
    buildResearchStation(player, city) {
        // Can build without discarding city card
        if (player.location === city) {
            city.hasResearchStation = true;
            console.log(`${player.name} (Operations Expert) built research station in ${city.name} without discarding card`);
            return true;
        }
        return false;
    }
    
    move(player, targetCity, gameState) {
        // Can move from research station to any city by discarding any card
        if (player.location.hasResearchStation && player.hand.length > 0) {
            const anyCard = player.hand[0];
            player.discard(anyCard.name);
            player.location = targetCity;
            console.log(`${player.name} (Operations Expert) flew to ${targetCity.name}`);
            return true;
        }
        return super.move(player, targetCity, gameState);
    }
    
    getColor() {
        return "green";
    }
    
    useAbility() {
        console.log("Operations Expert: Build research station without city card, fly anywhere from research station");
    }
}

class QuarantineSpecialist extends Role {
    preventInfection(city) {
        // Prevents outbreaks and infections in current city and adjacent cities
        return true;
    }
    
    getColor() {
        return "darkgreen";
    }
    
    useAbility() {
        console.log("Quarantine Specialist: Prevent disease cube placement and outbreaks in current and adjacent cities");
    }
}

class ContingencyPlanner extends Role {
    constructor() {
        super();
        this.storedEventCard = null;
    }
    
    storeEventCard(eventCard) {
        if (!this.storedEventCard) {
            this.storedEventCard = eventCard;
            console.log(`${eventCard.name} stored by Contingency Planner`);
            return true;
        }
        return false;
    }
    
    playStoredEvent() {
        if (this.storedEventCard) {
            const card = this.storedEventCard;
            this.storedEventCard = null;
            console.log(`Contingency Planner played stored ${card.name}`);
            return card;
        }
        return null;
    }
    
    getColor() {
        return "cyan";
    }
    
    useAbility() {
        console.log("Contingency Planner: Store one event card and play it later");
    }
} 