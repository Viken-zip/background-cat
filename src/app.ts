import { collisionX, collisionY } from "./lib/collision";
import { cat, Murri, moveCat } from "./lib/cat"
import { collisionBlock, collisionBlocks, drawBlocks } from "./lib/blocks";
import { createBlocks } from "./lib/blocks";

const canvas = <HTMLCanvasElement> document.getElementById('canvas');
const ctx = canvas.getContext('2d')

canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

export type callback = (block: collisionBlock, cat: cat) => void;

createBlocks(canvas);

setInterval((): void=>{
    ctx?.clearRect(0, 0, canvas.width, canvas.height);
    moveCat();
    drawCat();
    drawBlocks(ctx);
}, 1000/60);

function drawCat(): void{
    ctx?.beginPath();
    ctx?.rect(
        Murri.posX,
        Murri.posY,
        Murri.w,
        Murri.h
    );
    ctx?.stroke();
}

