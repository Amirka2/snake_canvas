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
    }

    move = function (dir) {
        let action = {x: 0, y: 0};
        if (dir === directions.RIGHT) {
            action.x = this.coords[0].x + s;
            action.y = this.coords[0].y;
        } else if (dir === directions.BOTTOM) {
            action.x = this.coords[0].x;
            action.y = this.coords[0].y + s;
        } else if (dir === directions.LEFT) {
            action.x = this.coords[0].x - s;
            action.y = this.coords[0].y;
        } else if (dir === directions.TOP) {
            action.x = this.coords[0].x;
            action.y = this.coords[0].y - s;
        }

        this.coords.unshift(action);
        return this.coords.pop();
    }

    increase(dir) {
        let tail = this.move(dir);
        this.coords.unshift(tail);
    }

    iterate(dir, apple) {
        if (this.checkDeath())
            return false;
        if (!this.checkApple(apple))
            this.move(dir);
        else
            this.increase();
        return true;
    }

    checkApple(apple) {
        return (this.coords[0].x === apple.x && this.coords[0].y === apple.y);
    }

    checkDeath() {
        this.coords.forEach((coord) => {
            if (this.coords[0].x === coord.x && this.coords[0].y === coord.y) {
                return true;
            }
        })
        return false;
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

    start() {
        let gameField = document.getElementById('snake_game');
        gameField.style.border = '1px solid black';
        gameField.width = width;
        gameField.height = height;

        let snake = new Snake();
        let apple = new Apple();
        let timeout = 100;
        let s = 30;

        let g = gameField.getContext('2d');
        addEventListener('keydown', e => handleClick(e))

        let drawer = new Drawer(this.width, this.height);

        setInterval(() => {
            if (!snake.iterate(dir, apple))
                this.end();
            drawer.draw(g, snake.coords, apple);
        }, timeout);
    }

    end() {

    }
}

game = new Game(250, 450);
game.start();