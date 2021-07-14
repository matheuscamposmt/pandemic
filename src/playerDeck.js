class PlayerDeck {
    constructor(cities, actionCards) {
        this.deck = cities.slice() // NB. this keeps the pointers of the underlying objects
        this.shuffle(this.deck)
    }
    getCard() {
        if (this.deck.length <= 0) {
            throw "Cannot get card from empty deck"
        }
        var card = this.deck.pop()
        console.log("Draw " + card.name)
        return card
    }
    shuffle(deck) {
        var randomIndex, x, i
        for (i = deck.length; 0 < i; i--) {
            randomIndex = Math.floor(Math.random() * i)
            x = deck[i - 1]
            deck[i - 1] = deck[randomIndex]
            deck[randomIndex] = x
        }
    }
    addEpidemicCards(numberOfEpidemicCards) {
        this.shuffle(this.deck)
        const numberOfCardsForEpidemic = this.deck.length / numberOfEpidemicCards
        var numberOfCards = 0
        const newDeck = []
        while (numberOfCards < this.deck.length) {
            const intermediateDeck = this.deck.slice(numberOfCards, numberOfCards + numberOfCardsForEpidemic)
            intermediateDeck.push(new EpidemicCard())
            this.shuffle(intermediateDeck)
            Array.prototype.push.apply(newDeck, intermediateDeck);
            numberOfCards += numberOfCardsForEpidemic
        }
        this.deck = newDeck
    }
}
