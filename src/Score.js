import DrawnBlock from "./DrawnBlock";

class Score extends DrawnBlock
{
    constructor(x, y, w, h) {
        super(x, y, w, h);
        this.score = 0;
    }

    addPoints(p) {
        this.score += p;
    }

    getPoints() {
        return this.score;
    }

    draw(drawer) {
        drawer.drawScore(this);
    }
}

export default Score;