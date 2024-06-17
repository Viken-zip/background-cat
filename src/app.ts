import { collisionX, collisionY } from "./lib/collision";
import { keys, keyStates } from "./lib/movement";

const canvas = <HTMLCanvasElement> document.getElementById('canvas');
const ctx = canvas.getContext('2d')

canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

let gravity: number = 1;
//let fallSpeed: number = 0;
const maxGravity: number = 20;
const maxSpeed: number = 6;

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
        new collisionBlock(200, 100, 110, 5),
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
}, 1000/60);

function moveCat(): void{
    

    if( keyStates['d'] ){ if(vx < maxSpeed){vx += Murri.speed} }
    else{
        vx = vx > 0.01 ? vx / 2 : vx;
    }

    if( keyStates['a'] ){ if(vx > -maxSpeed){vx -= Murri.speed} }
    else{
        vx = vx < -0.01 ? vx / 2 : vx;
    }
    
    if(vx < 0.01 && vx > -0.01){ vx = 0 }

    //if( keyStates['s'] ){  }
   

    
    if( keyStates['w'] ){
        //Murri.posY -= Murri.speed 
        if(onGround){
            onGround = false;
            vy -= 25;
        }
    }

    if(gravity <= maxGravity && !onGround){
        vy += maxGravity/16;
        //console.log('gravity');
    }
    
    /*Murri.posY += vy;
    Murri.posX += vx;
    vx = 0;*/

    collisionX(vx, Murri, collisionBlocks, collisionx);
    collisionY(vy, Murri, collisionBlocks, collisiony);
    //vy = onGround ? 0 : vy;
    //console.log(onGround);
    //console.log(vy);
    //console.log(vx)
}

function collisiony(block: collisionBlock, cat: cat): void{
    if(block.posY > cat.posY){
        onGround = true;
        vy = 0;
    } else {
        vy = 0;
    }
        
    console.log('collision Y');
}

function collisionx(block: collisionBlock, cat: cat): void {
    /*console.log(`
        collision X 
        ${Murri.posY + Murri.h}
        ${block.posY}
    `);*/
    vx = 0;
    console.log('collision X');
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