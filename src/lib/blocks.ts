export let collisionBlocks: collisionBlock[] = [];

export class collisionBlock { 
    posX: number;
    posY: number; 
    w: number;
    h: number;

    constructor(posY: number, posX: number, w: number, h: number){
        this.posY = posY;
        this.posX = posX;
        this.w = w;
        this.h = h;
    }
}

export function createBlocks(canvas: HTMLCanvasElement): void{
    collisionBlocks = [
        new collisionBlock(canvas.height - 10, 0, canvas.width, 10),
        new collisionBlock(0, -10, 10, canvas.height),
        new collisionBlock(0, canvas.width, 10, canvas.height)
    ];
    console.log(collisionBlocks)
}

export function drawBlocks(ctx: any): void{
    collisionBlocks.forEach(block => {
        ctx?.fillRect(
            block.posX, 
            block.posY,
            block.w,
            block.h
        );
    });
}