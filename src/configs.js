export const canvas = document.getElementById('game');
export const context = canvas.getContext("2d");

export const canvasWidth = canvas.width;
export const canvasHeight = canvas.height;

export const step = 10;

export const [UP, DOWN, LEFT, RIGHT] = ['ArrowUp', 'ArrowDown', 'ArrowLeft', 'ArrowRight'];

export const Types = {
    GAME_EDGE: 'GAME_EDGE',
    SNAKE_BODY: 'SNAKE_BODY',
    SNAKE_HEAD: 'SNAKE_HEAD',
    BONUS: 'BONUS'
};