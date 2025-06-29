'use strict';

import { Util } from './Util.js';

const solvingSpeed = {
    SLOW: 80,
    AVERAGE: 35,
    FAST: 1,
    FASTEST: 0
};

class SudokuSolver {
    constructor(sudoku, renderCellFunc) {
        this.sudoku = sudoku;
        this.renderCell = renderCellFunc;
        this.speed = solvingSpeed.FAST;
        this.isSolveCanceled = false;
        this.wasCanceled = false;
        this.isBeingSolved = false;
    }

    setSudoku(sudoku) {
        this.sudoku = sudoku;
    }

    setSolvingSpeed(speed) {
        this.speed = speed;
    }

    async solve() {
        if (!this.isSolveCanceled) {
            const empty = this.sudoku.findNextEmpty();
            if (!empty) {
                this.wasCanceled = false;
                this.isBeingSolved = false;
                return true;
            } else {
                this.isBeingSolved = true;
                let [row, col] = empty;

                for (let possibleNum = 1; possibleNum <= 9; possibleNum++) {
                    if (this.sudoku.isNumberValid(row, col, possibleNum)) {
                        this.sudoku.board[row][col] = possibleNum;

                        this.renderCell(`cell-${row}-${col}`, possibleNum);
                        await Util.sleep(this.speed);

                        if (await this.solve()) {
                            return true;
                        }

                        this.sudoku.board[row][col] = 0;
                        this.renderCell(`cell-${row}-${col}`, '');
                    }
                }
                return false;
            }
        }
        this.isSolveCanceled = false;
        this.wasCanceled = true;
        this.isBeingSolved = false;
        return true;
    }

    cancelSolve() {
        if (this.isBeingSolved) {
            this.isSolveCanceled = true;
        }
    }
}

export { SudokuSolver, solvingSpeed };
