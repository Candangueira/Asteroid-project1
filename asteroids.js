// // CLASSES //
class Player {
    //     // a better way to organize the arguments, so I dont need to rely on the position os the parameters, I can access them through the labels.
    constructor({ position, speed, lives, score }) {
        this.position = position;
        this.speed = speed;
        this.lives = lives;
        this.score = score;
    }
}

// // CACHED ELEMENTS //
const player = new Player({
    position: { x: 0, y: 0 },
    speed: { x: 0, y: 0 },
    lives: 3,
    score: 0,
});

let playerElement = document.querySelector('#player');

// --------- MOVES THE PLAYER --------------------------------

document.addEventListener('keypress', function (event) {
    let keyPressed = event.key;
    const velocity = 10;

    //  // --- UP --------------------------------------------
    if (keyPressed === 'w') {
        player.position.y -= velocity;
        playerElement.style.top = player.position.y + 'px';
        // console.log(keyPressed);

        // ---------------------------------------------------
        // --- LEFT ------------------------------------------
    } else if (keyPressed === 'a') {
        player.position.x -= velocity;
        playerElement.style.left = player.position.x + 'px';
        // console.log(keyPressed);

        // ---------------------------------------------------
        // --- DOWN ------------------------------------------
    } else if (keyPressed === 's') {
        player.position.y += velocity;
        playerElement.style.top = player.position.y + 'px';
        // console.log(keyPressed);

        // ---------------------------------------------------
        // --- RIGHT -----------------------------------------
    } else if (keyPressed === 'd') {
        player.position.x += velocity;
        playerElement.style.left = player.position.x + 'px';
        // console.log(keyPressed);
    }
});
// ----------------------------------------------------------

// FUNCTIONS //

function initialize() {
    playerElement.style.top = 400;
}

// INITIALIZE THE GAME

initialize();
