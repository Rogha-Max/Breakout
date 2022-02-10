// Création de la classe
// La classe hérite de PIXI.Graphics
import G from "./G.js";

export default class Ball extends PIXI.Graphics{
    constructor(radius = 15, color = 0xFFFF00, speed = 7, x = G.wST/2, y = G.hST/2, angle = 310) {
        //console.log("instance de Ball créée");

        // Invoque la super classe
        super();

        // Positionne la balle
        this.x = x;
        this.y = y;

        // Propriétés d'instance
        this.radius = radius;
        this.color = color;
        // Vitesse
        this.speed = speed;
        // Vecteur de déplacement
        const a = angle / 180 * Math.PI;
        this.vector = {x:Math.cos(a), y:Math.sin(a)}

        // Dessine la balle
        this._draw();
    }
    /** Pour dessiner la balle*/
    _draw(){
        this.beginFill(this.color);
        this.drawCircle(0, 0, this.radius);
    }
    move(){
        this.x += this.vector.x * this.speed;
        this.y += this.vector.y * this.speed;

        // Rebond sur les bords
        if (this.x <= this.radius || this.x >= G.wST - this.radius) this.vector.x *= -1;
        if (this.y <= this.radius || this.y >= G.hST - this.radius) this.vector.y *= -1;
    }

    /**
     * Getter pour retourner la ligne entre position actuelle et précédente
     * t et t-1
     */
    get line(){
        let currentX = this.x + this.vector.x * this.radius;
        let currentY = this.y + this.vector.y * this.radius;
        const previousX = this.x - this.vector.x * this.speed;
        const previousY = this.y - this.vector.y * this.speed;

        return [{x: currentX, y: currentY}, {x: previousX, y: previousY}];
    }

    /**
     * Fonction pour changer la direction de la balle
     * @param {*} direction : top, bottom, left ou right
     */
    changeDirection(direction){
        if (direction === G.FaceCollide.top || direction === G.FaceCollide.bottom) this.vector.y *= -1;
        if (direction === G.FaceCollide.left || direction === G.FaceCollide.right) this.vector.x *= -1;
    }
}