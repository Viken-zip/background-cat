/*
1: sit
2: idle stand
3: run
4: jump 3-4 upp, 5 mid, 6-7 down
*/
export const MurriSprite = new Image();
MurriSprite.src = './sprites/big_murri_sprite_sheet.png';

const sizePerFrame: number = 100;

let row: number = 0;
let column: number = 0;

let frameSinceChange = 0;
let frameSinceMoved = 0;

let inAri: boolean = false;

export function updateAnimation(vx: number, vy: number){
    if(frameSinceChange/20 == 1){
        if(column < 7){
            column++;
        } else {
            column = 0;
        }
        frameSinceChange = 0;
    }
    frameSinceChange++;

    if(Math.abs(vx) > 0){
        frameSinceMoved = 0;
        row = 2;
    }

    if(frameSinceMoved >= 240){
        row = 0;
    } else if(vx == 0) {
        row = 1;
    }
    frameSinceMoved++;

    if(vy < 0){
        //goes up
        row = 3;
        column = 5;
        if(vy < -5){
            row = 3;
            column = 4;
        }
        inAri = true;
    }else if(vy > 0){
        //goes down
        row = 3;
        column = 5;
        if(vy > 5){
            row = 3;
            column = 7;
            inAri = false;
        }
    }else if(vy == 0 && inAri){
        row = 3;
        column = 5;
    }
}

export function getImage(){
    return [column*sizePerFrame, row*sizePerFrame, sizePerFrame];
}