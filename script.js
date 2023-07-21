const directions = {RIGHT: 0, BOTTOM: 1, LEFT: 2, TOP: 3};
let dir = directions.RIGHT;
const s = 30;
let width = 450, height = 450;

// Head = last element, tail = 0 element
let rand = function (min, max) {
    let k = Math.floor(Math.random() * (max - min) + min);
    return (Math.floor(k / s) * s);
}

let newApple = function () {
    return {x: rand(0, width - s), y: rand(0, height - s)};
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

let defineAction = function (snakeBody) {
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

    return action;
}

let checkApple = function (snakeBody, apple) {
    let temp = snakeBody.pop();
    // checking apple and snake positions
    if ((snakeBody[0].x === apple.x && snakeBody[0].y === apple.y)) {
        apple = newApple();
        snakeBody.unshift(temp);
    }

    return apple;
}
let moveAndCheck = function (snakeBody, action, apple) {
    let last = snakeBody.length - 1;
    debugger;
    snakeBody.forEach((el, index) => {
        if (el.x >= width) {
            el.x = 0;
        } else if (el.x < 0) {
            el.x = width;
        }
        if (el.y >= height) {
            el.y = 0;
        } else if (el.y < 0) {
            el.y = height;
        }
        // fix needed
        if (el.x === snakeBody[last].x && el.y === snakeBody[last].y && index !== last) {
            //gameEnd();
        }
    })
    // changing snake position
    snakeBody.unshift(action);
    apple = checkApple(snakeBody, apple);

    return apple;
}

let recalculate = function (gameField, snakeBody, apple) {
    if (snakeBody.length > 5) debugger;
    let action = defineAction(snakeBody);
    moveAndCheck(snakeBody, action, apple);
}

let drawApple = function (g, apple) {
    g.fillStyle = '#F00';
    g.fillRect(apple.x, apple.y, s, s);
}

let drawSnakePart = function (g, part) {
    g.fillRect(part.x, part.y, s, s);
}

let drawSnake = function (g, snakeBody) {
    g.fillStyle = '#000';
    snakeBody.forEach(el => drawSnakePart(g, el, width, height));
}
let redraw = function (g, gameField, snakeBody, apple) {
    g.clearRect(0, 0, width, height);
    drawApple(g, apple);
    drawSnake(g, snakeBody);
}

let gameStart = function (width = 450, height = 450, time = 100) {
    let gameField = document.getElementById('snake_game');
    this.width = width;
    this.height = height;
    gameField.style.border = '1px solid black';
    gameField.width = width;
    gameField.height = height;

    let snakeBody = newBody();
    let apple = newApple(gameField.width, gameField.height);
    let timeout = time;
    let s = 30;

    let g = gameField.getContext('2d');
    addEventListener('keydown', e => handleClick(e))

    setInterval(() => {
        recalculate(gameField, snakeBody, apple);
        redraw(g, gameField, snakeBody, apple);
    }, timeout);
}

let gameEnd = function () {
    alert('game is over!');
    //document.getElementById('snake_game').getParent.removeChild(document.getElementById('snake_game'));
}

gameStart();