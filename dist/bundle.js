(()=>{"use strict";var o,e,i,t,s,n={340:(o,e)=>{Object.defineProperty(e,"__esModule",{value:!0}),e.drawBlocks=e.createBlocks=e.collisionBlock=e.collisionBlocks=void 0,e.collisionBlocks=[];var i=function(o,e,i,t){this.posY=o,this.posX=e,this.w=i,this.h=t};e.collisionBlock=i,e.createBlocks=function(o){e.collisionBlocks=[new i(o.height-10,0,o.width,10),new i(0,-10,10,o.height),new i(0,o.width,10,o.height)],console.log(e.collisionBlocks)},e.drawBlocks=function(o){e.collisionBlocks.forEach((function(e){null==o||o.fillRect(e.posX,e.posY,e.w,e.h)}))}},324:(o,e,i)=>{Object.defineProperty(e,"__esModule",{value:!0}),e.moveCat=e.Murri=e.cat=void 0;var t=i(74),s=i(340),n=i(988),c=function(o,e,i,t,s){this.posY=o,this.posX=e,this.w=i,this.h=t,this.speed=s};e.cat=c;var l=!1,r=0,u=0;function a(o,e){o.posY>e.posY&&(l=!0),r=0}function h(o,e){u=0}e.Murri=new c(50,50,50,50,1),e.moveCat=function(){t.keyStates.d?u<10&&(u+=e.Murri.speed/6):u=u>.01?u/1.2:u,t.keyStates.a?u>-10&&(u-=e.Murri.speed/6):u=u<-.01?u/1.2:u,u<.01&&u>-.01&&(u=0),t.keyStates.w&&l&&(l=!1,r-=25),r+=1.25,(0,n.collisionX)(u,e.Murri,s.collisionBlocks,h),(0,n.collisionY)(r,e.Murri,s.collisionBlocks,a)}},988:(o,e)=>{function i(o,e){return o.posX<e.posX+e.w&&o.posX+o.w>e.posX&&o.posY<e.posY+e.h&&o.posY+o.h>e.posY}Object.defineProperty(e,"__esModule",{value:!0}),e.collisionX=e.collisionY=void 0,e.collisionY=function(o,e,t,s){e.posY+=o,t.forEach((function(t){i(e,t)&&(e.posY=o<0?t.posY+t.h:t.posY-e.h,s(t,e))}))},e.collisionX=function(o,e,t,s){e.posX+=o,t.forEach((function(t){i(e,t)&&(e.posX=o<0?t.posX+t.w:t.posX-e.w,s(t,e))}))}},74:(o,e)=>{Object.defineProperty(e,"__esModule",{value:!0}),e.keyStates=e.keys=void 0,e.keys=["a","w","d","s"],e.keyStates={},e.keys.forEach((function(o){e.keyStates[o]=!1})),window.addEventListener("keydown",(function(o){e.keys.forEach((function(i){o.key===i&&(e.keyStates[i]=!0)}))})),window.addEventListener("keyup",(function(o){e.keys.forEach((function(i){o.key===i&&(e.keyStates[i]=!1)}))}))}},c={};function l(o){var e=c[o];if(void 0!==e)return e.exports;var i=c[o]={exports:{}};return n[o](i,i.exports,l),i.exports}o=l(324),e=l(340),i=l(340),t=document.getElementById("canvas"),s=t.getContext("2d"),t.width=window.innerWidth,t.height=window.innerHeight,(0,i.createBlocks)(t),setInterval((function(){null==s||s.clearRect(0,0,t.width,t.height),(0,o.moveCat)(),null==s||s.beginPath(),null==s||s.rect(o.Murri.posX,o.Murri.posY,o.Murri.w,o.Murri.h),null==s||s.stroke(),(0,e.drawBlocks)(s)}),1e3/60)})();