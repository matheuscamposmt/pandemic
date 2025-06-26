// BOARD - Manages the game board, cities, and decks
class Board {
    constructor() {
        this.cities = [];
        this.playerDeck = null;
        this.discardDeck = null;
        this.infectionDeck = null;
        this.infectionDiscardDeck = null;
        this.gameState = null; // Reference to GameState as per UML diagram
    }
    
    setupBoard(gameState) {
        this.gameState = gameState; // Store reference to GameState
        
        // Initialize cities - always use simplified map for this mini version
        this.cities = createSimplifiedMap();
        
        // Setup Atlanta as starting research station
        const atlanta = this.findCityByName("Atlanta");
        if (atlanta) {
            atlanta.hasResearchStation = true;
        }
        
        // Setup decks
        this.setupDecks();
        
        // Setup initial infections
        this.setupInitialInfections();
        
        console.log(`Board setup complete with ${this.cities.length} cities`);
    }
    
    setupDecks() {
        // Create player deck with city cards AND Event Cards (following official rules)
        const cityCards = this.cities.map(city => new CityCard(city.name, city.color, city));
        this.playerDeck = new PlayerDeck(cityCards);
        
        // Add Event Cards BEFORE initial distribution (official rules)
        this.playerDeck.addEventCards();
        
        // Initialize discard deck for player cards
        this.discardDeck = new DiscardDeck();
        
        // Create infection deck with city cards (for infection purposes)
        const infectionCards = this.cities.map(city => new CityCard(city.name, city.color, city));
        this.infectionDeck = new InfectionDeck(infectionCards);
        
        // Initialize infection discard deck
        this.infectionDiscardDeck = new InfectionDiscardDeck();
        
        console.log(`Decks created: ${cityCards.length} city cards + 3 event cards, ${infectionCards.length} infection cards`);
    }
    
    
    getEpidemicCountForDifficulty() {
        const difficulty = this.gameState?.difficulty || 'Normal';
        switch(difficulty.toLowerCase()) {
            case 'introductory': return 4;
            case 'normal': return 5;
            case 'heroic': return 6;
            default: return 5;
        }
    }
    
    setupInitialInfections() {
        const infectionLevels = [2, 2, 1, 1];
        
        console.log("🦠 Setting up initial infections (simplified map)...");
        
        for (let i = 0; i < infectionLevels.length; i++) {
            const level = infectionLevels[i];
            const card = this.infectionDeck.draw();
            if (card && card.city) {
                console.log(`🦠 Initial infection: ${card.city.name} gets ${level} ${card.city.color} cubes`);
                // For initial setup, directly add cubes without triggering outbreaks
                this.addInitialInfection(card.city, card.city.color, level);
            }
        }
        
        console.log("✅ Initial infections placed (4 cities infected, 4 cities clean)");
    }
    
    addInitialInfection(city, color, cubes) {
        // Add infection cubes directly during initial setup (no outbreaks)
        city.infections.set(color, Math.min(3, cubes));
        this.gameState.decrementCubes(color, Math.min(3, cubes));
        console.log(`  → ${city.name}: ${Math.min(3, cubes)} ${color} cubes`);
    }
    
    findCityByName(name) {
        return this.cities.find(city => city.name === name);
    }
    
    infect(city, cubes = 1, gameState) {
        if (!city) {
            console.log("⚠️ Cannot infect: city is null");
            return false;
        }
        
        // Find city object if we got a string
        if (typeof city === 'string') {
            city = this.findCityByName(city);
            if (!city) {
                console.log(`⚠️ Cannot find city: ${city}`);
                return false;
            }
        }
        
        // Check if disease is eradicated
        if (gameState && gameState.isEradicated(city.color)) {
            console.log(`✅ ${city.color} disease is eradicated, no infection in ${city.name}`);
            return true;
        }
        
        // Check if we have enough cubes
        if (gameState && !gameState.hasCubesAvailable(city.color, cubes)) {
            console.log(`⚠️ Not enough ${city.color} cubes available!`);
            gameState.gameOver = true;
            return false;
        }
        
        // Add infection to city (this handles outbreak logic internally)
        const success = city.addInfection(cubes, gameState);
        
        if (success && gameState) {
            // Remove cubes from supply only if no outbreak occurred
            gameState.decrementCubes(city.color, cubes);
        } else if (!success && gameState) {
            // Outbreak occurred, still need to remove cubes that were actually placed
            const actualCubes = Math.min(cubes, 3 - (city.getInfectionCount(city.color) - cubes));
            if (actualCubes > 0) {
                gameState.decrementCubes(city.color, actualCubes);
            }
        }
        
        return success;
    }
    
    outbreak(city, gameState, visited = new Set()) {
        if (visited.has(city.name)) {
            return; // Prevent infinite loops
        }
        
        visited.add(city.name);
        console.log(`💥 Outbreak in ${city.name}!`);
        
        // Increment outbreak counter
        if (gameState) {
            const canContinue = gameState.incrementOutbreaks();
            if (!canContinue) {
                console.log("🚨 Game Over: Too many outbreaks!");
                return; // Game over due to too many outbreaks
            }
        }
        
        // Spread to neighboring cities (but don't trigger chain outbreaks here)
        if (city.neighbors) {
            for (let neighbor of city.neighbors) {
                if (!visited.has(neighbor.name)) {
                    // Only add 1 cube, let the city handle its own outbreak if needed
                    this.addInfectionCube(neighbor, neighbor.color, 1, gameState, visited);
                }
            }
        }
    }
    
    // Helper method to add infection cubes without triggering recursive outbreaks
    addInfectionCube(city, color, cubes, gameState, visited = new Set()) {
        const currentInfections = city.getInfectionCount(color);
        
        // Check if we have enough cubes in supply
        if (gameState && !gameState.hasCubesAvailable(color, cubes)) {
            console.log(`⚠️ Not enough ${color} cubes available!`);
            gameState.gameOver = true;
            return false;
        }
        
        // Add cubes to city
        const newCount = Math.min(3, currentInfections + cubes);
        city.infections.set(color, newCount);
        
        // Remove cubes from supply
        if (gameState) {
            gameState.decrementCubes(color, cubes);
        }
        
        console.log(`Added ${cubes} ${color} cube(s) to ${city.name} (now ${newCount})`);
        
        // Check if this causes a new outbreak
        if (newCount >= 3 && currentInfections < 3 && !visited.has(city.name)) {
            this.outbreak(city, gameState, visited);
            return false; // Indicates outbreak occurred
        }
        
        return true;
    }
    
    getAllCities() {
        return [...this.cities];
    }
    
    getCitiesByColor(color) {
        return this.cities.filter(city => city.color === color);
    }
    
    getInfectedCities() {
        return this.cities.filter(city => {
            const totalInfections = Array.from(city.infections.values()).reduce((sum, count) => sum + count, 0);
            return totalInfections > 0;
        });
    }
    
    getCitiesWithResearchStations() {
        return this.cities.filter(city => city.hasResearchStation);
    }
} 