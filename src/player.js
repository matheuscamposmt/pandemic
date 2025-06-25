class Player {
    constructor(name, location, role) {
        this.name = name;
        this.location = location;
        this.role = role; // Strategy pattern - role defines special abilities
        this.hand = []; // Array of cards (0-7 limit)
    }
    
    // UML Diagram methods
    addCard(card) {
        if (this.hand.length >= 7) {
            console.log(`${this.name} hand is full, must discard`);
            return false;
        }
        this.hand.push(card);
        console.log(`${this.name} drew ${card.name}`);
        return true;
    }
    
    discard(cardName) {
        const cardIndex = this.hand.findIndex(card => card.name === cardName);
        if (cardIndex !== -1) {
            const discarded = this.hand.splice(cardIndex, 1)[0];
            console.log(`${this.name} discarded ${cardName}`);
            return discarded;
        }
        return null;
    }
    
    resetAction() {
        // Delegate to GameState - this method is kept for UML compliance
        console.log("Player resetAction() called - actions managed by GameState");
    }
    
    consumeAction() {
        // Delegate to GameState - this method is kept for UML compliance
        console.log("Player consumeAction() called - actions managed by GameState");
        return false; // Should use GameState.useAction() instead
    }
    
    hasActionRemaining() {
        // Delegate to GameState - this method is kept for UML compliance
        console.log("Player hasActionRemaining() called - actions managed by GameState");
        return false; // Should check GameState.actionsRemaining instead
    }
    
    moveTo(city, gameState) {
        console.log("Player moveTo() called");
        // Use role's move strategy
        if (gameState.useAction()) {
            const success = this.role.move(this, city, gameState);
            if (!success) {
                // Return action if move failed
                gameState.actionsRemaining++;
            }
            return success;
        }
        return false;
    }
    
    getLocation() {
        return this.location;
    }
    
    // Legacy method for compatibility (delegates to addCard)
    draw(card) {
        return this.addCard(card);
    }
    
    hasCard(cardName) {
        return this.hand.some(card => card.name === cardName);
    }
    
    treatDisease(gameState, board) {
        // Use role's treat strategy
        if (gameState.useAction()) {
            const success = this.role.treat(this, gameState, board);
            if (!success) {
                // Return action if treatment failed
                gameState.actionsRemaining++;
            }
            return success;
        }
        return false;
    }
    
    canDiscoverCure(gameState) {
        // Use role's cure strategy
        return this.role.canDiscoverCure(this, gameState);
    }
    
    hasEnoughCardsForCure(color) {
        const cardsOfColor = this.hand.filter(card => 
            card instanceof CityCard && card.color === color
        );
        return cardsOfColor.length >= this.role.getCureRequirement();
    }
    
    useCureCards(color) {
        const cardsOfColor = this.hand.filter(card => 
            card instanceof CityCard && card.color === color
        );
        const cardsToRemove = cardsOfColor.slice(0, this.role.getCureRequirement());
        
        cardsToRemove.forEach(card => {
            const index = this.hand.indexOf(card);
            if (index > -1) {
                this.hand.splice(index, 1);
            }
        });
        
        return cardsToRemove;
    }
    
    shareKnowledge(otherPlayer, cardName) {
        if (this.location !== otherPlayer.location) {
            console.log("Players must be in the same city to share knowledge");
            return false;
        }
        
        const card = this.discard(cardName);
        if (card && otherPlayer.addCard(card)) {
            console.log(`${this.name} gave ${cardName} to ${otherPlayer.name}`);
            return true;
        }
        
        if (card) {
            this.hand.push(card); // Return card if transfer failed
        }
        return false;
    }
}
