class City {
    constructor(name, color, x = 0, y = 0) {
        this.name = name;
        this.color = color;
        this.x = x;
        this.y = y;
        this.neighbors = [];
        
        // Disease tracking - Map of color to infection count
        this.infections = new Map([
            ['Blue', 0],
            ['Yellow', 0], 
            ['Black', 0],
            ['Red', 0]
        ]);
        
        this.hasResearchStation = false;
        this.outbreakThisTurn = false;
    }
    
    addInfection(cubes = 1, gameState = null) {
        const currentInfections = this.infections.get(this.color) || 0;
        
        // Check if adding cubes would cause outbreak
        if (currentInfections + cubes > 3) {
            // Set to max (3) and trigger outbreak
            this.infections.set(this.color, 3);
            
            // Only trigger outbreak if we weren't already at 3 cubes
            if (currentInfections < 3 && gameState && gameState.board) {
                console.log(`🦠 ${this.name} overflowing: ${currentInfections} + ${cubes} > 3, triggering outbreak`);
                gameState.board.outbreak(this, gameState);
            }
            
            return false; // Indicates outbreak occurred
        }
        
        // Add cubes normally
        this.infections.set(this.color, currentInfections + cubes);
        console.log(`🦠 Added ${cubes} ${this.color} cube(s) to ${this.name} (now ${currentInfections + cubes})`);
        return true;
    }
    
    removeInfection(color, cubes = 1) {
        const currentInfections = this.infections.get(color) || 0;
        const newCount = Math.max(0, currentInfections - cubes);
        this.infections.set(color, newCount);
        return currentInfections - newCount; // Return actual cubes removed
    }
    
    hasInfection(color = null) {
        if (color) {
            return (this.infections.get(color) || 0) > 0;
        }
        
        // Check if any color has infections
        return Array.from(this.infections.values()).some(count => count > 0);
    }
    
    getInfectionCount(color = null) {
        if (color) {
            return this.infections.get(color) || 0;
        }
        
        // Return total infections across all colors
        return Array.from(this.infections.values()).reduce((sum, count) => sum + count, 0);
    }
    
    getTotalInfections() {
        return Array.from(this.infections.values()).reduce((sum, count) => sum + count, 0);
    }
    
    disinfect(color, gameState) {
        const removed = this.removeInfection(color, 1);
        if (removed > 0 && gameState) {
            // Return cubes to supply
            gameState.incrementCubes(color, removed);
            console.log(`Removed ${removed} ${color} cube(s) from ${this.name}`);
            
            // Check for eradication
            if (gameState.hasCure(color) && this.checkForEradication(color, gameState)) {
                gameState.eradicateDisease(color);
            }
        }
        return removed;
    }
    
    checkForEradication(color, gameState) {
        // Check if no cubes of this color exist on the board
        if (gameState && gameState.board) {
            return gameState.board.cities.every(city => city.getInfectionCount(color) === 0);
        }
        return false;
    }
    
    addNeighbor(city) {
        if (!this.neighbors.includes(city)) {
            this.neighbors.push(city);
        }
    }
    
    isNeighbor(city) {
        return this.neighbors.includes(city);
    }
    
    buildResearchStation() {
        if (!this.hasResearchStation) {
            this.hasResearchStation = true;
            console.log(`Research station built in ${this.name}`);
            return true;
        }
        return false;
    }
    
    removeResearchStation() {
        if (this.hasResearchStation) {
            this.hasResearchStation = false;
            console.log(`Research station removed from ${this.name}`);
            return true;
        }
        return false;
    }
}
