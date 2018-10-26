function InfectionDeck(cities) {
    this.deck = cities.slice(); // NB. this keeps the pointers of the underlying objects
    this.shuffle(this.deck);
    this.indexOfTopCard = this.deck.length - 1;
}

InfectionDeck.prototype.getCard = function() {
    var card = this.deck[this.indexOfTopCard];
    this.indexOfTopCard--;
    return card;
}

InfectionDeck.prototype.shuffle = function(deck) {
    var randomIndex, x, i;
    for (i = deck.length; 0 < i; i--) {
        randomIndex = Math.floor(Math.random() * i);
        x = deck[i - 1];
        deck[i - 1] = deck[randomIndex];
        deck[randomIndex] = x;
    }
}
