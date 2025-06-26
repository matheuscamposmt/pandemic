// PADRAO STATE
class GameState {
    constructor(numberOfPlayers, difficulty) {
        // Basic game state
        this.numberOfPlayers = numberOfPlayers;
        this.difficulty = difficulty;
        this.currentPlayerIndex = 0;
        this.actionsRemaining = 4;
        this.currentPhase = new TurnPhase();
        this.gameOver = false;
        this.gameWon = false;
        
        this.board = new Board();
        this.playerDeck = null;
        this.infectionDeck = null;
        
        this.players = [];
        this.initializePlayers();
        
        this.outbreakCount = 0;
        this.maxOutbreaks = 8;
        
        this.infectionCubes = new Map([
            ['Blue', 24],
            ['Yellow', 24], 
            ['Black', 24],
            ['Red', 24]
        ]);
        
        this.infectionRates = [2, 2, 2, 2, 3, 3, 4]; // Taxa de infecção ajustada para mapa simplificado
        this.infectionRateIndex = 0;
        this.infectionRate = this.infectionRates[this.infectionRateIndex];
        
        this.curedDiseases = new Set();
        this.eradicatedDiseases = new Set();
        
        this.researchStationCount = 1; // Atlanta começa com uma
        
        // Track infection results for UI display
        this.lastInfectionResults = [];
        
        // Event Card effects
        this.skipNextInfection = false;
        this.airliftEvent = false;
    }
    
    initializePlayers() {
        const roles = [Scientist, Medic, Researcher, Dispatcher];
        
        for (let i = 0; i < this.numberOfPlayers; i++) {
            const roleClass = roles[i % roles.length];
            const role = new roleClass();
            const player = new Player(`Player ${i + 1}`, null, role);
            this.players.push(player);
        }
    }
    
    setupInitialState() {
        this.board.setupBoard(this);
        this.playerDeck = this.board.playerDeck;
        this.infectionDeck = this.board.infectionDeck;
        
        // Todos os jogadores começam em Atlanta
        const atlanta = this.board.findCityByName("Atlanta");
        this.players.forEach(player => {
            player.location = atlanta;
        });
        
        // Distribui as cartas iniciais com base no número de jogadores
        const cardsPerPlayer = this.getInitialCardCount();
        this.dealInitialCards(cardsPerPlayer);
        
        // Adiciona Epidemic Cards ao deck restante após distribuição inicial
        const epidemicCount = this.board.getEpidemicCountForDifficulty();
        this.playerDeck.addEpidemicCards(epidemicCount);
        
        // Força verificação do limite de mão após distribuição inicial
        this.players.forEach(player => {
            this.enforceHandLimit(player);
        });
    }
    
    getInitialCardCount() {
        switch(this.numberOfPlayers) {
            case 2: return 4;
            case 3: return 3; 
            case 4: return 2;
            default: return 2;
        }
    }
    
    dealInitialCards(cardsPerPlayer) {
        for (let player of this.players) {
            for (let i = 0; i < cardsPerPlayer; i++) {
                const card = this.playerDeck.draw();
                if (card) {
                    // Se for uma carta epidemic durante o setup inicial, reembaralha
                    if (card instanceof EpidemicCard) {
                        this.playerDeck.addToBottom(card);
                        this.playerDeck.shuffle();
                        i--; // Retry drawing
                        continue;
                    }
                    player.addCard(card);
                }
            }
        }
    }
    
    startGame() {
        this.currentPhase = new TurnPhase();
        
        // Reset counters to ensure clean start
        this.outbreakCount = 0;
        this.skipNextInfection = false;
        this.gameOver = false;
        this.gameWon = false;
    }
    
    getCurrentPlayer() {
        return this.players[this.currentPlayerIndex];
    }
    
    getActions() {
        return this.actionsRemaining;
    }
    
    resetActions() {
        this.actionsRemaining = 4;
    }
    
    useAction() {
        if (this.actionsRemaining > 0) {
            this.actionsRemaining--;
            return true;
        }
        return false;
    }
    
    incrementOutbreaks() {
        this.outbreakCount++;
        
        if (this.outbreakCount >= this.maxOutbreaks) {
            this.gameOver = true;
            return false;
        }
        return true;
    }
    
    getOutbreakCount() {
        return this.outbreakCount;
    }
    
    resetOutbreaks() {
        this.outbreakCount = 0;
    }
    
