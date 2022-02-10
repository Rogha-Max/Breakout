// ///////////////////////////////////////////////////////////////
// IMPORTS
//import Ball from "./Ball.js";
import Pad from "./Pad.js";
import G from "./G.js";
import Ball from "./Ball.js";
import Brick from "./Brick.js";

// ///////////////////////////////////////////////////////////////
// APPLICATION PIXI
const app = new PIXI.Application({
    width: G.wST,
    height: G.hST,
    backgroundColor: 0x333333,
    antialias: true
});
// Ajoute la vue de l'application PIXI au body
document.body.appendChild(app.view);

// ///////////////////////////////////////////////////////////////
// GAME ASSETS
let b = new Ball();
let p = new Pad();
app.stage.addChild(b, p);
/*let br1 = new Brick(G.wST/4);
let br2 = new Brick();
let br3 = new Brick(G.wST-G.wST/4);
app.stage.addChild(br1, br2, br3);*/
let bricks = createBricks(18);

function createBricks(nbBricks) {
    let tBricks = [];
    for (let i = 0; i < nbBricks; i++) {
        if (i < 6) tBricks.push(new Brick(G.wST/7 + (G.wST/7) * (i%6)));
        else if (i < 12) tBricks.push(new Brick(G.wST/7 + (G.wST/7) * (i%6), G.hST/8 + G.hST/10, 0x00FFEE));
        else tBricks.push(new Brick(G.wST/7 + (G.wST/7) * (i%6), G.hST/8 + G.hST/10 * 2, 0xFFEEDD));
        app.stage.addChild(tBricks[i]);
    }
    return tBricks;
}


// ///////////////////////////////////////////////////////////////
// EVENTS
window.addEventListener('keydown', (e) => {
    if (e.keyCode === 37){ //flèche gauche
        p.direction = -1;
    }
    else if (e.keyCode === 39){ //flèche droite
        p.direction = 1;
    }
})
window.addEventListener('keyup', (e) => {
    if (e.keyCode === 37){ //flèche gauche
        p.direction = 0;
    }
    else if (e.keyCode === 39){ //flèche droite
        p.direction = 0;
    }
})
// ///////////////////////////////////////////////////////////////
// GAME
let rAF;
function gameloop() {
    // Rappel de la fonction gameloop
    rAF = requestAnimationFrame(gameloop);
    p.move();
    b.move();

    // COLLISIONS /////////////////////////////////////////////////////////
    for (let i = 0; i < bricks.length; i++) {
        if (G.collide(b, bricks[i])){
            // Determine la face entrée en collision
            const faceCollide = G.faceCollide(b.line, bricks[i]);
            if (faceCollide !== false) {
                b.changeDirection(faceCollide);
                app.stage.removeChild(bricks[i]);
                bricks.splice(i, 1);
            }
        }
    }
    if (G.collide(b, p)){
        // Determine la face entrée en collision
        const faceCollide = G.faceCollide(b.line, p);
        if (faceCollide !== false) b.changeDirection(faceCollide);
    }

    // Arrêt de la gameloop
    if (bricks.length === 0) cancelAnimationFrame(rAF);
}
// on lance la gameloop
gameloop();