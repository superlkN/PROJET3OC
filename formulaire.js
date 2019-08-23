class Formulaire {
    constructor() {
        this.boutonReservation = document.getElementById("reserver");
        this.formElt = document.querySelector("form");
        this.champNom = document.getElementById("nom");
        this.champPrenom = document.getElementById("prenom");
        this.canvasElt = document.getElementById("canvasDiv");
        this.canvas = document.getElementById("canvas");
        this.textVeloV = document.getElementById("velovText");
        this.boutonRetour = document.getElementById("retour");
        this.boutonEnvoi = document.getElementById("bouton_envoi");
        this.boutonEffacer = document.getElementById("erase");

        this.afficheCanvas();
    }

    afficheCanvas() {
        var that = this;
        that.boutonReservation.onclick = function () {
            that.textVeloV.style.display = "none";
            that.canvasElt.style.display = "block";
            that.boutonRetour.style.display = "inline-block";
            that.boutonReservation.style.display = "none";
            


            if (that.champNom.value.length == 0 || that.champPrenom.value.length == 0) {
                //  that.textVeloV.style.display = "block";
                that.boutonReservation.style.display = "block";
                that.boutonRetour.style.display = "none";
                alert("Veuillez renseigner tous les champs");
            }
        };

        that.boutonRetour.onclick = function () {
            that.canvasElt.style.display = "none";
            that.boutonRetour.style.display = "none";
            that.boutonReservation.style.display = "block";
            that.textVeloV.style.display = "block";
        };

        that.canvas.onclick = function () {
            that.boutonEnvoi.style.display = "inline-block";
            that.boutonRetour.style.display = "inline-block";
            that.boutonEffacer.style.display = "inline-block";
        }
    }
}


let form = new Formulaire();
