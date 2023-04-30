import { centerPoint } from './utils';
import SnakeBlock from './SnakeBlock';
import { Types } from './configs';

class Snake
{
    constructor() {
        const width = 10;
        const [x, y] = centerPoint(width, width);

        this.blocks = [
            SnakeBlock.createSnakeHead(x, y, width, width)
        ];
    }

    draw(drawer) {
        for (const block of this.blocks) {
            block.draw(drawer);
        }
    }

    registerCollisions(collisionManager) {
        const [snakeHead, ...snakeBodyBlocks] = this.blocks;
        collisionManager.registerMovableBlock(snakeHead);
        for (const block of snakeBodyBlocks) {
            collisionManager.registerCollidableBlock(block);
        }
    }

    move(movement) {
        if (!movement) return;

        const snakeHead = this.blocks[0];

        for (let i = this.blocks.length - 1; i > 0; i--) {
            this.blocks[i].setX( this.blocks[i - 1].getX());
            this.blocks[i].setY( this.blocks[i - 1].getY());
        }

        snakeHead.move(movement);
    }

    extend() {
        console.log(`Extending... current size is ${this.blocks.length}`)
        const newBlock = this.blocks[ this.blocks.length - 1 ].copy({type: Types.SNAKE_BODY});
        this.blocks.push(newBlock);
        return newBlock;
    }

    getHead() {
        return this.blocks[0]
    }
}

export default Snake