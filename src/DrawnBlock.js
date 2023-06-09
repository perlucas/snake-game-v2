class DrawnBlock
{
    constructor(x, y, width, height) {
        this.x = x;
        this.y = y;
        this.width = width;
        this.height = height;
    }

    getX() {
        return this.x;
    }

    setX(x) {
        this.x = x;
    }

    getY() {
        return this.y;
    }

    setY(y) {
        this.y = y;
    }

    getWidth() {
        return this.width;
    }

    setWidth(w) {
        this.width = w;
    }

    getHeight() {
        return this.height;
    }

    setHeight(h) {
        this.height = h;
    }

    getTypeId() {
        throw 'DrawnBlock is an abstract class, getTypeId should be implemented'
    }
}

export default DrawnBlock;