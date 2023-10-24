// // CLASSES //
class Player {
    // a better way to organize the arguments, so I dont need to rely on the position os the parameters, I can access them through the labels.
    constructor({ position, velocity, lives, score }) {
        this.position = position;
        this.velocity = velocity;
        this.lives = lives;
        this.score = score;
    }
}
class Bullet {
    constructor({ visible, angle, position, collision, speed, velocity }) {
        this.visible = visible;

        this.position = position;
        this.velocity = velocity;
        this.collision = collision;
        this.speed = speed;
    }
}

class Asteorids {
    constructor({ visible, size, position, collision, speed, velocity }) {
        this.visible = visible;
        this.size = size;
        this.position = position;
        this.velocity = velocity;
        this.collision = collision;
        this.speed = speed;
    }
}
// // CACHED ELEMENTS //
let posX = 800;
let posY = 400;
let velX = 5.5;
let velY = 5.5;
let bulletVel = {};
let mouseX = 0;
let mouseY = 0;
let angle = 0;
let rotation = 0;
let rotationBullet = 0;
let acc = 1.04;
let asteroidsInterval = 2000;

let keysPressed = {};
const keys = {};
const bullets = [];
const asteroids = [];

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
    checkPlayerLimits();

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
    // ! BUG ! (when you move the player and leave the cursor still, the element doesnt rotate)
    angle = Math.atan2(
        event.clientX - player.position.x, // gets the coordinate x of the cursor and substracts from the x coordinate of the element.
        event.clientY - player.position.y // gets the coordinate y of the cursor and substracts from the y coordinate of the element.
    );
    rotation = angle * (180 / Math.PI) * -1; // converts que value in radians from 'angle' to degrees and multiplies per -1 to invert the rotation orientation.
    playerElement.style.transform = 'rotate(' + rotation + 'deg)'; // applies the rotation in the element.
});

// ----- SHOT -----------------------------------------------
document.addEventListener('click', function (event) {
    const angleBullet = Math.atan2(
        event.clientY - player.position.y,
        event.clientX - player.position.x
    );
    bulletVel = {
        x: Math.cos(angleBullet),
        y: Math.sin(angleBullet),
    };
    shoot();
});

// FUNCTIONS // ----------------------------------------------

function checkPlayerLimits() {
    if (player.position.x >= 1760) {
        player.position.x = 1760;
    }
    if (player.position.x <= 0) {
        player.position.x = 0;
    }
    if (player.position.y <= 0) {
        player.position.y = 0;
    }
    if (player.position.y >= 770) {
        player.position.y = 770;
    }
}
function initialize() {
    playerElement.style.top = `${player.position.y}px`;
    playerElement.style.left = `${player.position.x}px`;
    spawnAsteroids();
}

function shoot() {
    let bullet = new Bullet({
        visible: true,
        angle: 0,
        position: {
            x: player.position.x,
            y: player.position.y,
        },
        velocity: {
            x: bulletVel.x,
            y: bulletVel.y,
        },
        speed: 10,
        collision: false,
    });

    bullets.push(bullet);
    console.log(bullets);

    const bulletElement = document.createElement('div'); // creates the element
    bulletElement.classList.add('bullet'); // adds a class
    bulletElement.style.transform = 'rotate(' + rotation + 'deg)';

    setInterval(function () {
        screen.appendChild(bulletElement); // render in the screen
        bullet.position.x += bullet.velocity.x * bullet.speed;
        bullet.position.y += bullet.velocity.y * bullet.speed;
        bulletElement.style.transform = 'rotateBullet(' + rotation + 'deg)';
        bulletElement.style.left = bullet.position.x + 'px'; // renders the bullet in x position
        bulletElement.style.top = bullet.position.y + 'px'; // renders the bullet in y position
    }, 20);

    if (!bullet.visible) {
        bullet.pop();
    }
}
function spawnAsteroids() {
    setInterval(() => {
        visible = true;
        asteroidPosition = {
            x: 100,
            y: 100,
        };
        const size = 50;
        let collision = false;
        const speed = 10;
        const velocityAsteroid = {
            x: 1,
            y: 1,
        };
        asteroids.push(
            new Asteorids({
                visible,
                size,
                asteroidPosition,
                collision,
                speed,
                velocityAsteroid,
            })
        );
        const asteroidElement = document.createElement('div');
        asteroidElement.classList.add('asteroid');
        screen.appendChild(asteroidElement);
        asteroidElement.style.left = asteroidPosition.x + 'px'; // renders the bullet in x position
        asteroidElement.style.top = asteroidPosition.y + 'px'; // renders the bullet in y position
        console.log('ASTEROIDS');
    }, asteroidsInterval);
}

// INITIALIZE THE GAME

initialize();

// console.log(player.position.x);
// console.log(screen.width);
