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
// ! BUG ! ( If you press 2 keys at the same time it doesnt move on diagonal )
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

    console.log(rotation);
});

// FUNCTIONS //

function initialize() {
    // playerElement.style.top = 400;
}

// INITIALIZE THE GAME

initialize();
