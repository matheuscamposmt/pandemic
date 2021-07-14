class PlayerDeck {
    constructor(cities, numberOfEpidemyCards, actionCards) {
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
}
