// Card Hand UI Component - Real card game style
class CardHandUI {
    constructor(scene) {
        this.scene = scene;
        this.container = null;
        this.cards = [];
        this.fannedCards = [];
        this.baseY = 920; // Cards start off-screen at bottom
        this.revealedY = 720; // Cards position when revealed (higher up)
        this.isRevealed = false;
    }
    
    create() {
        // Hand area - elegant design with better positioning
        const handPanel = this.scene.add.graphics();
        handPanel.fillStyle(0x1a252f, 0.95); // Darker, more elegant background
        handPanel.lineStyle(3, 0x3498db, 0.8); // Blue border
        handPanel.fillRoundedRect(450, 740, 700, 180, 20);
        handPanel.strokeRoundedRect(450, 740, 700, 180, 20);
        
        // Hand header with better styling
        this.scene.add.text(800, 760, 'Cartas', {
            fontSize: '24px',
            color: '#ecf0f1',
            fontStyle: 'bold',
            fontFamily: 'Arial'
        }).setOrigin(0.5);
        
        // Hand limit indicator with better positioning
        this.handLimitText = this.scene.add.text(1110, 760, '0/7', {
            fontSize: '20px',
            color: '#95a5a6',
            fontStyle: 'bold',
            fontFamily: 'Arial'
        }).setOrigin(0.5);
        
        // Expanded hover area for revealing cards
        this.hoverArea = this.scene.add.graphics();
        this.hoverArea.fillStyle(0x000000, 0.01); // Nearly invisible
        this.hoverArea.fillRect(350, 600, 900, 300);
        this.hoverArea.setInteractive();
        
        // Cards container - starts at bottom, fans out on hover
        this.container = this.scene.add.container(800, this.baseY);
        
        // Hover events for fanning cards
        this.hoverArea.on('pointerover', () => {
            this.revealCards();
        });
        
        this.hoverArea.on('pointerout', () => {
            this.hideCards();
        });
        
        this.updateHand(); // Call without player parameter
        return this;
    }
    
    updateHand(player) {
        if (!this.scene.gameState) return;
        
        // If no player is provided, get current player
        if (!player) {
            player = this.scene.gameState.getCurrentPlayer();
        }
        
        if (!player || !player.hand) {
            console.warn("No valid player or player.hand found in updateHand");
            return;
        }
        
        this.container.removeAll(true);
        this.fannedCards = [];
        
        const cards = player.hand || [];
        
        // Update hand limit display
        if (this.handLimitText) {
            const limitColor = cards.length > 7 ? '#e74c3c' : '#95a5a6';
            this.handLimitText.setText(`${cards.length}/7`);
            this.handLimitText.setColor(limitColor);
        }
        
        if (cards.length === 0) {
            const noCardsText = this.scene.add.text(0, -50, 'Nenhuma carta', {
                fontSize: '16px',
                color: '#7f8c8d',
                fontStyle: 'italic'
            }).setOrigin(0.5);
            this.container.add(noCardsText);
            return;
        }
        
        // Create fanned card layout
        this.createFannedCards(cards);
    }
    
    createFannedCards(cards) {
        const cardCount = cards.length;
        const maxSpread = 600; // Increased maximum spread width
        const cardSpacing = Math.min(90, maxSpread / Math.max(1, cardCount - 1)); // Increased spacing
        const startX = -(cardCount - 1) * cardSpacing / 2;
        
        cards.forEach((card, index) => {
            const cardX = startX + index * cardSpacing;
            const cardY = -30; // More visible when hidden
            const rotation = (index - (cardCount - 1) / 2) * 0.08; // Slightly reduced fan rotation
            
            const cardContainer = this.createCard(card, cardX, cardY, rotation, index);
            this.container.add(cardContainer);
            this.fannedCards.push(cardContainer);
        });
    }
    
