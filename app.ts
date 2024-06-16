import { keys, keyStates } from "./lib/movement";

const canvas = <HTMLCanvasElement> document.getElementById('canvas');
const ctx = canvas.getContext('2d')

canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

let gravity = 1;
const maxGravity = 10;

const cat: { posX: number, posY: number, w: number, h: number, speed: number } = {
    posX: 50,
    posY: 50,
    w: 50,
    h: 50,
    speed: 3
}

setInterval((): void=>{
    ctx?.clearRect(0, 0, canvas.width, canvas.height);
    moveCat();
    drawCat();
}, 1000/60);

function moveCat(): void{
    if( keyStates['d'] ){ cat.posX += cat.speed }
    if( keyStates['a'] ){ cat.posX -= cat.speed }

    if( keyStates['s'] ){ cat.posY += cat.speed }
    if( keyStates['w'] ){ cat.posY -= cat.speed }

    cat.posY += gravity;
    if(gravity <= maxGravity){
        gravity += gravity/10;
    }
}

function drawCat(): void{
    ctx?.beginPath();
    ctx?.rect(
        cat.posX,
        cat.posY,
        cat.w,
        cat.h
    );
    ctx?.stroke();
}