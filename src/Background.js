class Background
{
    constructor(width, height, color) {
        this.height = height;
        this.width = width;
        this.color = color;
    }

    getHeight() {
        return this.height;
    }

    getWidth() {
        return this.width;
    }

    getColor() {
        return this.color;
    }

    draw(drawer) {
        drawer.drawBackground(this);
    }
}

export default Background;