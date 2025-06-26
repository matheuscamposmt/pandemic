// Deck Area UI Component - Shows all game decks
class DeckAreaUI {
    constructor(scene) {
        this.scene = scene;
        this.playerDeckContainer = null;
        this.infectionDeckContainer = null;
        this.discardContainer = null;
    }
    
    create() {
        // Only create essential deck info in bottom right corner
        this.createEssentialDeckInfo();
        
        return this;
    }
    
    createEssentialDeckInfo() {
        // Compact deck info in bottom right corner - only if really needed
        const infoPanel = this.scene.add.graphics();
        infoPanel.fillStyle(0x2c3e50, 0.85);
        infoPanel.lineStyle(2, 0x34495e, 0.8);
        infoPanel.fillRoundedRect(1420, 780, 160, 100, 10);
        infoPanel.strokeRoundedRect(1420, 780, 160, 100, 10);
        
        // Essential game info only
        this.scene.add.text(1500, 800, '📊 INFO', {
            fontSize: '14px',
            color: '#ecf0f1',
            fontStyle: 'bold'
        }).setOrigin(0.5);
        
        // Player deck count (most important)
        this.playerDeckCounter = this.scene.add.text(1500, 825, 'Baralho: 0', {
            fontSize: '12px',
            color: '#95a5a6'
        }).setOrigin(0.5);
        
        // Outbreak counter (critical info)
        this.outbreakCounter = this.scene.add.text(1500, 845, 'Surtos: 0/8', {
            fontSize: '12px',
            color: '#e74c3c'
        }).setOrigin(0.5);
        
        // Infection rate (useful info)
        this.infectionRateText = this.scene.add.text(1500, 865, 'Taxa: 2', {
            fontSize: '12px',
            color: '#f39c12'
        }).setOrigin(0.5);
        
        this.updateEssentialInfo();
    }
    
    updateEssentialInfo() {
        if (!this.scene.gameState) return;
        
        // Update player deck count
        if (this.playerDeckCounter) {
            const deckSize = this.scene.gameState.playerDeck?.size() || 0;
            this.playerDeckCounter.setText(`Baralho: ${deckSize}`);
            
            // Color coding for urgency
            if (deckSize <= 5) {
                this.playerDeckCounter.setColor('#e74c3c'); // Red - critical
            } else if (deckSize <= 10) {
                this.playerDeckCounter.setColor('#f39c12'); // Orange - warning
            } else {
                this.playerDeckCounter.setColor('#95a5a6'); // Gray - normal
            }
        }
        
        // Update outbreak counter
        if (this.outbreakCounter) {
            const outbreaks = this.scene.gameState.getOutbreakCount();
            this.outbreakCounter.setText(`Surtos: ${outbreaks}/8`);
            
            // Color coding for danger
            if (outbreaks >= 6) {
                this.outbreakCounter.setColor('#e74c3c'); // Red - danger
            } else if (outbreaks >= 4) {
                this.outbreakCounter.setColor('#f39c12'); // Orange - warning
            } else {
                this.outbreakCounter.setColor('#27ae60'); // Green - safe
            }
        }
        
    }
    
    // Simplified animation methods
    animateDrawFromPlayerDeck() {
        this.updateEssentialInfo();
    }
    
    animateDrawFromInfectionDeck() {
        this.updateEssentialInfo();
    }
    
    animateDiscard() {
        this.updateEssentialInfo();
    }
    
    updateAll() {
        this.updateEssentialInfo();
    }
} 