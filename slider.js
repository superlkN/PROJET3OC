class Slider {
    constructor(i, time, timer, slide, playing, nextImg, prevImg, pause) {
        this.i = i;
        this.time = time;
        this.timer = timer;
        this.slide = slide;
        this.playing = playing;
        this.nextImg = document.getElementById("fleche-droite");
        this.prevImg = document.getElementById("fleche-gauche");
        this.pause = document.getElementById("bouton-pause");
        this.init();
    }

    init() {
        this.afficherSlide();
        this.imageSuivante();
        this.nextImg.addEventListener("click", this.imageSuivante.bind(this));
        this.prevImg.addEventListener("click", this.imagePrecedente.bind(this));
        this.register();
        this.pause.addEventListener("click", this.initPause);
    }

    afficherSlide() {
        this.slide[0] = {
            images: '/img/velo-lyon.jpg',
            texte: '<p class="text4">Dernière étape : Appuyez sur Valider ! :) </>'
        }
        this.slide[1] = {
            'images': '/img/velo-lyon2.jpg',
            'texte': '<p class="text1"> Première étape : Cliquez sur la station de votre choix </>'
            
        }
        this.slide[2] = {
            'images': '/img/velo-lyon3.jpg',
            'texte': '<p class="text2"> Deuxième étape : Rentrez votre Nom et prénom dans le formulaire et cliquez sur Réserver </>'
        }
        this.slide[3] = {
            'images': '/img/velo-lyon4.jpg',
            'texte': '<p class="text3"> Troisième étape : Veuillez signer le formulaire </>'
            
        }
    }

    imageSuivante() {
        this.i++;
        if (this.i >= this.slide.length) {
            this.i = 0;
        }

        document.getElementById("imgSlider").src = this.slide[this.i].images;
        document.getElementById("sliderText").innerHTML = this.slide[this.i].texte;

        clearTimeout(this.timer);
        this.timer = setTimeout(this.imageSuivante.bind(this), this.time);
    }

    imagePrecedente() {
        this.i--;
        if (this.i < 0) {
            this.i = this.slide.length - 1;
        }

        document.getElementById("imgSlider").src = this.slide[this.i].images;
        document.getElementById("sliderText").innerHTML = this.slide[this.i].texte;

        clearTimeout(this.timer);
        this.timer = setTimeout(this.imageSuivante.bind(this), this.time);
    }

    pauseSlider() {
        this.pause.innerHTML = "▶";
        this.playing = false;
        clearTimeout(this.timer);
    }

    playSlider() {
        this.pause.innerHTML = "❚❚";
        this.playing = true;
        this.timer = setTimeout(this.imageSuivante.bind(this), this.time);
    }

    initPause() {
        if (slider.playing) {
            slider.pauseSlider();
        } else {
            slider.playSlider();
        }
    }

    register() {
        var that = this;
        window.addEventListener("keydown", function (e) {
            return that.touchesBouton(e);
        });
    }

    touchesBouton(e) {
        switch (e.keyCode) {
            case 39:
                this.imageSuivante();
                break;
            case 37:
                this.imagePrecedente();
                break;
        }
    }
}

let slider = new Slider(0, 5000, "", [], true);
