import { collisionX, collisionY } from "./lib/collision";
import { keys, keyStates } from "./lib/movement";

const canvas = <HTMLCanvasElement> document.getElementById('canvas');
const ctx = canvas.getContext('2d')

canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

let gravity: number = 1;
//let fallSpeed = 0;
const maxGravity: number = 20;

let onGround: boolean = false;

let vy: number = 0;
let vx: number = 0;

let collisionBlocks: collisionBlock[] = [];

export type callback = (block: collisionBlock) => void;

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

const Murri: cat = new cat(50, 50, 50, 50, 3);

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
        new collisionBlock(400, 10, 200, 5),
        new collisionBlock(200, 205, 5, 200),
        new collisionBlock(200, 10, 5, 200)
    ];
    console.log(collisionBlocks)
}
init();

setInterval((): void=>{
    ctx?.clearRect(0, 0, canvas.width, canvas.height);
    moveCat();
    drawCat();
    drawBlocks();
}, 1000/30);

function moveCat(): void{
    

    if( keyStates['d'] ){ vx += Murri.speed }
    if( keyStates['a'] ){ vx -= Murri.speed }

    //if( keyStates['s'] ){  }

    
    if( keyStates['w'] ){
        //Murri.posY -= Murri.speed 
        if(onGround){
            onGround = false;
            vy -= 10;
        }
    }

    if(gravity <= maxGravity && !onGround){
        vy += maxGravity/16;
    }

    
    
    
    Murri.posY += vy;
    Murri.posX += vx;
    vx = 0;

    collisionX(vx, Murri, collisionBlocks, collisionx);
    collisionY(vy, Murri, collisionBlocks, collisiony);
}

function collisiony(block: collisionBlock): void{
    onGround = true;
    Murri.posY = block.posY - Murri.h;
}

function collisionx(block: collisionBlock): void {
    
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