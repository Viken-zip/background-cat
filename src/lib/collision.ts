import { collisionBlock, cat, callback } from "../app";

export function collisionY(vy: number, cat: cat, blocks: collisionBlock[], collisionCallback: callback ){
    cat.posY += vy;
    blocks.forEach(block => {
        if( collide(cat, block) ){
            //cat.posY = block.posY - cat.h;

            cat.posY = vy < 0 ? block.posY + block.h : block.posY - cat.h;
            //vy = 0;
            
            collisionCallback(block, cat);
            
            //console.log(cat.posY)
            
            
        }
    });
}

export function collisionX(vx: number, cat: cat, blocks: collisionBlock[], collisionCallback: callback){
    cat.posX += vx;
    blocks.forEach(block => {
        if( collide(cat, block) ){
            
            //cat.posX = block.posX - cat.w;

            cat.posX = vx < 0 ? block.posX + block.w : block.posX - cat.w;

            vx = 0;
            collisionCallback(block, cat);

            /*const collisionOffset = cat.posX + cat.w / 2 < block.posX + block.w / 2
                ? cat.posX + cat.w - block.posX
                : cat.posX - (block.posX + block.w);
            cat.posX -= collisionOffset;*/
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