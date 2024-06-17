import { collisionBlock, cat, callback } from "../app";

export function collisionY(vy: number, cat: cat, blocks: collisionBlock[], collisionCallback: callback ){
    blocks.forEach(block => {
        let catAfterVelocity: cat = cat;
        catAfterVelocity.posY += vy;
        if( collide(cat, block) || collide(catAfterVelocity, block) ){
            cat.posY = block.posY - cat.h;
            vy = 0;
            collisionCallback(block);
        }
    });
}

export function collisionX(vx: number, cat: cat, blocks: collisionBlock[], collisionCallback: callback){
    blocks.forEach(block => {
        let catAfterVelocity: cat = cat;
        catAfterVelocity.posX += vx;
        if( collide(cat, block) || collide(catAfterVelocity, block) ){
            vx = 0;
            cat.posX = block.posX + cat.w;
            collisionCallback(block);
        }
    });
}

function collide(cat: cat, block: collisionBlock): boolean{
    if(
        cat.posX < block.posX + block.w &&
        cat.posX + cat.w > block.posX &&
        cat.posY < block.posY + block.h &&
        cat.posY + cat.h > block.posY
    ){
        return true;
    }
    return false;
}