class Reservation {
    constructor() {
        this.secs = 1200;
        this.mydivTimer = document.getElementById("timer");
        this.launchCount = false;
        this.boutonEnvoi = document.getElementById("bouton_envoi");
        this.champNom = document.getElementById("nom");
        this.champPrenom = document.getElementById("prenom");
        this.divReservation = document.getElementById("reservation");
        this.boutonEffacer = document.getElementById("erase");
        this.boutonRetour = document.getElementById("retour");
        this.boutonCancel = document.getElementById("cancel");
        this.boutonReservation = document.getElementById("reserver");
        this.maStation = document.getElementById("maStation");
        this.infoStations = document.getElementById("infoStations");
        this.infoReservation = document.getElementById("infoReservation");
        this.textVeloV = document.getElementById("velovText");
        this.canvas = document.getElementById("canvas");
        this.lancementTimer = "";

        this.storage();
        this.timerOnLoad();

    }

    count() {
        var that = this;

        var mins = Math.floor(this.secs / 60);

        var remsec = this.secs % 60;

        mins %= 60;
        this.secs -= 1

        if (mins < 10) {
            mins = "0" + mins;
        }

        if (remsec < 10) {
            remsec = "0" + remsec;
        }

        if (this.secs < 0) {
            clearInterval(this.lancementTimer);
            that.mydivTimer.style.visibility = "hidden";
            that.maStation.style.visibility = "visible";
           
        }
    

        if (this.launchCount === false) {
            this.launchCount = true;
            this.lancementTimer = setInterval(this.count.bind(this), 1000);
        } 
       
        
        sessionStorage.setItem("mins", mins);
        sessionStorage.setItem("remsec", remsec);
        sessionStorage.setItem("secs", that.secs);
        
        this.mydivTimer.textContent = "Vélo réservé à la station " + sessionStorage.valeurTitreStation + " pour une durée de " + sessionStorage.mins + ":" + sessionStorage.remsec + " par " + that.champNom.value + " " + that.champPrenom.value + ".";
    }

    storage() {
        let that = this;

        that.champNom.value = localStorage.getItem("nom");
        that.champPrenom.value = localStorage.getItem("prenom");

        this.boutonEnvoi.onclick = function () {
            
            that.boutonEnvoi.style.display = "none";
            that.boutonEffacer.style.display = "none";
            
            that.boutonRetour.style.display = "none";
            that.canvas.style.display = "block";
            that.textVeloV.style.display = "none";
            that.mydivTimer.style.visibility = "visible";
            that.maStation.style.visibility = "hidden";
            

            let storageNom = localStorage.setItem("nom", that.champNom.value);
            let storagePrenom = localStorage.setItem("prenom", that.champPrenom.value);

            let index = document.getElementById("index").innerHTML;
            var stations = JSON.parse(LeafletMap.listeStation);

            sessionStorage.setItem("valeurTitreStation", stations[index].name);
            sessionStorage.setItem("valeurEtatStation", stations[index].status);
            sessionStorage.setItem("valeurAdresseStation", stations[index].address);
            sessionStorage.setItem("valeurPlaceStation", stations[index].available_bike_stands);
            sessionStorage.setItem("valeurVeloStation", stations[index].available_bikes);
            
            if (sessionStorage.secs <= -1) {
                that.lancementTimer = setInterval(that.count.bind(that), 1000);
            } 

            that.secs = 1200;
            that.count();
        }  
    }
    
    timerOnLoad() {
        var that = this;
        window.addEventListener("load", function () {
            if (sessionStorage.secs < 1200 ) {
                that.launchCount = true;
                that.mydivTimer.style.visibility = "visible";
                that.mydivTimer.style.display = "block";
                
                that.lancementTimer = setInterval(that.count.bind(that), 1000);
                that.secs = sessionStorage.secs;
            }
        }); 
    } 
}

let reservation = new Reservation();