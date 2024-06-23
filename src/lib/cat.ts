import { keys, keyStates } from "./keys"
import { collisionBlock, collisionBlocks } from "./blocks";
import { collisionX, collisionY } from "./collision";
import { MurriSprite, getImage, updateAnimation } from "./animation";

/** @type {CanvasRenderingContext2D} */
/*const MurriSprite = new Image(); 
const LeftMurriSprite = new Image();
MurriSprite.src = './sprites/big_murri_sprite.png';
const spriteImgSize = 20*5;
let idleTime = 0;
let spriteRow = 0;

let frame = 0;
let sitFrame = 0;*/

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

export const Murri: cat = new cat(50, 50, 100, 100, 1);

export function drawCat(ctx: any): void{
    /*ctx?.beginPath();
    ctx?.rect(
        Murri.posX,
        Murri.posY,
        Murri.w,
        Murri.h
    );
    ctx?.stroke();*/
    const Values = getImage();
    ctx?.drawImage(
        MurriSprite,
        Values[0],
        Values[1],
        Values[2],
        Values[2],
        Murri.posX,
        Murri.posY,
        Murri.w,
        Murri.h
    );


    /*if(idleTime >= 60*15){
        spriteRow = 0;
    } else {
        spriteRow = 1;
    }
    ctx?.drawImage(
        MurriSprite,
        sitFrame*spriteImgSize,
        spriteRow*spriteImgSize,
        spriteImgSize,
        spriteImgSize,
        Murri.posX,
        Murri.posY,
        Murri.w,
        Murri.h
    );

    if(frame/20 == 1){
        console.log(sitFrame*20)
        console.log(frame)
        frame = 0;
        if(sitFrame < 7){
            sitFrame++;
        } else {
            sitFrame = 0;
        }
    }
    frame++;
    idleTime++;*/
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

    /*if(vx > 0 || vx < 0 || vy > 0 || vy < 0){
        idleTime = 0;
    }*/

    if(gravity <= maxGravity){
        vy += maxGravity/16;
    }

    collisionX(vx, Murri, collisionBlocks, collisionx);
    collisionY(vy, Murri, collisionBlocks, collisiony);

    //console.log(vx);
    updateAnimation(vx, vy);
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