    decrementCubes(color, amount = 1) {
        const current = this.infectionCubes.get(color) || 0;
        this.infectionCubes.set(color, Math.max(0, current - amount));
        return this.infectionCubes.get(color);
    }
    
    incrementCubes(color, amount = 1) {
        const current = this.infectionCubes.get(color) || 0;
        this.infectionCubes.set(color, current + amount);
        return this.infectionCubes.get(color);
    }
    
    getCubeCount(color) {
        return this.infectionCubes.get(color) || 0;
    }
    
    hasCubesAvailable(color, amount = 1) {
        return this.getCubeCount(color) >= amount;
    }
    
    isCubeColorEmpty(color) {
        return this.getCubeCount(color) === 0;
    }
    
    getAllCubeCounts() {
        return new Map(this.infectionCubes);
    }
    
    resetCubes() {
        this.infectionCubes.set('Blue', 24);
        this.infectionCubes.set('Yellow', 24);
        this.infectionCubes.set('Black', 24);
        this.infectionCubes.set('Red', 24);
    }
    
    getCurrentInfectionRate() {
        return this.infectionRates[this.infectionRateIndex];
    }
    
    increaseInfectionRate() {
        if (this.infectionRateIndex < this.infectionRates.length - 1) {
            this.infectionRateIndex++;
            this.infectionRate = this.infectionRates[this.infectionRateIndex];
            return true;
        }
        return false; // Cannot increase further
    }
    
    resetInfectionRate() {
        this.infectionRateIndex = 0;
        this.infectionRate = this.infectionRates[this.infectionRateIndex];
    }
    
    getInfectionRateIndex() {
        return this.infectionRateIndex;
    }
    
    // === CURE METHODS (from CureHandler) ===
    addCure(color) {
        this.curedDiseases.add(color);
        
        if (this.checkWinCondition()) {
            this.gameWon = true;
        }
    }
    
    hasCure(color) {
        return this.curedDiseases.has(color);
    }
    
    eradicateDisease(color) {
        if (this.hasCure(color)) {
            this.eradicatedDiseases.add(color);
            return true;
        }
        return false;
    }
    
    isEradicated(color) {
        return this.eradicatedDiseases.has(color);
    }
    
    getAllCures() {
        return Array.from(this.curedDiseases);
    }
    
    getDiseaseCubeCounts() {
        // Return remaining disease cubes for each color
        return {
            'Blue': this.diseaseCubes.Blue || 24,
            'Yellow': this.diseaseCubes.Yellow || 24,
            'Black': this.diseaseCubes.Black || 24,
            'Red': this.diseaseCubes.Red || 24
        };
    }
    
    getLastInfectionResults() {
        return this.lastInfectionResults || [];
    }

    getAllEradications() {
        return Array.from(this.eradicatedDiseases);
    }
    
    areAllDiseasesCured() {
        const diseaseColors = ['Blue', 'Yellow', 'Black', 'Red'];
        return diseaseColors.every(color => this.hasCure(color));
    }
    
    resetCures() {
        this.curedDiseases.clear();
        this.eradicatedDiseases.clear();
    }
    
    // === GAME FLOW METHODS ===
    drawInfectionCards(n) {
        // Clear previous infection results
        this.lastInfectionResults = [];
        
        for (let i = 0; i < n; i++) {
            const card = this.infectionDeck.draw();
            if (card && card.city) {
                const city = this.board.findCityByName(card.city);
                if (city) {
                    const previousCount = city.getInfectionCount(city.color);
                    const previousOutbreakCount = this.outbreakCount;
                    
                    const infectionSuccess = this.board.infect(card.city, 1, this);
                    
                    const newCount = city.getInfectionCount(city.color);
                    const cubesAdded = newCount - previousCount;
                    const outbreakOccurred = this.outbreakCount > previousOutbreakCount || !infectionSuccess;
                    
                    // Store infection result for UI display
                    const infectionResult = {
                        cityName: city.name,
                        color: city.color,
                        cubesAdded: Math.max(0, cubesAdded),
                        totalCubes: newCount,
                        outbreak: outbreakOccurred,
                        epidemic: false
                    };
                    
                    this.lastInfectionResults.push(infectionResult);
                }
            }
        }
    }
    
