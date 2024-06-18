import { collisionX, collisionY } from "./lib/collision";
import { cat, Murri, moveCat, drawCat } from "./lib/cat"
import { collisionBlock, collisionBlocks, drawBlocks } from "./lib/blocks";
import { createBlocks } from "./lib/blocks";

const canvas = <HTMLCanvasElement> document.getElementById('canvas');
const ctx = canvas.getContext('2d');
let gameOn: boolean = false;

const canvasContainerDiv = <HTMLDivElement> document.getElementById('canvasContainer');
canvas.width = canvasContainerDiv.offsetWidth;
canvas.height = canvasContainerDiv.offsetHeight;

const gameCoverDiv = <HTMLDivElement> document.getElementById('gameCover');
gameCoverDiv.addEventListener('click', ()=>{
    gameCoverDiv.style.backgroundColor = 'rgba(0,0,0,0)';
    gameOn = true;
});

window.addEventListener('scroll', ()=>{
    gameCoverDiv.style.backgroundColor = 'rgba(0,0,0,0.6)';
    gameOn = false;
});

export type callback = (block: collisionBlock, cat: cat) => void;

function init(){
    createBlocks(canvas);
    moveCat();
    drawCat(ctx);
    drawBlocks(ctx);
}
init();

setInterval((): void=>{
    if(gameOn){
        ctx?.clearRect(0, 0, canvas.width, canvas.height);
        moveCat();
        drawCat(ctx);
        drawBlocks(ctx);
    }
}, 1000/60);



