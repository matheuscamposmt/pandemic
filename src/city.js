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
        const currentTotal = this.getInfectionCount(this.color);
        
        // Check if Medic prevents this infection (for cured diseases)
        if (gameState && this.checkMedicPrevention(this.color, gameState)) {
            return true; // Infection prevented
        }
        
        if (currentTotal + cubes > 3) {
            // This would cause an outbreak
            const actualCubes = 3 - currentTotal;
            if (actualCubes > 0) {
                this.infections.set(this.color, 3);
                console.log(`⚠️ ${this.name} reached infection limit, adding ${actualCubes} cubes then outbreak`);
            }
            
            // Trigger outbreak
            if (gameState && gameState.board) {
                gameState.board.outbreak(this, gameState);
            }
            return false; // Indicates outbreak occurred
        } else {
            // Normal infection - add cubes
            this.infections.set(this.color, currentTotal + cubes);
            console.log(`🦠 ${this.name} infected: +${cubes} ${this.color} cubes (total: ${currentTotal + cubes})`);
            return true;
        }
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
    
    checkMedicPrevention(color, gameState) {
        if (!gameState.hasCure(color)) return false;
        
        // Find medic
        const medic = gameState.players.find(p => p.role.constructor.name === 'Medic');
        if (!medic) return false;
        
        // Check if medic is in this city or adjacent
        if (medic.location === this || 
            (this.neighbors && this.neighbors.includes(medic.location))) {
            console.log(`🛡️ Medic prevents ${color} infection in ${this.name} (disease cured)`);
            return true;
        }
        return false;
    }
}
