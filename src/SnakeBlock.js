import { UP, DOWN, LEFT, RIGHT, step, Types } from './configs';
import DrawnBlock from './DrawnBlock';

class SnakeBlock extends DrawnBlock
{
    constructor(x, y, width, height, type) {
        super(x, y, width, height);
        this.type = type;
    }

    static createBodyBlock(x, y, w, h) {
        return new SnakeBlock(x, y, w, h, Types.SNAKE_BODY);
    }

    static createSnakeHead(x, y, w, h) {
        return new SnakeBlock(x, y, w, h, Types.SNAKE_HEAD);
    }

    getTypeId() {
        return this.type;
    }

    draw(drawer) {
        drawer.drawSnakeBlock(this);
    }

    calculateNewPosition(movement) {
        let newX = null, newY = null;
        switch(movement) {
            case UP:
                newY = this.y - step;
                break;
            case DOWN:
                newY = this.y + step;
                break;
            case RIGHT:
                newX = this.x + step;
                break;
            case LEFT:
                newX = this.x - step;
                break;
        }
        return [newX === null ? this.x : newX, newY === null ? this.y : newY];
    }

    move(movement) {
        let [newX, newY] = this.calculateNewPosition(movement);

        this.x = newX;
        this.y = newY;
    }

    copy(overwrite = {}) {
        return new SnakeBlock(this.x, this.y, this.width, this.height, overwrite.type || this.type);
    }
}

export default SnakeBlock