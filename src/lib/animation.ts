export const MurriSprite = new Image();
MurriSprite.src = './sprites/big_murri_sprite.png';

const sizePerFrame: number = 100;

let row: number = 0;
let column: number = 0;

let frameSinceChange: number = 0;
let frameSinceMoved: number = 0;

let inAri: boolean = false;
let facingRight: boolean = true;

function updateImg(vx: number, vy: number){
    if(Math.abs(vx) > 0){
        row = facingRight ? 4 : 5;
        frameSinceMoved = 0;
    } else {
        //standing still
        frameSinceMoved++;
        if(frameSinceMoved >= 240){
            row = facingRight ? 0 : 1;
        } else {
            row = facingRight ? 2 : 3;
        }
    }

    if(Math.abs(vy) > 0){
        inAri = true;
        column = vy > 0 ? 7 : 4;
        row = facingRight ? 6 : 7;
    }else{
        inAri = false;
        
    }
}

export function updateAnimation(vx: number, vy: number){
    if(vx > 0){
        facingRight = true;
    } else if(vx < 0){
        facingRight = false;
    }

    // changes wich stage of the animation to play
    if(frameSinceChange/20 == 1){
        if(column < 7 && !inAri){
            column++;
        } else {
            column = 0;
        }
        //console.log(column);
        frameSinceChange = 0;
    }
    frameSinceChange++;
    updateImg(vx, vy);
}

export function getImage(){
    return [column*sizePerFrame, row*sizePerFrame, sizePerFrame];
}