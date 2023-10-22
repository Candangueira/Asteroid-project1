// // CLASSES //
class Player {
    // a better way to organize the arguments, so I dont need to rely on the position os the parameters, I can access them through the labels.
    constructor({ position, velocity, acceleration, lives, score, gunbarrel }) {
        this.position = position;
        this.velocity = velocity;
        this.acceleration = acceleration;
        this.lives = lives;
        this.score = score;
        this.gunbarrel = gunbarrel;
    }
}
class Bullet {
    constructor({ angle }) {
        this.angle = angle;
    }
}
// // CACHED ELEMENTS //
let keys = [];
const player = new Player({
    position: { x: 800, y: 400 },
    velocity: { x: 4, y: 4 },
    acceleration: 1.08,
    lives: 3,
    score: 0,
});
let bullet = new Bullet({
    angle: player.position,
});
console.log(player);
let playerElement = document.querySelector('#player');

// --------- MOVES THE PLAYER --------------------------------
// ! BUG ! ( If you press 2 keys at the same time it doesnt move on diagonal )

document.addEventListener('keyup', function (event) {
    // resets the acceleration and velocity to default
    player.acceleration = 1.045;
    player.velocity.x = 4;
    player.velocity.y = 4;
    // --------------------------------------------------------------------
});

document.addEventListener('keydown', function (event) {
    let keyPressed = event.key;

    //  // --- UP --------------------------------------------
    if (keyPressed === 'w') {
        player.position.y -= player.velocity.y;
        playerElement.style.top = player.position.y + 'px';
        player.velocity.y *= player.acceleration; // acceleration

        // ---------------------------------------------------
        // --- LEFT ------------------------------------------
    } else if (keyPressed === 'a') {
        player.position.x -= player.velocity.x;
        playerElement.style.left = player.position.x + 'px';
        player.velocity.x *= player.acceleration; // acceleration

        // ---------------------------------------------------
        // --- DOWN ------------------------------------------
    } else if (keyPressed === 's') {
        player.position.y += player.velocity.y;
        playerElement.style.top = player.position.y + 'px';
        player.velocity.y *= player.acceleration; // acceleration

        // ---------------------------------------------------
        // --- RIGHT -----------------------------------------
    } else if (keyPressed === 'd') {
        player.position.x += player.velocity.x;
        playerElement.style.left = player.position.x + 'px';
        player.velocity.x *= player.acceleration; // acceleration
    }
});
// ----------------------------------------------------------

// ----- MOUSE FOLLOWING CURSOR -----------------------------
document.addEventListener('mousemove', function (event) {
    // calculates the angle based on the position of the cursor nad the position of the element //

    // ! I couldnt understand 100% what is going on here ! //
    // ! BUG ! (when you move the player and leave the cursor still, the element doesnt rotate)
    let angle = Math.atan2(
        event.clientX - player.position.x, // gets the coordinate x of the cursor and substracts from the x coordinate of the element.
        event.clientY - player.position.y // gets the coordinate y of the cursor and substracts from the y coordinate of the element.
    );
    let rotation = angle * (180 / Math.PI) * -1; // converts que value in degrees from 'angle' in radians and multiplies per -1 to invert the rotation orientation.
    playerElement.style.transform = 'rotate(' + rotation + 'deg)'; // applies the rotation in the element.
});

// FUNCTIONS //

function initialize() {
    playerElement.style.top = `${player.position.y}px`;
    playerElement.style.left = `${player.position.x}px`;
}

// INITIALIZE THE GAME

initialize();
