import { Types } from "./configs";
import DrawnBlock from "./DrawnBlock";

class BonusBlock extends DrawnBlock
{
    constructor(x, y, width, height) {
        super(x, y, width, height);
        this.currentColorIndex = 0;
    }

    getTypeId() {
        return Types.BONUS;
    }

    draw(drawer) {
        drawer.drawBonusBlock(this);
    }

    getNextColor() {
        this.currentColorIndex++;
        this.currentColorIndex = this.currentColorIndex % 3;
        const colors = ["#FF5500", "#FF925B", "#FFB692"];
        return colors[this.currentColorIndex];
    }
}

export default BonusBlock;