    createCard(card, x, y, rotation, index) {
        const cardContainer = this.scene.add.container(x, y);
        cardContainer.setRotation(rotation);
        cardContainer.setDepth(10 + index);
        
        // Card background based on type
        const cardBg = this.scene.add.graphics();
        let cardColor, borderColor, textColor;
        
        switch (card.type) {
            case 'CityCard':
                cardColor = this.scene.diseaseColors[card.color] || 0x34495e;
                borderColor = 0xffffff;
                textColor = '#ffffff';
                break;
            case 'EpidemicCard':
                cardColor = 0x8b0000;
                borderColor = 0xff0000;
                textColor = '#ffff00';
                break;
            case 'EventCard':
                cardColor = 0x4a148c;
                borderColor = 0x9c27b0;
                textColor = '#ffffff';
                break;
            default:
                cardColor = 0x34495e;
                borderColor = 0xffffff;
                textColor = '#ffffff';
        }
        
        // Card shadow for depth - larger cards
        const shadow = this.scene.add.graphics();
        shadow.fillStyle(0x000000, 0.5);
        shadow.fillRoundedRect(-42, -62, 84, 124, 12);
        
        // Main card body - significantly larger
        cardBg.fillStyle(cardColor, 0.95);
        cardBg.lineStyle(4, borderColor, 0.9);
        cardBg.fillRoundedRect(-40, -60, 80, 120, 12);
        cardBg.strokeRoundedRect(-40, -60, 80, 120, 12);
        
        // Card type indicator
        let typeIcon = '';
        switch (card.type) {
            case 'CityCard': typeIcon = '🏙️'; break;
            case 'EpidemicCard': typeIcon = '🚨'; break;
            case 'EventCard': typeIcon = '⚡'; break;
        }
        
        const icon = this.scene.add.text(0, -35, typeIcon, {
            fontSize: '28px'
        }).setOrigin(0.5);
        
        // Card name - larger text
        const cardName = card.name.length > 12 ? card.name.substring(0, 12) + '...' : card.name;
        const nameText = this.scene.add.text(0, -5, cardName, {
            fontSize: '13px',
            color: textColor,
            fontStyle: 'bold',
            wordWrap: { width: 75 },
            align: 'center'
        }).setOrigin(0.5);
        
        // Card type label - larger
        const typeText = this.scene.add.text(0, 35, this.translateCardType(card.type), {
            fontSize: '11px',
            color: textColor,
            fontStyle: 'italic'
        }).setOrigin(0.5);
        
        cardContainer.add([shadow, cardBg, icon, nameText, typeText]);
        cardContainer.setSize(80, 120); // Updated size
        cardContainer.setInteractive();
        
        // Store card data
        cardContainer.cardData = card;
        cardContainer.originalX = x;
        cardContainer.originalY = y;
        cardContainer.originalRotation = rotation;
        cardContainer.cardIndex = index;
        
        // Card interactions
        cardContainer.on('pointerover', () => {
            this.highlightCard(cardContainer, index);
        });
        
        cardContainer.on('pointerout', () => {
            this.unhighlightCard(cardContainer);
        });
        
        cardContainer.on('pointerdown', () => {
            this.selectCard(card);
        });
        
        return cardContainer;
    }
    
    translateCardType(cardType) {
        switch(cardType) {
            case 'CityCard': return 'Cidade';
            case 'EpidemicCard': return 'Epidemia';
            case 'EventCard': return 'Evento';
            default: return cardType;
        }
    }
    
    highlightCard(cardContainer, index) {
        // Lift the hovered card above others
        cardContainer.setDepth(100);
        
        this.scene.tweens.add({
            targets: cardContainer,
            y: cardContainer.originalY - 40, // More lift for larger cards
            scale: 1.15, // Slightly more scale
            rotation: 0, // Straighten the card
            duration: 250,
            ease: 'Back.easeOut'
        });
        
    }
    
    unhighlightCard(cardContainer) {
        cardContainer.setDepth(10 + cardContainer.cardIndex);
        
        this.scene.tweens.add({
            targets: cardContainer,
            y: cardContainer.originalY,
            scale: 1,
            rotation: cardContainer.originalRotation,
            duration: 250,
            ease: 'Back.easeIn'
        });
    }
    
    revealCards() {
        if (this.isRevealed) return;
        this.isRevealed = true;
        
        // Move all cards up to reveal them
        this.scene.tweens.add({
            targets: this.container,
            y: this.revealedY,
            duration: 300,
            ease: 'Power2.easeOut'
        });
    }
    
    hideCards() {
        if (!this.isRevealed) return;
        this.isRevealed = false;
        
        // Move cards back down
        this.scene.tweens.add({
            targets: this.container,
            y: this.baseY,
            duration: 300,
            ease: 'Power2.easeIn'
        });
    }
    
