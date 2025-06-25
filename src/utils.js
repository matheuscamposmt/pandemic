// UTILITY FUNCTIONS
function textToHex(colorName) {
    const colorMap = {
        "Blue": "#0066CC",
        "Yellow": "#FFD700", 
        "Black": "#333333",
        "Red": "#CC0000",
        "blue": "#0066CC",
        "yellow": "#FFD700",
        "black": "#333333", 
        "red": "#CC0000"
    };
    return colorMap[colorName] || "#666666";
}

function hexToText(hexColor) {
    const hexMap = {
        "#0066CC": "Blue",
        "#FFD700": "Yellow",
        "#333333": "Black", 
        "#CC0000": "Red"
    };
    return hexMap[hexColor] || "Unknown";
}

function formatPlayerAction(action, playerName, details = "") {
    const timestamp = new Date().toLocaleTimeString();
    return `[${timestamp}] ${playerName}: ${action} ${details}`;
}

function calculateDistance(city1, city2) {
    const dx = city1.x - city2.x;
    const dy = city1.y - city2.y;
    return Math.sqrt(dx * dx + dy * dy);
}

function getAdjacentCities(city, allCities) {
    return city.neighbors || [];
}

function isValidMove(fromCity, toCity) {
    if (!fromCity || !toCity) return false;
    return fromCity.neighbors.includes(toCity);
}

function getColoredText(text, color) {
    const styles = {
        success: "#4CAF50",
        error: "#F44336", 
        warning: "#FF9800",
        info: "#2196F3",
        default: "#333333"
    };
    return { text, color: styles[color] || styles.default };
}

// Animation utilities
function easeInOut(t) {
    return t < 0.5 ? 2 * t * t : -1 + (4 - 2 * t) * t;
}

function lerp(start, end, factor) {
    return start + (end - start) * factor;
}

class AnimationQueue {
    constructor() {
        this.animations = [];
        this.isRunning = false;
    }
    
    add(animation) {
        this.animations.push(animation);
        if (!this.isRunning) {
            this.start();
        }
    }
    
    start() {
        this.isRunning = true;
        this.process();
    }
    
    process() {
        if (this.animations.length === 0) {
            this.isRunning = false;
            return;
        }
        
        const animation = this.animations.shift();
        animation.execute().then(() => {
            this.process();
        });
    }
} 