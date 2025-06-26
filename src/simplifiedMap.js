class SimplifiedMap {
    setupCities() {
        // Região das Américas (Blue/Yellow)
        var Atlanta = new City("Atlanta", "Blue", 200, 400);        // Centro de Controle CDC
        var NewYork = new City("New York", "Blue", 350, 250);       // Norte dos EUA
        var SaoPaulo = new City("São Paulo", "Yellow", 300, 650);   // América do Sul
        var MexicoCity = new City("Mexico City", "Yellow", 180, 550); // América Central
        var Miami = new City("Miami", "Blue", 250, 500);            // Sudeste dos EUA

        // Região Europa/África (Blue/Black)
        var London = new City("London", "Blue", 700, 200);          // Europa Ocidental
        var Paris = new City("Paris", "Blue", 850, 350);            // Europa Central
        var Cairo = new City("Cairo", "Black", 950, 550);           // Norte da África
        var Istanbul = new City("Istanbul", "Black", 1000, 400);    // Leste Europeu

        // Região Ásia (Black/Red)
        var Mumbai = new City("Mumbai", "Black", 1200, 450);        // Sul da Ásia
        var Tokyo = new City("Tokyo", "Red", 1400, 300);            // Leste Asiático
        var Beijing = new City("Beijing", "Red", 1350, 200);        // Norte da China

        // Conexões regionais nas Américas
        Atlanta.addNeighbor(NewYork);
        Atlanta.addNeighbor(SaoPaulo);
        Atlanta.addNeighbor(Miami);
        NewYork.addNeighbor(Atlanta);
        NewYork.addNeighbor(London);  // Conexão transatlântica
        NewYork.addNeighbor(Miami);
        SaoPaulo.addNeighbor(Atlanta);
        SaoPaulo.addNeighbor(Cairo);  // Rota para África
        SaoPaulo.addNeighbor(MexicoCity);
        MexicoCity.addNeighbor(SaoPaulo);
        MexicoCity.addNeighbor(Miami);
        Miami.addNeighbor(Atlanta);
        Miami.addNeighbor(NewYork);
        Miami.addNeighbor(MexicoCity);

        // Conexões regionais na Europa/África
        London.addNeighbor(NewYork);
        London.addNeighbor(Paris);
        London.addNeighbor(Istanbul);
        Paris.addNeighbor(London);
        Paris.addNeighbor(Cairo);
        Paris.addNeighbor(Tokyo);     // Centro europeu
        Cairo.addNeighbor(SaoPaulo);
        Cairo.addNeighbor(Paris);
        Cairo.addNeighbor(Mumbai);  // Ponte África-Ásia
        Cairo.addNeighbor(Istanbul);
        Istanbul.addNeighbor(London);
        Istanbul.addNeighbor(Cairo);
        Istanbul.addNeighbor(Mumbai);

        // Conexões regionais na Ásia
        Mumbai.addNeighbor(Cairo);
        Mumbai.addNeighbor(Istanbul);
        Mumbai.addNeighbor(Tokyo);    // Hub do Sul da Ásia
        Tokyo.addNeighbor(Mumbai);
        Tokyo.addNeighbor(Paris);
        Tokyo.addNeighbor(NewYork);   // Conexão trans-pacífica
        Tokyo.addNeighbor(Beijing);
        Beijing.addNeighbor(Tokyo);
        Beijing.addNeighbor(Mumbai);

        return [
            // Ordem estratégica: Américas, Europa/África, Ásia
            Atlanta, NewYork, SaoPaulo, MexicoCity, Miami,    // Américas
            London, Paris, Cairo, Istanbul,                   // Europa/África  
            Mumbai, Tokyo, Beijing                            // Ásia
        ];
    }
}

// Global function to create simplified map
function createSimplifiedMap() {
    const mapInstance = new SimplifiedMap();
    return mapInstance.setupCities();
} 