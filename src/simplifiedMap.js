class SimplifiedMap {
    setupCities() {
        // Região das Américas (Blue)
        var Atlanta = new City("Atlanta", "Blue", 200, 400)        // Centro de Controle CDC
        var NewYork = new City("New York", "Blue", 350, 250)       // Norte dos EUA
        var SaoPaulo = new City("São Paulo", "Yellow", 300, 650)   // América do Sul

        // Região Europa/África (Black) 
        var London = new City("London", "Blue", 700, 200)          // Europa Ocidental
        var Paris = new City("Paris", "Blue", 850, 350)            // Europa Central
        var Cairo = new City("Cairo", "Black", 950, 550)           // Norte da África

        // Região Ásia (Red)
        var Mumbai = new City("Mumbai", "Black", 1200, 450)        // Sul da Ásia
        var Tokyo = new City("Tokyo", "Red", 1400, 300)            // Leste Asiático

        // Definir conexões estratégicas baseadas em proximidade geográfica e rotas comerciais
        
        // Conexões regionais nas Américas
        Atlanta.addNeighbor(NewYork);
        Atlanta.addNeighbor(SaoPaulo);
        NewYork.addNeighbor(Atlanta);
        NewYork.addNeighbor(London);  // Conexão transatlântica
        SaoPaulo.addNeighbor(Atlanta);
        SaoPaulo.addNeighbor(Cairo);  // Rota para África

        // Conexões regionais na Europa/África
        London.addNeighbor(NewYork);
        London.addNeighbor(Paris);
        London.addNeighbor(Mumbai);  // Hub europeu
        Paris.addNeighbor(London);
        Paris.addNeighbor(Cairo);
        Paris.addNeighbor(Tokyo);     // Centro europeu
        Cairo.addNeighbor(SaoPaulo);
        Cairo.addNeighbor(Paris);
        Cairo.addNeighbor(Mumbai);  // Ponte África-Ásia

        // Conexões regionais na Ásia
        Mumbai.addNeighbor(Cairo);
        Mumbai.addNeighbor(London);
        Mumbai.addNeighbor(Tokyo);    // Hub do Sul da Ásia
        Tokyo.addNeighbor(Mumbai);
        Tokyo.addNeighbor(Paris);
        Tokyo.addNeighbor(NewYork);   // Conexão trans-pacífica

        return [
            // Ordem estratégica: Américas, Europa/África, Ásia
            Atlanta, NewYork, SaoPaulo,     // Américas
            London, Paris, Cairo,           // Europa/África  
            Mumbai, Tokyo                   // Ásia
        ]
    }
}

// Global function to create simplified map
function createSimplifiedMap() {
    const mapInstance = new SimplifiedMap();
    return mapInstance.setupCities();
} 