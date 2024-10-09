import { Grid } from './grid.js';
import { Robot } from './robot.js';
import { AutoPlay } from './autoplay.js';

export class GamePlay{
    constructor(size){
        this.size = size;
        this.grid = new Grid(this.size);
        this.robot1 = new Robot(1, { row: 0, col: 0 },this.grid.grid[0][0]);
        this.robot2 = new Robot(2, { row: 0, col: size - 1 },this.grid.grid[0][size-1]);
        this.currRobot = this.robot1;
        this.autoMode = new AutoPlay();
        this.currPosition = "";
        this.initialiseGame();
    }


    addMark(pos,id){
        pos.classList.add("robot-mark");
        pos.innerHTML = id;
    }

    addActiveMark(){
        const activeRobot = document.querySelector(`.cell[data-row="${this.currRobot.position.row}"][data-col="${this.currRobot.position.col}"] > .mark`);  
        activeRobot.classList.add("robot-active");
    }

    removeMark(pos){
            pos.classList.remove("robot-mark");
            pos.classList.remove("robot-active");
            pos.innerHTML="";
    }


    initialiseGame(){
        const section1 = document.querySelector(".screen1");
        section1.style.display = "none";
        const section2 = document.querySelector(".screen2");
        section2.style.display = "block";

        this.grid.renderGameGrid();
        this.keyPressed = this.keyPressed.bind(this);
        this.runAutoMode = this.runAutoMode.bind(this);
        this.setEventListenersForKey();
        this.showStateAndControls();
        let robotPos;
        robotPos = document.querySelector(`.cell[data-row="${this.robot1.position.row}"][data-col="${this.robot1.position.col}"] > .mark`);  
        this.addMark(robotPos,1);
        robotPos = document.querySelector(`.cell[data-row="${this.robot2.position.row}"][data-col="${this.robot2.position.col}"] > .mark`);  
        this.addMark(robotPos,2);
        this.addActiveMark();
    }

    showRobotPath(robot, className) {
        robot.path.forEach(pos => {
            const cell = document.querySelector(`.cell[data-row="${pos.row}"][data-col="${pos.col}"]`);
            cell.classList.add(className);
        });
    }

    toggleRobot() {
        this.currPosition.classList.remove("robot-active");
        this.currRobot = this.currRobot === this.robot1 ? this.robot2 : this.robot1;
        this.addActiveMark();
    }

    moveRobot(direction) {
        
        const moved = this.currRobot.move(this.grid.grid, direction);
        if (moved) {
            this.removeMark(this.currPosition);
            this.showStateAndControls();
            const pos = document.querySelector(`.cell[data-row="${this.currRobot.position.row}"][data-col="${this.currRobot.position.col}"] > .mark`); 
            this.addMark(pos, this.currRobot.id);
            this.toggleRobot();
        }
    }

    keyPressed(event){
            this.currPosition = document.querySelector(`.cell[data-row="${this.currRobot.position.row}"][data-col="${this.currRobot.position.col}"] > .mark`); 
            if (event.key === 'Tab') {
                this.toggleRobot();
            } else if (event.key === 'ArrowDown') {
                this.moveRobot('down');
            } else if (event.key === 'ArrowLeft') {
                this.moveRobot('left');
            } else if (event.key === 'ArrowRight') {
                this.moveRobot('right');
            }
    }

    runAutoMode(){
        if (this.robot1.position.row != this.size - 1) {
            let obj = this.autoMode.findOptimalPath(this.grid.grid, this.robot1.position);
            this.robot1.path = [...this.robot1.path, ...obj.path];
            this.robot1.chocolatesCollected += obj.chocolates;
        }
        if (this.robot2.position.row != this.size - 1) {
            let obj = this.autoMode.findOptimalPath(this.grid.grid, this.robot2.position);
            this.robot2.path = [...this.robot2.path, ...obj.path];
            this.robot2.chocolatesCollected += obj.chocolates;
        }
        this.showStateAndControls();
        let robotPos;
        robotPos = document.querySelector(`.cell[data-row="${this.robot1.position.row}"][data-col="${this.robot1.position.col}"] > .mark`);
        this.removeMark(robotPos);
        this.robot1.position = { ...this.robot1.path[this.size - 1] };
        robotPos = document.querySelector(`.cell[data-row="${this.robot1.path[this.size - 1].row}"][data-col="${this.robot1.path[this.size - 1].col}"] > .mark`);
        this.addMark(robotPos, 1);
        robotPos = document.querySelector(`.cell[data-row="${this.robot2.position.row}"][data-col="${this.robot2.position.col}"] > .mark`);
        this.removeMark(robotPos);
        this.robot2.position = { ...this.robot2.path[this.size - 1] };
        robotPos = document.querySelector(`.cell[data-row="${this.robot2.path[this.size - 1].row}"][data-col="${this.robot2.path[this.size - 1].col}"] > .mark`);
        this.addMark(robotPos, 2);
    }

    setEventListenersForKey() {
        document.addEventListener('keydown', this.keyPressed);
        const autoplay = document.getElementById("autoPlay");
        autoplay.addEventListener('click', this.runAutoMode);
    }

    showStateAndControls(){
        document.getElementById('robot1-chocolates').innerText = `Robot 1 : ${this.robot1.chocolatesCollected}`;
        document.getElementById('robot2-chocolates').innerText = `Robot 2 : ${this.robot2.chocolatesCollected}`;

        this.showRobotPath(this.robot1, 'robot1-path');
        this.showRobotPath(this.robot2, 'robot2-path');
    }

    handleClick(event) {
        console.log(event);
    }

    cleanup() {
        document.removeEventListener('keydown',this.keyPressed);
        const autoplay = document.getElementById("autoPlay");
        autoplay.removeEventListener('click',this.runAutoMode);
    }

    clearDOM(){
        this.cleanup();
        this.grid.gridDOMClear();
        document.getElementById('robot1-chocolates').innerText = '';
        document.getElementById('robot2-chocolates').innerText = '';
    }

};