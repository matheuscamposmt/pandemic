// Action Menu UI Component
class ActionMenuUI {
    constructor(scene) {
        this.scene = scene;
        this.container = null;
        this.buttons = [];
    }
    
    create() {
        // Smaller action menu panel for 3 buttons
        const actionPanel = this.scene.add.graphics();
        actionPanel.fillStyle(0x2c3e50, 0.95);
        actionPanel.lineStyle(4, 0x34495e, 1);
        actionPanel.fillRoundedRect(30, 740, 420, 120, 15);
        actionPanel.strokeRoundedRect(30, 740, 420, 120, 15);
        
        // Action panel header
        this.scene.add.text(240, 750, 'Ações', {
            fontSize: '20px',
            color: '#ecf0f1',
            fontStyle: 'bold'
        }).setOrigin(0.5);
        
        // Larger action buttons
        const actions = [
            { text: 'Tratar', color: 0xe74c3c, action: 'treat' },
            { text: 'Construir', color: 0x27ae60, action: 'build' },
            { text: 'Descobrir', color: 0x9b59b6, action: 'cure' }
        ];
        
        // Create horizontal layout with larger buttons
        actions.forEach((action, index) => {
            const x = 120 + index * 130;
            const y = 800;
            
            const button = this.createActionButton(x, y, action);
            this.buttons.push(button);
        });
        
        return this;
    }
    
    createActionButton(x, y, actionData) {
        const container = this.scene.add.container(x, y);
        
        const button = this.scene.add.graphics();
        button.fillStyle(actionData.color, 0.85);
        button.lineStyle(3, 0xffffff, 0.9);
        button.fillRoundedRect(-50, -20, 100, 40, 8);
        button.strokeRoundedRect(-50, -20, 100, 40, 8);
        
        const actionText = this.scene.add.text(0, 0, actionData.text, {
            fontSize: '12px',
            color: '#ffffff',
            fontStyle: 'bold'
        }).setOrigin(0.5);
        
        container.add([button, actionText]);
        container.setSize(100, 40);
        container.setInteractive();
        
        // Enhanced hover effects
        container.on('pointerover', () => {
            button.clear();
            button.fillStyle(actionData.color, 1);
            button.lineStyle(4, 0xffffff, 1);
            button.fillRoundedRect(-50, -20, 100, 40, 8);
            button.strokeRoundedRect(-50, -20, 100, 40, 8);
            
            this.scene.tweens.add({
                targets: container,
                scale: 1.08,
                duration: 150,
                ease: 'Back.easeOut'
            });
        });
        
        container.on('pointerout', () => {
            button.clear();
            button.fillStyle(actionData.color, 0.85);
            button.lineStyle(3, 0xffffff, 0.9);
            button.fillRoundedRect(-50, -20, 100, 40, 8);
            button.strokeRoundedRect(-50, -20, 100, 40, 8);
            
            this.scene.tweens.add({
                targets: container,
                scale: 1,
                duration: 150,
                ease: 'Back.easeIn'
            });
        });
        
        container.on('pointerdown', () => {
            this.scene.onActionClick(actionData.action);
        });
        
        return container;
    }
    
    updateActionAvailability(gameState) {
        // Future: Add visual feedback for available/unavailable actions
        const actionsLeft = gameState.getActions();
        // Could disable buttons or change their appearance based on availability
    }
} 