'use strict';

import { Sudoku } from './Sudoku.js';
import _ from 'lodash';

class SudokuGenerator {
    constructor() {
        this.sudoku = new Sudoku();
    }

    solve() {
        let empty = this.sudoku.findNextEmpty();
        if (!empty) {
            return true;
        } else {
            let [row, col] = empty;
            let possibleNums = [1, 2, 3, 4, 5, 6, 7, 8, 9];
            possibleNums = _.shuffle(possibleNums);

            for (const possibleNum of possibleNums) {
                if (this.sudoku.isNumberValid(row, col, possibleNum)) {
                    this.sudoku.board[row][col] = possibleNum;

                    if (this.solve()) {
                        return true;
                    }

                    this.sudoku.board[row][col] = 0;
                }
            }
            return false;
        }
    }

    generateSudoku() {
        this.solve();
        let emptyCells = Math.floor(Math.random() * 14) + 51;
        let cellPositions = [];

        for (let i = 0; i < this.sudoku.board.length; i++) {
            for (let j = 0; j < this.sudoku.board.length; j++) {
                cellPositions.push([i, j]);
            }
        }

        cellPositions = _.shuffle(cellPositions).slice(0, emptyCells);

        for (let i = 0; i < emptyCells; i++) {
            let [row, col] = cellPositions[i];
            this.sudoku.board[row][col] = 0;
        }

        return this.sudoku;
    }
}

export { SudokuGenerator };
