export class Grid {
    constructor(size) {
        this.size = size;
        this.grid = this.generateGrid();
    }

    generateGrid() {
        const grid = [];
        for (let i = 0; i < this.size; i++) {
            const row = [];
            for (let j = 0; j < this.size; j++) {
                row.push(Math.floor(Math.random() * 10) + 1); 
            }
            grid.push(row);
        }
        console.log(grid);
        
        return grid;
    }

    gridDOMClear(){
        const gridContainer = document.getElementById('grid');
        gridContainer.innerHTML = '';
        return gridContainer;
    }

    renderGameGrid() {
        const gridContainer = this.gridDOMClear(); 

        this.grid.forEach((row, rowIndex) => {
            const rowElement = document.createElement('div');
            rowElement.classList.add('row');
            row.forEach((chocolates, colIndex) => {
                const cell = document.createElement('div');
                cell.classList.add('cell');
                cell.dataset.row = rowIndex;
                cell.dataset.col = colIndex;
                cell.innerText = chocolates;

                const mark = document.createElement('div');
                mark.classList.add('mark');
                cell.appendChild(mark);
                rowElement.appendChild(cell);
            });
            gridContainer.appendChild(rowElement);
        });
    }
};
