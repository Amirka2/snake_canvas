let rand = function(min, max) {
    let s = 30;
    k = Math.floor(Math.random() * (max - min) + min);
    return (Math.round(k / s) * s);
}

let newApple = function() {
    return [rand(0, innerWidth), rand(0, innerHeight)];
}

let newBody = function() {
    return [{x: 0, y: 0}];
}

const directions = { RIGHT: 0, BOTTOM: 1, LEFT: 2, TOP: 3};

let gameField = document.getElementById('snake_game'),
    g = gameField.getContext('2d'),
    snakeBody = newBody(),
    dir = directions.RIGHT,
    apple = newApple();


gameField.width = innerWidth;
gameField.height = innerHeight;
gameField.style.border = '1px solid black';
let redraw = function(timeout, s) {
    setInterval(() => {
        g.clearRect(0, 0, gameField.width, gameField.height);
        g.fillStyle = '#F00';
        g.fillRect(...apple, s, s);
        g.fillStyle = '#000';
        snakeBody.forEach((el, index) => {
            if (apple[0] + s >= gameField.width || apple[1] + s >= gameField.height) {
                apple = newApple();
            }
            let last = snakeBody.length - 1;
            if (el.x === snakeBody[last].x && el.y === snakeBody[last].y && index !== last) {
                gameEnd();
            }
        })
        g.fillRect(snakeBody[0].x, snakeBody[0].y, s, s);
        console.log('redrawing')
    }, timeout);
}

let gameStart = function() {
    let timeout = 60;
    let s = 30;
    redraw(timeout, s);
}

let gameEnd = function() {
    document.getElementById('snake_game').style.visibility = 'hidden';
}

gameStart();