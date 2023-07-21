const directions = {RIGHT: 0, BOTTOM: 1, LEFT: 2, TOP: 3};
let dir = directions.RIGHT;
const s = 30;
let rand = function (min, max) {
    k = Math.floor(Math.random() * (max - min) + min);
    return (Math.floor(k / s) * s);
}

let newApple = function (fieldWidth, fieldHeight) {
    return { x: rand(0, fieldWidth - s), y: rand(0, fieldHeight - s)};
}


let newBody = function () {
    return [{x: 0, y: 0}];
}

let handleClick = function (e) {
    let key = e.keyCode;
    if ([37, 38, 39, 40].indexOf(key) >= 0) e.preventDefault();
    if (key === 37 && dir !== directions.RIGHT) {
        dir = directions.LEFT;
    }
     if (key === 38 && dir !== directions.BOTTOM) {
        dir = directions.TOP;
    }
     if (key === 39 && dir !== directions.LEFT) {
        dir = directions.RIGHT;
    }
     if (key === 40 && dir !== directions.TOP) {
        dir = directions.BOTTOM;
    }

}

let redraw = function (gameField, snakeBody, apple, timeout, s) {
    console.log('apple: ' + apple.x + '; ' + apple.y);
    let g = gameField.getContext('2d');
    addEventListener('keydown', e => handleClick(e))
    setInterval(() => {
        g.clearRect(0, 0, gameField.width, gameField.height);
        g.fillStyle = '#F00';
        g.fillRect(apple.x, apple.y, s, s);
        g.fillStyle = '#000';
        let last = snakeBody.length - 1;
        let action = {x: 0, y: 0};
        if (dir === directions.RIGHT) {
            action.x = snakeBody[0].x + s;
            action.y = snakeBody[0].y;
        } else if (dir === directions.BOTTOM) {
            action.x = snakeBody[0].x;
            action.y = snakeBody[0].y + s;
        } else if (dir === directions.LEFT) {
            action.x = snakeBody[0].x - s;
            action.y = snakeBody[0].y;
        } else if (dir === directions.TOP) {
            action.x = snakeBody[0].x;
            action.y = snakeBody[0].y - s;
        }
        // changing snake position
        snakeBody.unshift(action);
        // checking apple and snake positions
        if (!(snakeBody[0].x === apple.x && snakeBody[0].y === apple.y)) {
            snakeBody.pop();
        }
        if (snakeBody[0].x === apple.x && snakeBody[0].y === apple.y) {
            apple = newApple(gameField.width, gameField.height);
            g.fillStyle = '#F00';
            g.fillRect(apple.x, apple.y, s, s);
            g.fillStyle = '#000';
            console.log('apple: ' + apple.x + '; ' + apple.y);
        }

        snakeBody.forEach((el, index) => {
            if (el.x === snakeBody[last].x && el.y === snakeBody[last].y && index !== last) {
                console.log(el, snakeBody);

                gameEnd();
            }
            if (el.x >= gameField.width) {
                el.x = 0;
            } else if (el.x < 0) {
                el.x = gameField.width;
            }
            if (el.y >= gameField.height) {
                el.y = 0;
            } else if (el.y < 0) {
                el.y = gameField.height;
            }
            g.fillRect(el.x, el.y, s, s);
        })

    }, timeout);
}

let gameStart = function () {
    let gameField = document.getElementById('snake_game'),
        snakeBody = newBody();

    gameField.width = 450;
    gameField.height = 450;
    gameField.style.border = '1px solid black';
    let apple = newApple(gameField.width, gameField.height);
    let timeout = 100;
    let s = 30;
    redraw(gameField, snakeBody, apple, timeout, s);
}

let gameEnd = function () {
    document.getElementById('snake_game').style.visibility = 'hidden';
}

gameStart();