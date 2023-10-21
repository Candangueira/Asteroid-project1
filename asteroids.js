// CLASSES //
class Player {
    // a better way to organize the arguments, so I dont need to rely on the position os the parameters, I can access them through the labels.
    constructor({ position, speed, lives, score }) {
        this.position = position;
        this.speed = speed;
        this.lives = lives;
        this.score = score;
    }
}

// CACHED ELEMENTS //
const player = new Player({
    position: { x: 0, y: 0 },
    speed: { x: 0, y: 0 },
    lives: 3,
    score: 0,
});

// MOVES THE PLAYER //

document.addEventListener('keydown', function (event) {
    let keyPressed = event.key;
    if (keyPressed === 'w') {
        console.log(keyPressed);
    } else if (keyPressed === 'a') {
        console.log(keyPressed);
    } else if (keyPressed === 's') {
        console.log(keyPressed);
    } else if (keyPressed === 'd') {
        console.log(keyPressed);
    }

    // console.log(event.key);
});