    selectCard(card) {
        console.log(`Carta selecionada: ${card.name}`);
        
        // Event cards should show immediate use dialog
        if (card.type === 'EventCard') {
            this.scene.showEventCardDialog(card);
        } else {
            this.showCardOptions(card);
        }
    }
    
    showCardOptions(card) {
        // For city cards, show sharing or discard options
        if (card.type === 'CityCard') {
            this.showCardActionDialog(card);
        }
    }
    
    showCardActionDialog(card, playersInSameCity = [], currentPlayer = null) {
        if (!currentPlayer) {
            currentPlayer = this.scene.gameState.getCurrentPlayer();
        }
        
        // Check if other players are in same city
        if (!playersInSameCity.length) {
            playersInSameCity = this.scene.gameState.players.filter(p => 
                p !== currentPlayer && p.location === currentPlayer.location
            );
        }
        
        // Create dialog overlay
        const overlay = this.scene.add.graphics();
        overlay.fillStyle(0x000000, 0.8);
        overlay.fillRect(0, 0, 1600, 900);
        overlay.setDepth(3000);
        
        // Dialog container
        const dialog = this.scene.add.container(800, 450);
        dialog.setDepth(3001);
        
        // Dialog background
        const dialogBg = this.scene.add.graphics();
        dialogBg.fillStyle(0x2c3e50, 0.95);
        dialogBg.lineStyle(4, 0x3498db);
        dialogBg.fillRoundedRect(-200, -120, 400, 240, 15);
        dialogBg.strokeRoundedRect(-200, -120, 400, 240, 15);
        
        // Card name
        const cardName = this.scene.add.text(0, -80, card.name, {
            fontSize: '20px',
            color: '#ffffff',
            fontStyle: 'bold'
        }).setOrigin(0.5);
        
        dialog.add([dialogBg, cardName]);
        
        let yOffset = -30;
        
        // Share options
        if (playersInSameCity.length > 0) {
            const shareText = this.scene.add.text(0, yOffset, 'Compartilhar com:', {
                fontSize: '16px',
                color: '#ecf0f1'
            }).setOrigin(0.5);
            dialog.add(shareText);
            yOffset += 30;
            
            playersInSameCity.forEach((player, index) => {
                const shareButton = this.scene.add.graphics();
                shareButton.fillStyle(0x27ae60, 0.9);
                shareButton.lineStyle(2, 0x2ecc71);
                shareButton.fillRoundedRect(-80, yOffset - 10, 160, 25, 5);
                shareButton.strokeRoundedRect(-80, yOffset - 10, 160, 25, 5);
                shareButton.setInteractive(new Phaser.Geom.Rectangle(-80, yOffset - 10, 160, 25), Phaser.Geom.Rectangle.Contains);
                
                const sharePlayerText = this.scene.add.text(0, yOffset + 2, player.name, {
                    fontSize: '12px',
                    color: '#ffffff',
                    fontStyle: 'bold'
                }).setOrigin(0.5);
                
                dialog.add([shareButton, sharePlayerText]);
                
                shareButton.on('pointerdown', () => {
                    this.executeCardShare(currentPlayer, player, card.name);
                    this.closeDialog(overlay, dialog);
                });
                
                yOffset += 35;
            });
        }
        
        // Discard button
        const discardButton = this.scene.add.graphics();
        discardButton.fillStyle(0x000000, 0.9);
        discardButton.lineStyle(2, 0x333333);
        discardButton.fillRoundedRect(-80, yOffset, 160, 30, 8);
        discardButton.strokeRoundedRect(-80, yOffset, 160, 30, 8);
        discardButton.setInteractive(new Phaser.Geom.Rectangle(-80, yOffset, 160, 30), Phaser.Geom.Rectangle.Contains);

        const discardText = this.scene.add.text(0, yOffset + 15, 'Descartar', {
            fontSize: '14px',
            color: '#ffffff',
            fontStyle: 'bold'
        }).setOrigin(0.5);

        // Cancel button - positioned below discard button
        const cancelButton = this.scene.add.graphics();
        cancelButton.fillStyle(0xe74c3c, 0.9);
        cancelButton.lineStyle(2, 0xc0392b);
        cancelButton.fillRoundedRect(-80, yOffset + 40, 160, 30, 8);
        cancelButton.strokeRoundedRect(-80, yOffset + 40, 160, 30, 8);
        cancelButton.setInteractive(new Phaser.Geom.Rectangle(-80, yOffset + 40, 160, 30), Phaser.Geom.Rectangle.Contains);

        const cancelText = this.scene.add.text(0, yOffset + 55, 'Cancelar', {
            fontSize: '14px',
            color: '#ffffff',
            fontStyle: 'bold'
        }).setOrigin(0.5);
        
        dialog.add([discardButton, discardText, cancelButton, cancelText]);
        
        discardButton.on('pointerdown', () => {
            currentPlayer.discard(card.name);
            this.animateCardDiscard(card.name);
            this.scene.showMessage(`Carta descartada: ${card.name}`, 0xf39c12);
            this.closeDialog(overlay, dialog);
        });
        
        cancelButton.on('pointerdown', () => {
            this.closeDialog(overlay, dialog);
        });
        
        // Close on overlay click
        overlay.setInteractive();
        overlay.on('pointerdown', () => {
            this.closeDialog(overlay, dialog);
        });
    }
    
