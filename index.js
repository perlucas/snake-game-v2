import Background from "./src/Background";
import { canvas, canvasHeight, canvasWidth, context, DOWN, LEFT, RIGHT, Types, UP } from './src/configs';
import { isArrow } from "./src/utils";
import Snake from "./src/Snake";
import GameDrawer from "./src/GameDrawer";
import CollisionManager from "./src/CollisionManager";
import GameEdge from "./src/GameEdge";
import BonusBlock from "./src/BonusBlock";
import Score from "./src/Score";
import { Proposal } from "./src/Proposal";

function isMobileDevice() {
    return window.visualViewport.width < 950
}

function clickEventToDirection(event, snakePosition) {
    const { width: screenWidth, height: screenHeight } = window.visualViewport

    const { clientX, clientY } = event

    const [snakeX, snakeY ] = snakePosition

    const currentX = (clientX / screenWidth) * canvasWidth
    const currentY = (clientY / screenHeight) * canvasHeight

    console.log(currentX, currentY, snakeX, snakeY)

    if (currentY >= snakeY + 30) {
        return DOWN
    }

    if (currentY <= snakeY - 30) {
        return UP
    }

    if (currentX < snakeX) {
        return LEFT
    }

    return RIGHT
}

const initialize = () => {
    let DRAWING_LOOP = null;
    let MOVING_LOOP = null;

    const score = new Score(10, 15, 300, 100);

    const background = new Background(canvasWidth, canvasHeight, '#FFFFFF');

    const snake = new Snake();

    // prepare all the drawables
    const drawer = new GameDrawer(context);
    drawer.registerDrawable(background);
    drawer.registerDrawable(snake);
    drawer.registerDrawable(score);

    // prepare game edges as collidables
    const collisionManager = new CollisionManager();
    const edges = [
        new GameEdge(0, -1, canvasWidth, 1),
        new GameEdge(-1, 0, 1, canvasHeight),
        new GameEdge(canvasWidth, 0, 1, canvasHeight),
        new GameEdge(0, canvasHeight + 1, canvasWidth, 1)
    ];
    for (const edge of edges) {
        collisionManager.registerCollidableBlock(edge);
    }

    snake.registerCollisions(collisionManager);

    const stopAnimations = () => {
        clearInterval(DRAWING_LOOP);
        clearInterval(MOVING_LOOP);
    }

    const endGame = () => {
        stopAnimations()
        alert(`Game ended! Your score was: ${score.getPoints()}`);
    };

    // register event handlers, stop game either when snake hits itself or hits an edge
    collisionManager.registerCollisionListener({ notifyCollision: endGame }, `COLLISION_${Types.SNAKE_HEAD}_${Types.GAME_EDGE}`);
    collisionManager.registerCollisionListener({ notifyCollision: endGame }, `COLLISION_${Types.SNAKE_HEAD}_${Types.SNAKE_BODY}`);

    // store current snake direction
    let direction = null;

    if (isMobileDevice()) {
        canvas.onclick = event => {
            // console.log(event.screenX, event.screenY, canvas.width)
            direction = clickEventToDirection(event, [snake.getHead().getX(), snake.getHead().getY()])
        }
    } else {
        document.onkeydown = (event) => {
            if (isArrow(event.key)) {
                direction = event.key;
            }
        };
    }

    const [drawRate, moveRate] = isMobileDevice()
        ? [80, 500]
        : [60, 200]

    // setup animations
    DRAWING_LOOP = setInterval(() => {
        drawer.drawAll();
    }, drawRate);

    MOVING_LOOP = setInterval(() => {
        snake.move(direction);
        collisionManager.detectCollisions();
    }, moveRate);

    // setup bonus after 5 secs.
    const bonus = new BonusBlock(0, 0, 10, 10);

    const setUpBonus = () => {
        const x = Math.floor(Math.random() * (canvasWidth - bonus.getWidth()));
        const y = Math.floor(Math.random() * (canvasHeight - bonus.getHeight()));
        bonus.setX(x);
        bonus.setY(y);
        
        drawer.registerDrawable(bonus);
        collisionManager.registerCollidableBlock(bonus)
    };

    setTimeout(setUpBonus, 5000);

    // setup new bonus after current gets hit by snake, also increment score
    collisionManager.registerCollisionListener({
        notifyCollision: () => {
            collisionManager.unregisterCollidableBlock(bonus);
            drawer.unregisterDrawable(bonus);

            score.addPoints(100);

            setTimeout(setUpBonus, 5000);

            const newBlock = snake.extend();
            collisionManager.registerCollidableBlock(newBlock);
        }
    }, `COLLISION_${Types.SNAKE_HEAD}_${Types.BONUS}`);


    // added for V2: if scores 500 points, then show up proposal
    const PROPOSAL_THRESHOLD = 500

    collisionManager.registerCollisionListener({
        notifyCollision: () => {

            if (score.getPoints() === PROPOSAL_THRESHOLD) {
                stopAnimations()
                new Proposal().initialize()
            }

        }
    }, `COLLISION_${Types.SNAKE_HEAD}_${Types.BONUS}`);

};

document.onload = initialize();