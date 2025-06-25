
class Deck {
    constructor(cards = []) {
        this.cards = [...cards];
        this.shuffle();
    }
    
    draw() {
        if (this.cards.length > 0) {
            return this.cards.pop();
        }
        return null;
    }
    
    shuffle() {
        for (let i = this.cards.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            [this.cards[i], this.cards[j]] = [this.cards[j], this.cards[i]];
        }
    }
    
    addToBottom(card) {
        this.cards.unshift(card);
    }
    
    isEmpty() {
        return this.cards.length === 0;
    }
    
    size() {
        return this.cards.length;
    }
}

class PlayerDeck extends Deck {
    constructor(cards = []) {
        super(cards);
    }
    
    addEpidemicCards(numberOfEpidemicCards) {
        // Split deck into equal piles and add epidemic cards
        const pileSize = Math.floor(this.cards.length / numberOfEpidemicCards);
        const newDeck = [];
        
        for (let i = 0; i < numberOfEpidemicCards; i++) {
            const startIndex = i * pileSize;
            const endIndex = (i === numberOfEpidemicCards - 1) ? this.cards.length : (i + 1) * pileSize;
            
            // Get pile
            const pile = this.cards.slice(startIndex, endIndex);
            
            // Add epidemic card to pile
            pile.push(new EpidemicCard());
            
            // Shuffle pile
            this.shufflePile(pile);
            
            // Add to new deck
            newDeck.push(...pile);
        }
        
        this.cards = newDeck;
        console.log(`Added ${numberOfEpidemicCards} epidemic cards to player deck`);
    }
    
    shufflePile(pile) {
        for (let i = pile.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            [pile[i], pile[j]] = [pile[j], pile[i]];
        }
    }
}

class DiscardDeck extends Deck {
    constructor() {
        super();
    }
    
    add(card) {
        this.cards.push(card);
    }
    
    getTopCard() {
        return this.cards.length > 0 ? this.cards[this.cards.length - 1] : null;
    }
    
    removeCard(cardName) {
        const index = this.cards.findIndex(card => card.name === cardName);
        if (index !== -1) {
            return this.cards.splice(index, 1)[0];
        }
        return null;
    }
}

class InfectionDeck extends Deck {
    constructor(cards = []) {
        super(cards);
        this.discardPile = [];
    }
    
    draw() {
        const card = super.draw();
        if (card) {
            this.discardPile.push(card);
            console.log(`Drew infection card: ${card.name}`);
        }
        return card;
    }
    
    drawBottom() {
        if (this.cards.length > 0) {
            const card = this.cards.shift(); // Remove from bottom
            this.discardPile.push(card);
            console.log(`Drew bottom infection card: ${card.name}`);
            return card;
        }
        return null;
    }
    
    intensify() {
        // Shuffle discard pile and place on top of deck
        this.shuffle(this.discardPile);
        this.cards.push(...this.discardPile);
        this.discardPile = [];
        console.log("Infection deck intensified - discard pile shuffled on top");
    }
    
    shuffle(array = null) {
        const target = array || this.cards;
        for (let i = target.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            [target[i], target[j]] = [target[j], target[i]];
        }
    }
}

class InfectionDiscardDeck extends Deck {
    constructor() {
        super();
    }
    
    add(card) {
        this.cards.push(card);
    }
    
    clear() {
        const cleared = [...this.cards];
        this.cards = [];
        return cleared;
    }
    
    peek() {
        return this.cards.length > 0 ? this.cards[this.cards.length - 1] : null;
    }
} 