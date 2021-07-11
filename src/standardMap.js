function StandardMap() {
}

StandardMap.prototype.setupCities = function () {
    // Blue
    var Atlanta = new City("Atlanta", 227, 316, "Blue");
    var Chicago = new City("Chicago", 197, 255, "Blue");
    var Montreal = new City("Montreal", 279, 252, "Blue");
    var NewYork = new City("New York", 343, 262, "Blue");
    var Washington = new City("Washington", 315, 312, "Blue");
    var SanFrancisco = new City("San Francisco", 91, 285, "Blue");
    var London = new City("London", 496, 212, "Blue");
    var Madrid = new City("Madrid", 484, 293, "Blue");
    var Essen = new City("Essen", 579, 197, "Blue");
    var Paris = new City("Paris", 559, 253, "Blue");
    var Milan = new City("Milan", 613, 236, "Blue");
    var StPetersburg = new City("St. Petersburg", 670, 181, "Blue");

    // Yellow
    var LosAngeles = new City("Los Angeles", 109, 369, "Yellow");
    var MexicoCity = new City("Mexico City", 186, 396, "Yellow");
    var Miami = new City("Miami", 280, 383, "Yellow");
    var Bogota = new City("Bogota", 273, 467, "Yellow");
    var Lima = new City("Lima", 243, 556, "Yellow");
    var Santiago = new City("Santiago", 254, 649, "Yellow");
    var BuenosAires = new City("Buenos Aires", 343, 632, "Yellow");
    var SaoPaulo = new City("Sao Paulo", 389, 570, "Yellow");
    var Lagos = new City("Lagos", 551, 453, "Yellow");
    var Kinshasa = new City("Kinshasa", 602, 511, "Yellow");
    var Khartoum = new City("Khartoum", 655, 437, "Yellow");
    var Johannesburg = new City("Johannesburg", 650, 593, "Yellow");

    // Black
    var Moscow = new City("Moscow", 715, 235, "Black");
    var Istanbul = new City("Istanbul", 649, 283, "Black");
    var Algiers = new City("Algiers", 575, 337, "Black");
    var Cairo = new City("Cairo", 640, 356, "Black");
    var Baghdad = new City("Baghdad", 711, 329, "Black");
    var Tehran = new City("Tehran", 773, 272, "Black");
    var Riyadh = new City("Riyadh", 719, 400, "Black");
    var Karachi = new City("Karachi", 788, 354, "Black");
    var Delhi = new City("Delhi", 851, 332, "Black");
    var Mumbai = new City("Mumbai", 797, 417, "Black");
    var Chennai = new City("Chennai", 860, 457, "Black");
    var Kolkata = new City("Kolkata", 908, 350, "Black");

    // Red
    var Beijing = new City("Beijing", 955, 258, "Red");
    var Seoul = new City("Seoul", 1028, 253, "Red");
    var Shanghai = new City("Shanghai", 960, 315, "Red");
    var Tokyo = new City("Tokyo", 1086, 286, "Red");
    var Bangkok = new City("Bangkok", 918, 423, "Red");
    var HongKong = new City("Hong Kong", 966, 386, "Red");
    var Taipei = new City("Taipei", 1032, 373, "Red");
    var Osaka = new City("Osaka", 1092, 349, "Red");
    var Jakarta = new City("Jakarta", 919, 534, "Red");
    var HoChiMinhCity = new City("Ho Chi Minh City", 970, 481, "Red");
    var Manila = new City("Manila", 1052, 476, "Red");
    var Sydney = new City("Sydney", 1100, 646, "Red");

    // Blue
    Atlanta.setNeighborCities([Chicago, Washington, Miami]);
    Chicago.setNeighborCities([Atlanta, SanFrancisco, Montreal, LosAngeles, MexicoCity]);
    Montreal.setNeighborCities([Chicago, Washington, NewYork]);
    NewYork.setNeighborCities([Montreal, Washington, London, Madrid]);
    Washington.setNeighborCities([Atlanta, Montreal, NewYork, Miami]);
    SanFrancisco.setNeighborCities([Chicago, LosAngeles, Tokyo, Manila]);
    London.setNeighborCities([NewYork, Madrid, Paris, Essen]);
    Madrid.setNeighborCities([NewYork, London, Paris, SaoPaulo, Algiers]);
    Essen.setNeighborCities([London, Paris, Milan, StPetersburg]);
    Paris.setNeighborCities([London, Essen, Milan, Madrid, Algiers]);
    Milan.setNeighborCities([Essen, Paris, Istanbul]);
    StPetersburg.setNeighborCities([Essen, Moscow, Istanbul]);

    // Yellow
    LosAngeles.setNeighborCities([SanFrancisco, Chicago, MexicoCity, Sydney]);
    MexicoCity.setNeighborCities([Chicago, LosAngeles, Miami, Lima, Bogota]);
    Miami.setNeighborCities([Atlanta, Washington, MexicoCity, Bogota]);
    Bogota.setNeighborCities([MexicoCity, Miami, Lima, BuenosAires, SaoPaulo]);
    Lima.setNeighborCities([MexicoCity, Bogota, Santiago]);
    Santiago.setNeighborCities([Lima]);
    BuenosAires.setNeighborCities([Bogota, SaoPaulo]);
    SaoPaulo.setNeighborCities([Madrid, Bogota, BuenosAires, Lagos]);
    Lagos.setNeighborCities([SaoPaulo, Kinshasa, Khartoum]);
    Kinshasa.setNeighborCities([Lagos, Khartoum, Johannesburg]);
    Khartoum.setNeighborCities([Lagos, Kinshasa, Johannesburg, Cairo]);
    Johannesburg.setNeighborCities([Kinshasa, Khartoum]);

    // Black
    Moscow.setNeighborCities([StPetersburg, Istanbul, Tehran]);
    Istanbul.setNeighborCities([Milan, StPetersburg, Moscow, Algiers, Cairo, Baghdad]);
    Algiers.setNeighborCities([Madrid, Paris, Istanbul, Cairo]);
    Cairo.setNeighborCities([Khartoum, Istanbul, Algiers, Baghdad, Riyadh]);
    Baghdad.setNeighborCities([Istanbul, Cairo, Riyadh, Tehran, Karachi]);
    Tehran.setNeighborCities([Moscow, Baghdad, Karachi, Delhi]);
    Riyadh.setNeighborCities([Cairo, Baghdad, Karachi]);
    Karachi.setNeighborCities([Baghdad, Riyadh, Tehran, Delhi, Mumbai]);
    Delhi.setNeighborCities([Tehran, Karachi, Mumbai, Kolkata, Chennai]);
    Mumbai.setNeighborCities([Karachi, Delhi, Chennai]);
    Chennai.setNeighborCities([Mumbai, Delhi, Kolkata, Bangkok, Jakarta]);
    Kolkata.setNeighborCities([Delhi, Chennai, Bangkok, HongKong]);

    // Red
    Beijing.setNeighborCities([Seoul, Shanghai]);
    Seoul.setNeighborCities([Beijing, Shanghai, Tokyo]);
    Shanghai.setNeighborCities([Beijing, Seoul, Tokyo, HongKong, Taipei]);
    Tokyo.setNeighborCities([SanFrancisco, Seoul, Shanghai, Osaka]);
    Bangkok.setNeighborCities([Kolkata, Chennai, HongKong, Jakarta, HoChiMinhCity]);
    HongKong.setNeighborCities([Kolkata, Shanghai, Bangkok, Taipei, Manila, HoChiMinhCity]);
    Taipei.setNeighborCities([Shanghai, HongKong, Osaka, Manila]);
    Osaka.setNeighborCities([Tokyo, Taipei]);
    Jakarta.setNeighborCities([Chennai, Bangkok, HoChiMinhCity, Sydney]);
    HoChiMinhCity.setNeighborCities([Bangkok, HongKong, Jakarta, Manila]);
    Manila.setNeighborCities([SanFrancisco, HongKong, Taipei, HoChiMinhCity, Sydney]);
    Sydney.setNeighborCities([LosAngeles, Jakarta, Manila]);

    return [
        // Blue
        Atlanta, Chicago, Montreal, NewYork, Washington, SanFrancisco, London, Madrid, Essen, Paris, Milan, StPetersburg,
        // Yellow
        LosAngeles, MexicoCity, Miami, Bogota, Lima, Santiago, BuenosAires, SaoPaulo, Lagos, Kinshasa, Khartoum, Johannesburg,
        // Black
        Moscow, Istanbul, Algiers, Cairo, Baghdad, Tehran, Riyadh, Karachi, Delhi, Mumbai, Chennai, Kolkata,
        // Red
        Beijing, Seoul, Shanghai, Tokyo, Bangkok, HongKong, Taipei, Osaka, Jakarta, HoChiMinhCity, Manila, Sydney
    ];
}
