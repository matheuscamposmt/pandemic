// CARD HIERARCHY - Following UML diagram structure
class Card {
    constructor(name, type) {
        this.name = name;
        this.type = type;
    }
}

class CityCard extends Card {
    constructor(name, color, city) {
        super(name, "CityCard");
        this.color = color;
        this.city = city; // Reference to the actual city
    }
}

class EpidemicCard extends Card {
    constructor() {
        super("Epidemic", "EpidemicCard");
        this.description = "Increase infection rate, infect bottom card, intensify";
    }
    
    spreadEpidemic(gameState, board) {
        this.increase(gameState);
        this.infect(board);
        this.intensify(board);
    }
    
    increase(gameState) {
        gameState.increaseInfectionRate();
        console.log(`Infection rate increased to ${gameState.getCurrentInfectionRate()}`);
    }
    
    infect(board) {
        const bottomCard = board.infectionDeck.drawBottom();
        if (bottomCard && bottomCard.city) {
            board.infect(bottomCard.city, 3);
            console.log(`Epidemic infection: 3 cubes placed in ${bottomCard.city.name}`);
        }
    }
    
    intensify(board) {
        board.infectionDeck.intensify();
        console.log("Infection discard pile shuffled and placed on top of deck");
    }
}

class EventCard extends Card {
    constructor(name, description) {
        super(name, "EventCard");
        this.description = description;
    }
    
    useEvent(gameState, board, targetCity = null, targetPlayer = null) {
        console.log(`Using event: ${this.name} - ${this.description}`);
        
        switch (this.name) {
            case "Airlift":
                return this.airlift(targetPlayer, targetCity);
            case "One Quiet Night":
                return this.oneQuietNight(gameState);
            case "Resilient Population":
                return this.resilientPopulation(board);
            case "Government Grant":
                return this.governmentGrant(targetCity);
            case "Forecast":
                return this.forecast(board);
            default:
                console.log("Unknown event card");
                return false;
        }
    }
    
    airlift(player, city) {
        if (player && city) {
            player.location = city;
            console.log(`${player.name} airlifted to ${city.name}`);
            return true;
        }
        return false;
    }
    
    oneQuietNight(gameState) {
        gameState.skipNextInfection = true;
        console.log("Next infection phase will be skipped");
        return true;
    }
    
    resilientPopulation(board) {
        if (board.infectionDiscardDeck.cards.length > 0) {
            const removedCard = board.infectionDiscardDeck.cards.pop();
            console.log(`${removedCard.name} removed from infection discard pile`);
            return true;
        }
        return false;
    }
    
    governmentGrant(city) {
        if (city) {
            city.hasResearchStation = true;
            console.log(`Research station built in ${city.name} via Government Grant`);
            return true;
        }
        return false;
    }
    
    forecast(board) {
        const topCards = [];
        for (let i = 0; i < 6 && board.infectionDeck.cards.length > 0; i++) {
            topCards.push(board.infectionDeck.cards.pop());
        }
        
        // In a real implementation, player would rearrange these
        // For now, just shuffle and put back
        this.shuffleArray(topCards);
        topCards.forEach(card => board.infectionDeck.cards.push(card));
        
        console.log("Forecasted and rearranged top 6 infection cards");
        return true;
    }
    
    shuffleArray(array) {
        for (let i = array.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            [array[i], array[j]] = [array[j], array[i]];
        }
    }
} 