class CanvasObjet {
    constructor() { //Paramètres du canvas
        this.canvas = document.getElementById("canvas");
        this.ctx = this.canvas.getContext('2d');
        this.ctx.strokeStyle = '#000000';
        this.ctx.lineWidth = 3;
        this.draw = false;
        this.mousePosition = {
            x: 0,
            y: 0
        };
        this.lastPosition = this.mousePosition;
        this.clearButton = document.getElementById("erase");
        this.canvas.width = 290;
        this.canvas.height = 150;
        this.evenements();
    }

    //Gestion des événements 
    evenements() {
        var that = this;
        
         // Stop scrolling (touch)
        that.canvas.addEventListener("touchstart", function (e) {
             e.preventDefault();
        });
        
        that.canvas.addEventListener("touchmove", function (e) {
             e.preventDefault();
        });
        
        that.canvas.addEventListener("touchend", function (e) {
             e.preventDefault();
        });
        
        

        //Souris
        this.canvas.addEventListener("mousedown", function (e) {
            that.draw = true;
            that.lastPosition = that.getMposition(e);
        });

        this.canvas.addEventListener("mousemove", function (e) {
            that.mousePosition = that.getMposition(e);
            that.canvasResult()
        });

        document.addEventListener("mouseup", function (e) {
            that.draw = false;
        });

        // Touchpad
        this.canvas.addEventListener("touchstart", function (e) {
           that.mousePosition = that.getTposition(e);
            var touch = e.touches[0];
            var mouseEvent = new MouseEvent("mousedown", {
                clientX: touch.clientX,
                clientY: touch.clientY
            });
            that.canvas.dispatchEvent(mouseEvent);
        });

        this.canvas.addEventListener("touchmove", function (e) {
            var touch = e.touches[0];
            e.preventDefault();
            var mouseEvent = new MouseEvent("mousemove", {
                clientX: touch.clientX,
                clientY: touch.clientY
            });
            that.canvas.dispatchEvent(mouseEvent);
        });

        this.canvas.addEventListener("touchend", function (e) {
            var mouseEvent = new MouseEvent("mouseup", {});
            that.canvas.dispatchEvent(mouseEvent);
        });


        //Effacer
        this.clearButton.addEventListener("click", function (e) {
            that.clearCanvas()
        });
    }

    // Renvoie les coordonnées de la souris 
    getMposition(mouseEvent) {
        if (this.draw) {
            var oRect = this.canvas.getBoundingClientRect();
            return {
                x: mouseEvent.clientX - oRect.left,
                y: mouseEvent.clientY - oRect.top
            };
        }
    }

    // Renvoie les coordonnées du pad 
    getTposition(touchEvent) {
        var oRect = this.canvas.getBoundingClientRect();
        return {
            x: touchEvent.touches[0].clientX - oRect.left,
            y: touchEvent.touches[0].clientY - oRect.top
        };
    }

    // Dessin du canvas
    canvasResult() {
        if (this.draw) {
            this.ctx.beginPath();
            this.ctx.moveTo(this.lastPosition.x, this.lastPosition.y);
            this.ctx.lineTo(this.mousePosition.x, this.mousePosition.y);
            this.ctx.stroke();
            this.lastPosition = this.mousePosition;
        }
    };

    // Vide le dessin du canvas
    clearCanvas() {
        this.canvas.width = this.canvas.width;
        this.ctx.lineWidth = 3;
    }

}

var obj = new CanvasObjet();

