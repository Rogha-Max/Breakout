// Création de la classe
// La classe hérite de PIXI.Graphics
import G from "./G.js";

export default class Pad extends PIXI.Graphics{
    constructor(w = 100, h = 20, color = 0xFF0000, speed = 15, x = G.wST / 2, y = G.hST - h) {
        //console.log("instance du Pad créée")

        // Invoque la super classe
        super();

        // Propriétés d'instance
        this.color = color;
        // dimensions
        this.w = w;
        this.h = h;
        // position
        this.x = x;
        this.y = y;

        // Déplacement
        this.speed = speed;
        this._direction = 0;

        // Dessine le pad
        this._draw()
    }

    /** Pour dessiner le pad*/
    _draw(){
        this.beginFill(this.color);
        this.drawRect(this.w * -.5, this.h * -.5, this.w, this.h);
    }

    move(){
        this.x = Math.max(this.w * .5 + this.h / 2, Math.min(G.wST - this.w * .5 - this.h / 2, this.x + this.speed * this._direction));
    }

    get direction(){
        return this._direction;
    }
    set direction(value){
        if (value < -1 || value > 1) console.warn("ATTENTION valeur incorrecte");
        this._direction = Math.max(-1, Math.min(1, value));
    }
}
