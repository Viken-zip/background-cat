import { callback } from "../app";
import { cat } from "./cat";
import { collisionBlock } from "./blocks";

export function collisionY(vy: number, cat: cat, blocks: collisionBlock[], collisionCallback: callback){
    cat.posY += vy;
    blocks.forEach(block => {
        if( collide(cat, block) ){
            cat.posY = vy < 0 ? block.posY + block.h : block.posY - cat.h;
            collisionCallback(block, cat);
        }
    });
}

export function collisionX(vx: number, cat: cat, blocks: collisionBlock[], collisionCallback: callback){
    cat.posX += vx;
    blocks.forEach(block => {
        if( collide(cat, block) ){
            cat.posX = vx < 0 ? block.posX + block.w : block.posX - cat.w;
            collisionCallback(block, cat);
        }
    });
}

function collide(cat: cat, block: collisionBlock): boolean{
    return(
        cat.posX < block.posX + block.w &&
        cat.posX + cat.w > block.posX &&
        cat.posY < block.posY + block.h &&
        cat.posY + cat.h > block.posY
    );
}