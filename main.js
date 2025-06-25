// GLOBAL VARIABLES
let context;
let canvas;
let gameState;
let game;
let board;
let gameUI;

// Note: WIDTH and HEIGHT are defined in src/settings.js

// Initialize game with enhanced UI
function setup() {
    console.log("🎮 Iniciando Pandemic Game - Versão de Demonstração");
    
    // Get canvas and context
    canvas = document.getElementById("gameCanvas");
    context = canvas.getContext("2d");
    
    // Initialize game components
    try {
        const numberOfPlayers = 2;
        const difficulty = "Easy";
        
        // Create game state
        gameState = new GameState(numberOfPlayers, difficulty);
        
        // Create board
        board = new Board();
        board.setupBoard(gameState);
        
        // Setup initial state
        gameState.setupInitialState(board);
        
        // Create game facade
        game = new Game(gameState);
        
        // Initialize UI
        gameUI = new GameUI();
        
        // Setup mouse events
        canvas.addEventListener('click', handleMouseClick);
        
        console.log("⚠️ Esta versão possui funcionalidades limitadas");
        console.log("✅ Disponível: Movimento básico e tratamento de doenças");
        console.log("🚧 Em desenvolvimento: Construção de estações, descoberta de curas, habilidades especiais");
        
        // Start game
        game.startGame();
        
        console.log("🎯 Jogo inicializado com sucesso!");
        
    } catch (error) {
        console.error("Erro na inicialização:", error);
    }
}

function gameLoop() {
    try {
        // Clear canvas
        context.clearRect(0, 0, WIDTH, HEIGHT);
        
        if (gameUI && gameState && board) {
            gameUI.render(gameState, board);
        }
        
        // Check win/lose conditions
        if (gameState) {
            if (gameState.checkWinCondition()) {
                console.log("🎉 Parabéns! Todas as doenças foram curadas!");
            } else if (gameState.checkLoseCondition()) {
                console.log("💀 Fim de jogo! O mundo sucumbiu às doenças.");
            }
        }
    } catch (error) {
        console.error("Erro no loop do jogo:", error);
    }
}

function handleMouseClick(event) {
    if (!gameUI || !gameState || !board) {
        console.log("⚠️ Jogo ainda não foi inicializado completamente");
        return;
    }
    
    const rect = canvas.getBoundingClientRect();
    const mouseX = event.clientX - rect.left;
    const mouseY = event.clientY - rect.top;
    
    try {
        const handled = gameUI.handleClick(mouseX, mouseY, gameState, board);
        
        if (!handled) {
            console.log("Clique não processado. Tente clicar em uma cidade ou botão da interface.");
        }
        
        // Check if turn should end
        if (gameState.actionsRemaining === 0) {
            setTimeout(() => {
                console.log("🔄 Finalizando turno automaticamente...");
                gameState.endTurn(board);
            }, 1000);
        }
        
    } catch (error) {
        console.error("Erro ao processar clique:", error);
    }
}

// Enhanced player rendering with role colors
Player.prototype.render = function() {
    if (!this.location || typeof context === 'undefined') return;
    
    // Player marker
    const roleColor = this.role.getColor();
    context.fillStyle = roleColor;
    context.beginPath();
    context.arc(this.location.x + 10, this.location.y + 10, 8, 0, 2 * Math.PI);
    context.fill();
    context.strokeStyle = "#000";
    context.lineWidth = 2;
    context.stroke();
    
    // Player name
    context.fillStyle = "#000";
    context.font = "10px Arial";
    context.fillText(this.name, this.location.x - 5, this.location.y - 10);
    
    // Role indicator
    context.fillStyle = "#666";
    context.font = "8px Arial";
    context.fillText(this.role.constructor.name.substring(0, 6), this.location.x - 8, this.location.y + 35);
};

// Add development status to player actions
Player.prototype.moveTo = function(targetCity, gameState) {
    if (!isValidMove(this.location, targetCity)) {
        console.log("🚧 Movimento avançado (cartas/voos) ainda em desenvolvimento!");
        console.log("Apenas movimento para cidades adjacentes está disponível.");
        return false;
    }
    
    this.location = targetCity;
    console.log(formatPlayerAction("moveu-se para", this.name, targetCity.name));
    return true;
};

Player.prototype.treatDisease = function(gameState, board) {
    if (!this.location.isInfected()) {
        console.log("Não há doenças para tratar nesta cidade.");
        return false;
    }
    
    // Use role-specific treatment (limited implementation)
    const success = this.role.treat(this, gameState, board);
    if (success) {
        console.log(formatPlayerAction("tratou doença em", this.name, this.location.name));
        
        // Check for eradication (simplified)
        this.checkEradication(gameState);
    }
    return success;
};

Player.prototype.checkEradication = function(gameState) {
    // Simplified eradication check - just log for now
    const colors = ["Blue", "Yellow", "Black", "Red"];
    for (let color of colors) {
        if (gameState.curedDiseases.has(color)) {
            console.log(`💡 Dica: ${color} está curada - implemente verificação de erradicação!`);
        }
    }
};

// Animation loop
function step() {
    gameLoop();
    requestAnimationFrame(step);
}

// Add keyboard shortcuts info
document.addEventListener('keydown', function(event) {
    if (event.key === 'h' || event.key === 'H') {
        console.log("🎮 AJUDA - CONTROLES:");
        console.log("• Clique nas cidades para mover/agir");
        console.log("• Clique nos cubos de doença para tratá-los");
        console.log("• Use o painel de ações à esquerda");
        console.log("• H = Mostrar esta ajuda");
        console.log("• I = Informações de desenvolvimento");
    }
    
    if (event.key === 'i' || event.key === 'I') {
        console.log("ℹ️ INFORMAÇÕES DE DESENVOLVIMENTO:");
        console.log("✅ Implementado: Movimento básico, tratamento de doenças");
        console.log("🔄 Em desenvolvimento: Estações de pesquisa, curas");
        console.log("⏳ Planejado: Habilidades completas dos papéis, cartas de evento");
        console.log("🚧 Esta é uma versão de demonstração com funcionalidades limitadas");
    }
});

// Initialize when page loads
window.addEventListener('load', function() {
    console.log("📚 Carregando recursos do jogo...");
    
    // Wait a bit for all scripts to load
    setTimeout(() => {
        setup();
        step(); // Start the game loop
        
        setTimeout(() => {
            console.log("💡 Dica: Pressione 'H' para ajuda ou 'I' para informações de desenvolvimento");
        }, 2000);
    }, 500);
});
