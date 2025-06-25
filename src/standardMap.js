class StandardMap {
    setupCities() {
        // Blue
        var Atlanta = new City("Atlanta", "Blue", 227, 316)
        var Chicago = new City("Chicago", "Blue", 197, 255)
        var Montreal = new City("Montreal", "Blue", 279, 252)
        var NewYork = new City("New York", "Blue", 343, 262)
        var Washington = new City("Washington", "Blue", 315, 312)
        var SanFrancisco = new City("San Francisco", "Blue", 91, 285)
        var London = new City("London", "Blue", 496, 212)
        var Madrid = new City("Madrid", "Blue", 484, 293)
        var Essen = new City("Essen", "Blue", 579, 197)
        var Paris = new City("Paris", "Blue", 559, 253)
        var Milan = new City("Milan", "Blue", 613, 236)
        var StPetersburg = new City("St. Petersburg", "Blue", 670, 181)

        // Yellow
        var LosAngeles = new City("Los Angeles", "Yellow", 109, 369)
        var MexicoCity = new City("Mexico City", "Yellow", 186, 396)
        var Miami = new City("Miami", "Yellow", 280, 383)
        var Bogota = new City("Bogota", "Yellow", 273, 467)
        var Lima = new City("Lima", "Yellow", 243, 556)
        var Santiago = new City("Santiago", "Yellow", 254, 649)
        var BuenosAires = new City("Buenos Aires", "Yellow", 343, 632)
        var SaoPaulo = new City("Sao Paulo", "Yellow", 389, 570)
        var Lagos = new City("Lagos", "Yellow", 551, 453)
        var Kinshasa = new City("Kinshasa", "Yellow", 602, 511)
        var Khartoum = new City("Khartoum", "Yellow", 655, 437)
        var Johannesburg = new City("Johannesburg", "Yellow", 650, 593)

        // Black
        var Moscow = new City("Moscow", "Black", 715, 235)
        var Istanbul = new City("Istanbul", "Black", 649, 283)
        var Algiers = new City("Algiers", "Black", 575, 337)
        var Cairo = new City("Cairo", "Black", 640, 356)
        var Baghdad = new City("Baghdad", "Black", 711, 329)
        var Tehran = new City("Tehran", "Black", 773, 272)
        var Riyadh = new City("Riyadh", "Black", 719, 400)
        var Karachi = new City("Karachi", "Black", 788, 354)
        var Delhi = new City("Delhi", "Black", 851, 332)
        var Mumbai = new City("Mumbai", "Black", 797, 417)
        var Chennai = new City("Chennai", "Black", 860, 457)
        var Kolkata = new City("Kolkata", "Black", 908, 350)

        // Red
        var Beijing = new City("Beijing", "Red", 955, 258)
        var Seoul = new City("Seoul", "Red", 1028, 253)
        var Shanghai = new City("Shanghai", "Red", 960, 315)
        var Tokyo = new City("Tokyo", "Red", 1086, 286)
        var Bangkok = new City("Bangkok", "Red", 918, 423)
        var HongKong = new City("Hong Kong", "Red", 966, 386)
        var Taipei = new City("Taipei", "Red", 1032, 373)
        var Osaka = new City("Osaka", "Red", 1092, 349)
        var Jakarta = new City("Jakarta", "Red", 919, 534)
        var HoChiMinhCity = new City("Ho Chi Minh City", "Red", 970, 481)
        var Manila = new City("Manila", "Red", 1052, 476)
        var Sydney = new City("Sydney", "Red", 1100, 646)

        // Blue connections using addNeighbor method
        Atlanta.addNeighbor(Chicago); Atlanta.addNeighbor(Washington); Atlanta.addNeighbor(Miami);
        Chicago.addNeighbor(Atlanta); Chicago.addNeighbor(SanFrancisco); Chicago.addNeighbor(Montreal); Chicago.addNeighbor(LosAngeles); Chicago.addNeighbor(MexicoCity);
        Montreal.addNeighbor(Chicago); Montreal.addNeighbor(Washington); Montreal.addNeighbor(NewYork);
        NewYork.addNeighbor(Montreal); NewYork.addNeighbor(Washington); NewYork.addNeighbor(London); NewYork.addNeighbor(Madrid);
        Washington.addNeighbor(Atlanta); Washington.addNeighbor(Montreal); Washington.addNeighbor(NewYork); Washington.addNeighbor(Miami);
        SanFrancisco.addNeighbor(Chicago); SanFrancisco.addNeighbor(LosAngeles); SanFrancisco.addNeighbor(Tokyo); SanFrancisco.addNeighbor(Manila);
        London.addNeighbor(NewYork); London.addNeighbor(Madrid); London.addNeighbor(Paris); London.addNeighbor(Essen);
        Madrid.addNeighbor(NewYork); Madrid.addNeighbor(London); Madrid.addNeighbor(Paris); Madrid.addNeighbor(SaoPaulo); Madrid.addNeighbor(Algiers);
        Essen.addNeighbor(London); Essen.addNeighbor(Paris); Essen.addNeighbor(Milan); Essen.addNeighbor(StPetersburg);
        Paris.addNeighbor(London); Paris.addNeighbor(Essen); Paris.addNeighbor(Milan); Paris.addNeighbor(Madrid); Paris.addNeighbor(Algiers);
        Milan.addNeighbor(Essen); Milan.addNeighbor(Paris); Milan.addNeighbor(Istanbul);
        StPetersburg.addNeighbor(Essen); StPetersburg.addNeighbor(Moscow); StPetersburg.addNeighbor(Istanbul);

        // Yellow connections
        LosAngeles.addNeighbor(SanFrancisco); LosAngeles.addNeighbor(Chicago); LosAngeles.addNeighbor(MexicoCity); LosAngeles.addNeighbor(Sydney);
        MexicoCity.addNeighbor(Chicago); MexicoCity.addNeighbor(LosAngeles); MexicoCity.addNeighbor(Miami); MexicoCity.addNeighbor(Lima); MexicoCity.addNeighbor(Bogota);
        Miami.addNeighbor(Atlanta); Miami.addNeighbor(Washington); Miami.addNeighbor(MexicoCity); Miami.addNeighbor(Bogota);
        Bogota.addNeighbor(MexicoCity); Bogota.addNeighbor(Miami); Bogota.addNeighbor(Lima); Bogota.addNeighbor(BuenosAires); Bogota.addNeighbor(SaoPaulo);
        Lima.addNeighbor(MexicoCity); Lima.addNeighbor(Bogota); Lima.addNeighbor(Santiago);
        Santiago.addNeighbor(Lima);
        BuenosAires.addNeighbor(Bogota); BuenosAires.addNeighbor(SaoPaulo);
        SaoPaulo.addNeighbor(Madrid); SaoPaulo.addNeighbor(Bogota); SaoPaulo.addNeighbor(BuenosAires); SaoPaulo.addNeighbor(Lagos);
        Lagos.addNeighbor(SaoPaulo); Lagos.addNeighbor(Kinshasa); Lagos.addNeighbor(Khartoum);
        Kinshasa.addNeighbor(Lagos); Kinshasa.addNeighbor(Khartoum); Kinshasa.addNeighbor(Johannesburg);
        Khartoum.addNeighbor(Lagos); Khartoum.addNeighbor(Kinshasa); Khartoum.addNeighbor(Johannesburg); Khartoum.addNeighbor(Cairo);
        Johannesburg.addNeighbor(Kinshasa); Johannesburg.addNeighbor(Khartoum);

        // Black connections
        Moscow.addNeighbor(StPetersburg); Moscow.addNeighbor(Istanbul); Moscow.addNeighbor(Tehran);
        Istanbul.addNeighbor(Milan); Istanbul.addNeighbor(StPetersburg); Istanbul.addNeighbor(Moscow); Istanbul.addNeighbor(Algiers); Istanbul.addNeighbor(Cairo); Istanbul.addNeighbor(Baghdad);
        Algiers.addNeighbor(Madrid); Algiers.addNeighbor(Paris); Algiers.addNeighbor(Istanbul); Algiers.addNeighbor(Cairo);
        Cairo.addNeighbor(Khartoum); Cairo.addNeighbor(Istanbul); Cairo.addNeighbor(Algiers); Cairo.addNeighbor(Baghdad); Cairo.addNeighbor(Riyadh);
        Baghdad.addNeighbor(Istanbul); Baghdad.addNeighbor(Cairo); Baghdad.addNeighbor(Riyadh); Baghdad.addNeighbor(Tehran); Baghdad.addNeighbor(Karachi);
        Tehran.addNeighbor(Moscow); Tehran.addNeighbor(Baghdad); Tehran.addNeighbor(Karachi); Tehran.addNeighbor(Delhi);
        Riyadh.addNeighbor(Cairo); Riyadh.addNeighbor(Baghdad); Riyadh.addNeighbor(Karachi);
        Karachi.addNeighbor(Baghdad); Karachi.addNeighbor(Riyadh); Karachi.addNeighbor(Tehran); Karachi.addNeighbor(Delhi); Karachi.addNeighbor(Mumbai);
        Delhi.addNeighbor(Tehran); Delhi.addNeighbor(Karachi); Delhi.addNeighbor(Mumbai); Delhi.addNeighbor(Kolkata); Delhi.addNeighbor(Chennai);
        Mumbai.addNeighbor(Karachi); Mumbai.addNeighbor(Delhi); Mumbai.addNeighbor(Chennai);
        Chennai.addNeighbor(Mumbai); Chennai.addNeighbor(Delhi); Chennai.addNeighbor(Kolkata); Chennai.addNeighbor(Bangkok); Chennai.addNeighbor(Jakarta);
        Kolkata.addNeighbor(Delhi); Kolkata.addNeighbor(Chennai); Kolkata.addNeighbor(Bangkok); Kolkata.addNeighbor(HongKong);

        // Red connections
        Beijing.addNeighbor(Seoul); Beijing.addNeighbor(Shanghai);
        Seoul.addNeighbor(Beijing); Seoul.addNeighbor(Shanghai); Seoul.addNeighbor(Tokyo);
        Shanghai.addNeighbor(Beijing); Shanghai.addNeighbor(Seoul); Shanghai.addNeighbor(Tokyo); Shanghai.addNeighbor(HongKong); Shanghai.addNeighbor(Taipei);
        Tokyo.addNeighbor(SanFrancisco); Tokyo.addNeighbor(Seoul); Tokyo.addNeighbor(Shanghai); Tokyo.addNeighbor(Osaka);
        Bangkok.addNeighbor(Kolkata); Bangkok.addNeighbor(Chennai); Bangkok.addNeighbor(HongKong); Bangkok.addNeighbor(Jakarta); Bangkok.addNeighbor(HoChiMinhCity);
        HongKong.addNeighbor(Kolkata); HongKong.addNeighbor(Shanghai); HongKong.addNeighbor(Bangkok); HongKong.addNeighbor(Taipei); HongKong.addNeighbor(Manila); HongKong.addNeighbor(HoChiMinhCity);
        Taipei.addNeighbor(Shanghai); Taipei.addNeighbor(HongKong); Taipei.addNeighbor(Osaka); Taipei.addNeighbor(Manila);
        Osaka.addNeighbor(Tokyo); Osaka.addNeighbor(Taipei);
        Jakarta.addNeighbor(Chennai); Jakarta.addNeighbor(Bangkok); Jakarta.addNeighbor(HoChiMinhCity); Jakarta.addNeighbor(Sydney);
        HoChiMinhCity.addNeighbor(Bangkok); HoChiMinhCity.addNeighbor(HongKong); HoChiMinhCity.addNeighbor(Jakarta); HoChiMinhCity.addNeighbor(Manila);
        Manila.addNeighbor(SanFrancisco); Manila.addNeighbor(HongKong); Manila.addNeighbor(Taipei); Manila.addNeighbor(HoChiMinhCity); Manila.addNeighbor(Sydney);
        Sydney.addNeighbor(LosAngeles); Sydney.addNeighbor(Jakarta); Sydney.addNeighbor(Manila);

        return [
            // Blue
            Atlanta, Chicago, Montreal, NewYork, Washington, SanFrancisco, London, Madrid, Essen, Paris, Milan, StPetersburg,
            // Yellow
            LosAngeles, MexicoCity, Miami, Bogota, Lima, Santiago, BuenosAires, SaoPaulo, Lagos, Kinshasa, Khartoum, Johannesburg,
            // Black
            Moscow, Istanbul, Algiers, Cairo, Baghdad, Tehran, Riyadh, Karachi, Delhi, Mumbai, Chennai, Kolkata,
            // Red
            Beijing, Seoul, Shanghai, Tokyo, Bangkok, HongKong, Taipei, Osaka, Jakarta, HoChiMinhCity, Manila, Sydney
        ]
    }
}

// Global function to create standard map
function createStandardMap() {
    const mapInstance = new StandardMap();
    return mapInstance.setupCities();
}
