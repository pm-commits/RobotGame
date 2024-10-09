export class Robot {
    constructor(id, position, chocolates) {
        this.id = id; 
        this.position = position; 
        this.chocolatesCollected = chocolates;
        this.path = [position]; 
    }

    move(grid, direction) {
        let { row, col } = this.position;

        switch (direction) {
            case 'down':
                row += 1;
                break;
            case 'left':
                row += 1;
                col -= 1;
                break;
            case 'right':
                row += 1;
                col += 1;
                break;
        }

        if (row >= 0 && row < grid.length && col >= 0 && col < grid[0].length) {
            this.position = { row, col };
            this.chocolatesCollected += grid[row][col];
            this.path.push({ row, col });
            return true;
        }
        return false; 
    }

};
