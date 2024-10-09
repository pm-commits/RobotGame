import "./styles.css";

import { GamePlay } from './gamePlay.js';

document.addEventListener('DOMContentLoaded', () => {
    const go = document.getElementById("go");
    const input = document.getElementById("size");

    let size = 0;
    let game;
    go.addEventListener('click',()=>{
        size = input.value;
        const error = document.querySelector(".error");
        if (!size) {
            error.innerHTML = "Provide size";
        }
        else {
            error.innerHTML = "";
            game = new GamePlay(size);
        }

    });
    const reset = document.getElementById("reset");
    reset.addEventListener('click', () => {
        game.clearDOM();
        game = null;
        game = new GamePlay(size);
    });

    
});
