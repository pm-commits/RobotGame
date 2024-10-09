export class AutoPlay {
    findOptimalPath(grid, startPosition) {
        const N = grid.length;
        let totalChocolates = 0;
        if (N==1) return {path: startPosition, chocolates: totalChocolates};
        const dp = Array(N).fill(0).map(() => Array(N).fill(0));

        dp[startPosition.row][startPosition.col] = grid[startPosition.row][startPosition.col];
        dp[N-1] = [...grid[N-1]];
        for (let row = N-2; row >= startPosition.row; row--) {
            for (let col = 0; col < N; col++) {
                const chocolates = grid[row][col];
                dp[row][col] = chocolates + Math.max(
                    col > 0 ? dp[row + 1][col - 1] : 0,  
                    dp[row + 1][col],                  
                    col < N - 1 ? dp[row + 1][col + 1] : 0 
                );
            }
        }
       

        const path = [];
        let col = startPosition.col;
        for (let row = startPosition.row; row < N; row++) {
            console.log({ row, col });
            if (col > 0 && row < N-1 && dp[row + 1][col - 1] === dp[row][col] - grid[row][col]) {
                col--;
            } else if (col < N - 1 && row < N-1 && dp[row + 1][col + 1] === dp[row][col] - grid[row][col]) {
                col++;
            }
            if (row<N-1){
            path.push({ row: row+1, col });
            totalChocolates += grid[row + 1][col];
            }
        }

        return {path, chocolates: totalChocolates};
    }
}
