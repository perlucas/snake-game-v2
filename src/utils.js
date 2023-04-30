import { canvasHeight, canvasWidth, UP, DOWN, LEFT, RIGHT } from "./configs";

export const centerPoint = (width, height) => {
    const x = (canvasWidth - width)/2;
    const y = (canvasHeight - height)/2;
    return [x, y];
};

export const isArrow = keyCode => {
    return keyCode === UP ||
        keyCode === DOWN ||
        keyCode === LEFT ||
        keyCode === RIGHT;
};

export const rectIsVisible = (x, y, width, height) => {
    return x >= 0 &&
        y >= 0 &&
        x <= canvasWidth - width &&
        y <= canvasHeight - height;
};

