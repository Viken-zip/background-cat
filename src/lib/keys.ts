export const keys: string[] = ['a', 'w', 'd', 's'];
export const keyStates: { [key: string]: boolean } = {};
keys.forEach(key => {
    keyStates[key] = false;
});

window.addEventListener('keydown', (e: KeyboardEvent): void =>{
    keys.forEach(key => {
        if(e.key === key){
            keyStates[key] = true;
        }
    });
});

window.addEventListener('keyup', (e: KeyboardEvent): void =>{
    keys.forEach(key => {
        if(e.key === key){
            keyStates[key] = false;
        }
    });
});