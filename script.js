const directions = {RIGHT: 0, BOTTOM: 1, LEFT: 2, TOP: 3};
let dir = directions.RIGHT;
const s = 30;
let width = 450, height = 450;

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

let rand = function (min, max) {
    let k = Math.floor(Math.random() * (max - min) + min);
    return (Math.floor(k / s) * s);
}

class Snake {
    constructor() {
        this.coords = [{x: 0, y: 0}];
        this.head = this.coords[0];
        this.tail = this.coords[0];
    }
}

class Apple {
    constructor() {
        this.x = rand(0, width - s);
        this.y = rand(0, height - s);
    }
}

class Drawer {
    constructor(width, height) {
        this.width = width;
        this.height = height;
    }

    clear(g) {
        g.clearRect(0, 0, width, height);
    }
    draw = function (g, snakeCoords, apple) {
        g.clearRect(0, 0, width, height);
        g.fillStyle = '#F00';
        g.fillRect(apple.x, apple.y, s, s);
        g.fillStyle = '#000';
        snakeCoords.forEach(el => {
            g.fillRect(el.x, el.y, s, s);
        });
    }
}

class Game {
    constructor(width, height) {
        this.width = width;
        this.height = height;
    }

    checkApple(snake, apple) {
        return (snake.coords[0].x === apple.x && snake.coords[0].y === apple.y);
    }

    checkDeath(snake) {
        const checkCollision = (snake, head) => {
            return snake.coords.slice(1).some((c) => c.x === head.x && c.y === head.y);
        }

        return !!checkCollision(snake, snake.head);
    }

    moveSnake = function (snake, dir, field) {
        let action = {x: 0, y: 0};
        if (dir === directions.RIGHT) {
            action.x = snake.coords[0].x + s;
            action.y = snake.coords[0].y;
        } else if (dir === directions.BOTTOM) {
            action.x = snake.coords[0].x;
            action.y = snake.coords[0].y + s;
        } else if (dir === directions.LEFT) {
            action.x = snake.coords[0].x - s;
            action.y = snake.coords[0].y;
        } else if (dir === directions.TOP) {
            action.x = snake.coords[0].x;
            action.y = snake.coords[0].y - s;
        }

        if (action.x >= field.width)
            action.x = 0;
        if (action.y >= field.height)
            action.y = 0;
        if (action.x < 0)
            action.x = field.width - s;
        if (action.y < 0)
            action.y = field.height - s;

        snake.head = action;
        snake.coords.unshift(snake.head);
        snake.tail = snake.coords.pop();
        return snake.tail;
    }

    increaseSnake (snake, dir, field) {
        this.moveSnake(snake, dir, field);
        snake.coords.push(snake.tail);
    }

    start() {
        let gameField = document.getElementById('snake_game');
        if (gameField === null) {
            let wrapper = document.getElementById("wrapper");
            let canvas = document.createElement("canvas");
            let results = document.getElementById("results");
            wrapper.removeChild(results);
            canvas.id = "snake_game";
            wrapper.appendChild(canvas);
            gameField = canvas;
        }
        gameField.style.border = '1px solid black';
        gameField.width = width;
        gameField.height = height;

        let snake = new Snake();
        let apple = new Apple();
        let timeout = 100;
        let s = 30;

        let g = gameField.getContext('2d');
        addEventListener('keydown', e => handleClick(e));

        let drawer = new Drawer(this.width, this.height);
        drawer.clear(g);

        let gameInterval = setInterval(() => {
            if (this.checkDeath(snake))
                this.end(gameInterval, snake.coords.length);
            if (!this.checkApple(snake, apple))
                this.moveSnake(snake, dir, gameField);
            else {
                this.increaseSnake(snake, dir, gameField);
                apple = new Apple();
            }
            drawer.draw(g, snake.coords, apple);
        }, timeout);
    }

    end(gameInterval, snakeLength) {
        let canvas = document.getElementById('snake_game');
        let wrapper = document.getElementById("wrapper");
        let results = document.createElement("h2");
        let startButton = document.getElementById("start");
        startButton.style.visibility = "visible";
        results.textContent = "Your score is " + snakeLength + "!";
        results.id = "results";
        wrapper.removeChild(canvas);
        wrapper.appendChild(results);
        clearInterval(gameInterval);
    }
}

function start() {
    let game = new Game(450, 450);
    game.start();
    let startButton = document.getElementById("start");
    startButton.style.visibility = 'hidden';
}