    drawPlayerCards(n) {
        // Armazena as cartas sacadas nesta draw phase
        this.lastDrawnPlayerCards = [];
        const currentPlayer = this.getCurrentPlayer();
        for (let i = 0; i < n; i++) {
            const card = this.playerDeck.draw();
            if (card) {
                this.lastDrawnPlayerCards.push(card); // Registra toda carta sacada
                if (card instanceof EpidemicCard) {
                    this.handleEpidemic();
                } else {
                    currentPlayer.addCard(card);
                }
            }
            else {
                this.gameOver = true;
                return this;
            }
        }
    }
    
    handleEpidemic() {
        console.log("💥 EPIDEMIC EVENT TRIGGERED!");
        
        this.increaseInfectionRate();
        
        // Infect bottom card
        const bottomCard = this.infectionDeck.drawBottom();
        if (bottomCard && bottomCard.city) {
            const cubesBefore = bottomCard.city.getInfectionCount(bottomCard.city.color);
            const outbreaksBefore = this.outbreakCount;
            
            // Infect with 2 cubes
            const success = this.board.infect(bottomCard.city, 2, this);
            
            const cubesAfter = bottomCard.city.getInfectionCount(bottomCard.city.color);
            const outbreaksAfter = this.outbreakCount;
            
            // Store epidemic result
            const epidemicResult = {
                cityName: bottomCard.city.name,
                color: bottomCard.city.color,
                cubesAdded: 2,
                totalCubes: cubesAfter,
                outbreak: outbreaksAfter > outbreaksBefore,
                epidemic: true // Flag to indicate this came from epidemic
            };
            
            this.lastInfectionResults.push(epidemicResult);
            
            console.log(`🦠 Epidemic infection: ${bottomCard.city.name} gets ${epidemicResult.cubesAdded} cubes (total: ${epidemicResult.totalCubes}), outbreak: ${epidemicResult.outbreak}`);
        }
        
        // Intensify - reshuffle discard pile on top
        this.infectionDeck.intensify();
    }
    
    nextPhase() {
        // Execute phases automatically until we reach a stable state
        let phasesExecuted = 0;
        const maxPhases = 10; // Safety limit
        
        while (phasesExecuted < maxPhases) {
            const currentPhaseName = this.currentPhase.constructor.name;
            const oldPhase = this.currentPhase;
            
            // Execute current phase
            this.currentPhase = this.currentPhase.execute(this);
            const newPhaseName = this.currentPhase.constructor.name;
            
            phasesExecuted++;
            
            // Stop if phase didn't change (stable state reached)
            if (oldPhase === this.currentPhase) {
                break;
            }
            
            // Stop if we're in TurnPhase and it's a new player's turn
            if (this.currentPhase.constructor.name === 'TurnPhase' && phasesExecuted > 1) {
                break;
            }
            
            // Check for game over conditions
            if (this.gameOver || this.gameWon) {
                break;
            }
        }
        
    }
    
    nextPlayer() {
        this.currentPlayerIndex = (this.currentPlayerIndex + 1) % this.numberOfPlayers;
        this.resetActions();
    }
    
    checkWinCondition() {
        return this.curedDiseases.size === 4;
    }
    
    checkLoseCondition() {
        if (this.outbreakCount >= this.maxOutbreaks) {
            this.gameOver = true;
            return true;
        }
        
        // Condição 2: Baralho de jogadores esgotado
        if (this.playerDeck && this.playerDeck.isEmpty()) {
            this.gameOver = true;
            return true;
        }
        
        // Condição 3: Não há cubos suficientes de alguma cor
        for (let [color, count] of this.infectionCubes.entries()) {
            if (count < 0) {
                this.gameOver = true;
                return true;
            }
        }
        
        return false;
    }
    
    addEradication(color) {
        this.eradicatedDiseases.add(color);
    }
    
    enforceHandLimit(player) {
        while (player.hand.length > 7) {
            const discarded = player.hand.pop();
        }
    }
    
    // Airlift Event methods
    activateAirlift() {
        this.airliftEvent = true;
        console.log("Airlift activated - can move to any city");
    }
    
    deactivateAirlift() {
        this.airliftEvent = false;
        console.log("Airlift deactivated");
    }
    
    isAirliftActive() {
        return this.airliftEvent;
    }
    
    // Clear all infection results at the start of a turn
    clearInfectionResults() {
        this.lastInfectionResults = [];
        this.lastDrawnPlayerCards = [];
    }
    
    getLastDrawnPlayerCards() {
        return this.lastDrawnPlayerCards || [];
    }
} 
