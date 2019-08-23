class Map {
    constructor() {
        this.listeStation = "";
        this.methodeAjax();
    }

    initMap() {
        var lyon = [45.756805, 4.832215];

        window.map = new L.map("map").setView(lyon, 16);
        L.tileLayer("https://{s}.tile.openstreetmap.fr/osmfr/{z}/{x}/{y}.png", {
            maxZoom: 16,
            minZoom: 16
        }).addTo(map);

        this.addMarkers();
    }

    methodeAjax() {
        var req = new XMLHttpRequest();
        req.open("GET", "https://api.jcdecaux.com/vls/v1/stations?contract=Lyon&apiKey=b6c6e68863f4f4140bce781e1021de44f0dc81f1");
        req.addEventListener("load", function () {
            if (req.status >= 200 && req.status < 400) {
                // Appelle la fonction callback en lui passant la réponse de la requête
                this.listeStation = req.responseText;
                this.initMap();
            } else {
                console.error(req.status + " " + req.statusText + " " + url);
            }
        }.bind(this));
        req.addEventListener("error", function () {
            console.error("Erreur réseau avec l'URL " + url);
        });
        req.send(null);
    }

    addMarkers() {
        let station = JSON.parse(this.listeStation);

        let greenIcon = new L.icon({
            iconUrl: 'https://cdn.rawgit.com/pointhi/leaflet-color-markers/master/img/marker-icon-green.png',
            shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/0.7.7/images/marker-shadow.png',
        });

        let redIcon = new L.Icon({
            iconUrl: 'https://cdn.rawgit.com/pointhi/leaflet-color-markers/master/img/marker-icon-red.png',
            shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/0.7.7/images/marker-shadow.png',
        });

        let orangeIcon = new L.Icon({
            iconUrl: 'https://cdn.rawgit.com/pointhi/leaflet-color-markers/master/img/marker-icon-orange.png',
            shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/0.7.7/images/marker-shadow.png',
        });

        for (let i = 0; i < station.length; i++) {

            let customColor = greenIcon;

            if (station[i].status === "CLOSED")
                customColor = redIcon;
            else if (station[i].available_bikes === 0)
                customColor = orangeIcon;
            else if (station[i].status === "OPEN")
                customColor = greenIcon;

            let marker = L.marker([station[i].position.lat, station[i].position.lng], {
                    icon: customColor
                })
                .bindPopup(station[i].address)
                .on("click", function () {
                    document.getElementById("index").innerHTML = i;
                    document.getElementById("valeurTitreStation").innerHTML = station[i].name;
                    document.getElementById("valeurEtatStation").innerHTML = station[i].status;
                    document.getElementById("valeurAdresseStation").innerHTML = station[i].address;
                    document.getElementById("valeurPlaceStation").innerHTML = station[i].available_bike_stands;
                    document.getElementById("valeurVeloStation").innerHTML = station[i].available_bikes;
                    document.getElementById("infoStations").style.display = "flex"; // Affiche le panneau css au clic d'un marker
                    document.getElementById("bouton_envoi").style.display = "inline-block";
                    document.getElementById("erase").style.display = "inline-block";
                })
                .addTo(map);
        }
    }
}

var LeafletMap = new Map();
