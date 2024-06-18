import { keys, keyStates } from "./keys"
import { collisionBlock, collisionBlocks } from "./blocks";
import { collisionX, collisionY } from "./collision";

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

let gravity: number = 1;
//let fallSpeed: number = 0;
const maxGravity: number = 20;
const maxSpeed: number = 10;

let onGround: boolean = false;

let vy: number = 0;
let vx: number = 0;

export const Murri: cat = new cat(50, 50, 50, 50, 1);

export function drawCat(ctx: any): void{
    ctx?.beginPath();
    ctx?.rect(
        Murri.posX,
        Murri.posY,
        Murri.w,
        Murri.h
    );
    ctx?.stroke();
}

export function moveCat(): void{
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