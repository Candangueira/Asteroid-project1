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
    constructor({ visible, angle, position, collision, speed }) {
        this.visible = visible;
        this.angle = angle;
        this.position = position;
        this.collision = collision;
        this.speed = speed;
    }
}
// // CACHED ELEMENTS //
let posX = 800;
let posY = 400;
let velX = 5.5;
let velY = 5.5;
let rotation = 0;
let acc = 1.04;

let keysPressed = {}; // checks which keys are being pressed
const keys = {};

let playerElement = document.querySelector('#player');
const screen = document.querySelector('.container');

let player = new Player({
    position: { x: posX, y: posY },
    velocity: { x: velX, y: velY },
    acceleration: acc,
    lives: 3,
    score: 0,
});

console.log(player);

// --------- MOVES THE PLAYER --------------------------------
// ! BUG ! ( If you press 2 keys at the same time it doesnt move on diagonal )

document.addEventListener('keyup', function (event) {
    keysPressed[event.key] = false;

    // resets the acceleration and velocity to default
    player.velocity.y *= -player.acceleration;
    player.acceleration = acc;
    player.velocity.x = velX;
    player.velocity.y = velY;
    // --------------------------------------------------------------------
});

// ------------ LINES -------------------------------------------------
//  // --- UP --------------------------------------------
onkeydown = onkeyup = function (e) {
    e = e || event; // to deal with IE
    keys[e.code] = e.type == 'keydown';

    // --- UP ------------------------------------------
    if (keys['KeyW']) {
        player.position.y -= player.velocity.y;
        playerElement.style.top = player.position.y + 'px';
        // player.velocity.y *= player.acceleration; // acceleration

        // --- LEFT ------------------------------------------
    }
    if (keys['KeyA']) {
        player.position.x -= player.velocity.x;
        playerElement.style.left = player.position.x + 'px';
        // player.velocity.x *= player.acceleration; // acceleration

        // --- DOWN ------------------------------------------
    }
    if (keys['KeyS']) {
        player.position.y += player.velocity.y;
        playerElement.style.top = player.position.y + 'px';
        // player.velocity.y *= player.acceleration; // acceleration

        // --- RIGHT -----------------------------------------
    }
    if (keys['KeyD']) {
        player.position.x += player.velocity.x;
        playerElement.style.left = player.position.x + 'px';
        //player.velocity.x *= player.acceleration; // acceleration
    }
    // // --------------- DIAGONALS ---------------------------
    // --- NORTHWEST ------------------------------------------
    if (keys['KeyW'] && keys['KeyA']) {
        player.position.y -= player.velocity.y;
        playerElement.style.top = player.position.y + 'px';
        //player.velocity.y *= player.acceleration; // acceleration

        player.position.x -= player.velocity.x;
        playerElement.style.left = player.position.x + 'px';
        // player.velocity.x *= player.acceleration; // acceleration
    }

    // --- NORTHEAST ------------------------------------------
    if (keys['KeyW'] && keys['KeyD']) {
        player.position.y -= player.velocity.y;
        playerElement.style.top = player.position.y + 'px';
        // player.velocity.y *= player.acceleration; // acceleration

        player.position.x += player.velocity.x;
        playerElement.style.left = player.position.x + 'px';
        //player.velocity.x *= player.acceleration; // acceleration
    }
    // --- SOUTHEAST ------------------------------------------
    if (keys['KeyD'] && keys['KeyS']) {
        player.position.x += player.velocity.x;
        playerElement.style.left = player.position.x + 'px';
        //player.velocity.x *= player.acceleration; // acceleration

        player.position.y += player.velocity.y;
        playerElement.style.top = player.position.y + 'px';
        // player.velocity.y *= player.acceleration; // acceleration
    }
    // --- SOUTHWEST ------------------------------------------
    if (keys['KeyA'] && keys['KeyS']) {
        player.position.x -= player.velocity.x;
        playerElement.style.left = player.position.x + 'px';
        // player.velocity.x *= player.acceleration; // acceleration

        player.position.y += player.velocity.y;
        playerElement.style.top = player.position.y + 'px';
        // player.velocity.y *= player.acceleration; // acceleration
    }
};

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
    rotation = angle * (180 / Math.PI) * -1; // converts que value in degrees from 'angle' in radians and multiplies per -1 to invert the rotation orientation.
    playerElement.style.transform = 'rotate(' + rotation + 'deg)'; // applies the rotation in the element.
});

// ----- SHOT -----------------------------------------------
document.addEventListener('click', function (event) {
    shoot();
    console.log('click');
});
// FUNCTIONS // ----------------------------------------------

function initialize() {
    playerElement.style.top = `${player.position.y}px`;
    playerElement.style.left = `${player.position.x}px`;
    render();
    console.log(player.position.x);
    console.log(screen.clientWidth);
}

function render() {
    if (player.position.x >= screen.clientWidth) {
        player.position.x = 1700;
    }
}

function shoot() {
    let bullet = new Bullet({
        visible: true,
        angle: rotation,
        position: { x: player.position.x, y: player.position.y },
        speed: 5,
        collision: false,
    });

    const bulletElement = document.createElement('div'); // creates the element
    bulletElement.classList.add('bullet'); // adds a class
    screen.appendChild(bulletElement); // render in the screen

    bulletElement.style.left = player.position.x + 10 + 'px';
    bulletElement.style.top = player.position.y + -15 + 'px';

    bulletElement.style.transform = 'rotate(' + rotation + 'deg)';

    console.log(bullet.position.x);
}
// INITIALIZE THE GAME

initialize();

// console.log(player.position.x);
// console.log(screen.width);