    closeDialog(overlay, dialog) {
        if (overlay && overlay.scene) {
            overlay.destroy();
        }
        if (dialog && dialog.scene) {
            dialog.destroy();
        }
    }
    
    executeCardShare(currentPlayer, otherPlayer, cardName) {
        // Attempt to share the card
        const success = currentPlayer.shareKnowledge(otherPlayer, cardName, this.scene.gameState);
        
        if (success) {
            this.scene.showMessage(`Carta compartilhada: ${cardName} para ${otherPlayer.name}`, 0x27ae60);
            
            // Update both players' hands if needed
            if (this.scene.gameState.getCurrentPlayer() === otherPlayer) {
                this.updateHand(otherPlayer);
            } else {
                this.updateHand(currentPlayer);
            }
        } else {
            this.scene.showMessage("Não é possível compartilhar esta carta", 0xe74c3c);
        }
    }
    
    animateCardDraw(card, player) {
        if (!player) {
            player = this.scene.gameState.getCurrentPlayer();
        }
        
        // Create temporary card that flies to hand area
        const tempCard = this.scene.add.graphics();
        const cardColor = card.type === 'CityCard' ? 
            (this.scene.diseaseColors[card.color] || 0x34495e) : 
            (card.type === 'EpidemicCard' ? 0x8b0000 : 0x4a148c);
        
        tempCard.fillStyle(cardColor, 0.9);
        tempCard.lineStyle(3, 0xffffff);
        tempCard.fillRoundedRect(-25, -35, 50, 70, 8);
        tempCard.strokeRoundedRect(-25, -35, 50, 70, 8);
        tempCard.setPosition(1500, 800);
        tempCard.setDepth(2000);
        
        // Animate to hand
        this.scene.tweens.add({
            targets: tempCard,
            x: 800,
            y: 850,
            scale: 0.8,
            duration: 600,
            ease: 'Power2.easeOut',
            onComplete: () => {
                tempCard.destroy();
                this.updateHand(player);
            }
        });
        
        // Update deck counter
        if (this.scene.deckAreaUI) {
            this.scene.deckAreaUI.animateDrawFromPlayerDeck();
        }
    }
    
    animateCardDiscard(cardName, player) {
        if (!player) {
            player = this.scene.gameState.getCurrentPlayer();
        }
        
        // Find card in fanned cards and animate it away
        const cardToRemove = this.fannedCards.find(card => 
            card.cardData && card.cardData.name === cardName
        );
        
        if (cardToRemove) {
            this.scene.tweens.add({
                targets: cardToRemove,
                y: cardToRemove.y + 200,
                alpha: 0,
                scale: 0.5,
                duration: 400,
                ease: 'Power2.easeIn',
                onComplete: () => {
                    cardToRemove.destroy();
                    this.updateHand(player);
                }
            });
        } else {
            // Fallback - just update hand
            this.updateHand(player);
        }
        
        // Update deck counter
        if (this.scene.deckAreaUI) {
            this.scene.deckAreaUI.animateDiscard();
        }
    }
} 