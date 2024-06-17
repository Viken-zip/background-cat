import { collisionX, collisionY } from "./lib/collision";
import { keys, keyStates } from "./lib/movement";

const canvas = <HTMLCanvasElement> document.getElementById('canvas');
const ctx = canvas.getContext('2d')

canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

let gravity: number = 1;
//let fallSpeed: number = 0;
const maxGravity: number = 20;
const maxSpeed: number = 10;

let onGround: boolean = false;

let vy: number = 0;
let vx: number = 0;

let collisionBlocks: collisionBlock[] = [];

export type callback = (block: collisionBlock, cat: cat) => void;

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

export class cat {
    posX: number;
    posY: number; 
    w: number;
    h: number;
    speed: number;

    constructor(posY: number, posX: number, w: number, h: number, speed: number){
        this.posY = posY;
        this.posX = posX;
        this.w = w;
        this.h = h;
        this.speed = speed;
    }
}

const Murri: cat = new cat(50, 50, 50, 50, 1);

/*
const cat: { posX: number, posY: number, w: number, h: number, speed: number } = {
    posX: 50,
    posY: 50,
    w: 50,
    h: 50,
    speed: 3
}
*/
function init(): void{
    collisionBlocks = [
        new collisionBlock(canvas.height - 10, 0, canvas.width, 10),
        new collisionBlock(0, -10, 10, canvas.height),
        new collisionBlock(0, canvas.width, 10, canvas.height)
    ];
    console.log(collisionBlocks)
}
init();

setInterval((): void=>{
    ctx?.clearRect(0, 0, canvas.width, canvas.height);
    moveCat();
    drawCat();
    drawBlocks();
}, 1000/60);

function moveCat(): void{
    

    if( keyStates['d'] ){ if(vx < maxSpeed){vx += Murri.speed / 6} }
    else{
        vx = vx > 0.01 ? vx / 1.2 : vx;
    }

    if( keyStates['a'] ){ if(vx > -maxSpeed){vx -= Murri.speed / 6} }
    else{
        vx = vx < -0.01 ? vx / 1.2 : vx;
    }
    
    if(vx < 0.01 && vx > -0.01){ vx = 0 }
    
    if( keyStates['w'] ){
        if(onGround){
            onGround = false;
            vy -= 25;
        }
    }

    if(gravity <= maxGravity){
        vy += maxGravity/16;
    }

    collisionX(vx, Murri, collisionBlocks, collisionx);
    collisionY(vy, Murri, collisionBlocks, collisiony);

    //console.log(vx);
}

function collisiony(block: collisionBlock, cat: cat): void{
    if(block.posY > cat.posY){
        onGround = true;
    }
    vy = 0;
}

function collisionx(block: collisionBlock, cat: cat): void {
    vx = 0;
}

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

function drawBlocks(): void{
    collisionBlocks.forEach(block => {
        ctx?.fillRect(
            block.posX, 
            block.posY,
            block.w,
            block.h
        );
    });
}