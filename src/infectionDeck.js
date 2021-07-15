class InfectionDeck {
    constructor(cities) {
        this.deck = cities.slice() // NB. this keeps the pointers of the underlying objects
        this.shuffle(this.deck)
        this.discardPile = []
    }
    getCard() {
        if (this.deck.length <= 0) {
            throw "Cannot get card from empty deck"
        }
        var card = this.deck.pop()
        this.discardPile.push(card)
        console.log("Infecting " + card.name)
        return card
    }
    getBottomCard() {
        if (this.deck.length <= 0) {
            throw "Cannot get card from empty deck"
        }
        var card = this.deck.shift()
        this.discardPile.push(card)
        console.log("Infecting " + card.name)
        return card
    }
    mixInDiscardPile() {
        this.shuffle(this.discardPile)
        Array.prototype.push.apply(this.deck, this.discardPile);
        this.discardPile = []
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
}
