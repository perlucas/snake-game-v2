import { Types } from "./configs";

class GameDrawer
{
    constructor(canvasContext) {
        this.drawables = [];
        this.ctx = canvasContext;
    }

    registerDrawable(drawable) {
        this.drawables.push(drawable);
    }

    unregisterDrawable(drawable) {
        this.drawables = this.drawables.filter(d => d !== drawable);
    }

    drawAll() {
        for (const drawable of this.drawables) {
            drawable.draw(this);
        }
    }

    drawSnakeBlock(snakeBlock) {
        this.ctx.fillStyle = "#FF0000";
        this.ctx.fillRect(snakeBlock.getX(), snakeBlock.getY(), snakeBlock.getWidth(), snakeBlock.getHeight());
    }

    drawBackground(background) {
        this.ctx.fillStyle = background.getColor();
        this.ctx.fillRect(0, 0, background.getWidth(), background.getHeight());
    }

    drawBonusBlock(block) {
        this.ctx.fillStyle = block.getNextColor();
        this.ctx.fillRect(block.getX(), block.getY(), block.getWidth(), block.getHeight());
    }

    drawScore(score) {
        this.ctx.font = "15px serif";
        this.ctx.fillStyle = "#FF0000";
        this.ctx.fillText(score.getPoints() + "", score.getX(), score.getY());
    }
}

export default GameDrawer;