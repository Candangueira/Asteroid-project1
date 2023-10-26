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
    constructor({
        visible,
        elementRender,
        position,
        collision,
        speed,
        velocity,
    }) {
        this.visible = visible;
        this.elementRender = elementRender;
        this.position = position;
        this.velocity = velocity;
        this.collision = collision;
        this.speed = speed;
    }
}

class Asteorids {
    constructor({
        visible,
        size,
        position,
        collision,
        speed,
        velocity,
        asteroidElement,
    }) {
        this.visible = visible;
        this.size = size;
        this.position = position;
        this.velocity = velocity;
        this.collision = collision;
        this.speed = speed;
        this.asteroidElement = asteroidElement;
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
let acc = 1.04;
let asteroidsInterval = 2000;
let asteroidVel = {};
let gamerunning = true;

let keysPressed = {};
const keys = {};
const bullets = [];
const asteroids = [];

let playerElement = document.querySelector('#player');

const screen = document.querySelector('.container');
let asteroidElement = undefined;
const scoreElement = document.querySelector('#score');
const livesElement = document.querySelector('#lives');

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
//  // -----------------------------------------------------------
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
    // console.log(angleBullet);
    // console.log(Math.cos(angleBullet));
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

function shoot() {
    const bulletElement = document.createElement('div'); // creates the element
    let bullet = new Bullet({
        visible: true,
        elementRender: bulletElement,
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

    console.log(bullets);

    bulletElement.style.left = bullet.position.x + 'px'; // I dont know why, but if a dont put those 2 lines before and during the setInterval
    bulletElement.style.top = bullet.position.y + 'px'; // the bullet is first rendered in the top left corner of the screen.
    bulletElement.classList.add('bullet'); // adds a class
    bulletElement.style.transform = 'rotate(' + rotation + 'deg)';
    screen.appendChild(bulletElement); // render in the screen

    bullets.push(bullet); // pushes the class into the array

    setInterval(function () {
        bullet.position.x += bullet.velocity.x * bullet.speed;
        bullet.position.y += bullet.velocity.y * bullet.speed;
        bulletElement.style.left = bullet.position.x + 'px'; // renders the bullet in x position
        bulletElement.style.top = bullet.position.y + 'px'; // renders the bullet in y position
    }, 20);
}

function generateRandom(min, max) {
    // find diff
    let difference = max - min;

    // generate random number
    let rand = Math.random();

    // multiply with difference
    rand = Math.floor(rand * difference);

    // add with min value
    rand = rand + min;

    return rand;
}

function spawnAsteroid() {
    // --- CREATES THE CLASS AND PUT ON THE ARRAY ---------------------------------------------

    let asteroidElement = document.createElement('div'); // creates the element asteroid
    let rotationAsteroid = 0;
    let asteroidPosition = {
        x: 0,
        y: 0,
    };
    let visible = true;
    let randomNumber = Math.floor(Math.random() * 2);
    console.log(randomNumber);
    // randomizes from where the asteroids should come
    if (randomNumber === 0) {
        asteroidPosition = {
            x: Math.floor(Math.random() * 800),
            y: 0,
        };
        velocityAsteroid = {
            x: generateRandom(-3, 2),
            y: generateRandom(1, 7),
        };
    } else if (randomNumber === 1) {
        asteroidPosition = {
            x: 0,
            y: Math.floor(Math.random() * 400),
        };
        velocityAsteroid = {
            x: generateRandom(2, 7),
            y: generateRandom(-3, 2),
        };
    }
    const size = 50;
    let collision = false;
    const speed = 10;

    // ----------------------------------------------------------------

    let asteroid = new Asteorids({
        visible,
        position: asteroidPosition,
        size,
        collision,
        speed,
        velocity: velocityAsteroid,
        asteroidElement: asteroidElement,
    });

    // --- CREATES AND RENDER IT ON THE SCREEN -------------------------------------------------
    asteroids.push(asteroid);
    console.log(asteroid);

    asteroidElement.style.left = asteroid.position.x + 'px';
    asteroidElement.style.top = asteroid.position.y + 'px';
    asteroidElement.classList.add('asteroid'); // assign a class
    screen.appendChild(asteroidElement);

    // -----------------------------------------------------------------------------------------

    setInterval(() => {
        asteroid.position.x += asteroid.velocity.x;
        asteroid.position.y += asteroid.velocity.y;
        asteroidElement.style.left = asteroid.position.x + 'px';
        asteroidElement.style.top = asteroid.position.y + 'px';
        asteroidElement.style.transform =
            'rotate(' + rotationAsteroid++ + 'deg)';
    }, 20);
}

//-------------------------------------------------

function collisionDetection(collisorA, collisorB, size) {
    if (
        collisorA.position.x + size >= collisorB.position.x &&
        collisorA.position.x <= collisorB.position.x + size &&
        collisorA.position.y + size >= collisorB.position.y &&
        collisorA.position.y <= collisorB.position.y + size
    ) {
        return true;
    }
}

function restartGame() {
    initialize();
}

function initialize() {
    playerElement.style.top = `${player.position.y}px`;
    playerElement.style.left = `${player.position.x}px`;

    setInterval(() => {
        // Detects collision bullet / asteroid
        bullets.forEach((projectile) => {
            asteroids.forEach((rock) => {
                if (collisionDetection(projectile, rock, 50)) {
                    player.score += 1;
                    scoreElement.textContent = `score: ${player.score}`;
                    bulletIndex = bullets.indexOf(projectile);
                    asteroidIndex = asteroids.indexOf(rock);
                    // destroys the bullet and the asteroid in the array
                    projectile.elementRender.remove();
                    bullets.splice(bulletIndex, 1);
                    rock.asteroidElement.remove();
                    asteroids.splice(asteroidIndex, 1);
                }
            }, 20);
        });
        asteroids.forEach((asteroid) => {
            if (collisionDetection(player, asteroid, 30)) {
                if (player.lives > 0) {
                    player.lives -= 1;
                    livesElement.textContent = `lives: ${player.lives}`;
                    player.position.x = 800;
                    player.position.y = 400;
                    playerElement.style.top = `${player.position.y}px`;
                    playerElement.style.left = `${player.position.x}px`;
                    console.log('DEAD');
                } else {
                    gamerunning = false;
                    console.log('GAMEOVER');
                    // restartGame();
                }
            }
        });
    }, 10);

    setInterval(() => {
        spawnAsteroid();
    }, 3000);
}
// INITIALIZE THE GAME

initialize();
