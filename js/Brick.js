// Création de la classe
// La classe hérite de PIXI.Graphics
import G from "./G.js";

export default class Brick extends PIXI.Graphics{
    constructor(x, y = G.hST/8, color = 0x0000FF, h = 45, w = 100) {
        //console.log("instance de Brick créée");

        // Invoque la super classe
        super();

        // Dimension de la brique
        this.h = h;
        this.w = w;
        // Positionne la brique
        this.x = x;
        this.y = y;

        // Propriétés d'instance
        this.color = color;

        // Dessine la brique
        this._draw();
    }

    /** Pour dessiner une brique */
    _draw(){
        this.beginFill(this.color);
        this.drawRect(this.w * -.5, this.h * -.5, this.w, this.h);
    }
}