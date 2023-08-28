class Matrix {
    #height = 0;
    #width = 0;
    #matrix = Array(0);

    constructor (width, height) {
        this.#height = height;
        this.#width = width;

        // initialize matrix
        for (var i = 0; i < height; i++) {
            this.#matrix.push([]);
            for (var j = 0; j < width; j++) {
                this.#matrix[i].push(0);
            }
        }
    }
    
    get height () {
        return this.#height;
    }
    
    get width () {
        return this.#width;
    }
    
    get matrix () {
        return this.#matrix;
    }

    set height (h) {
        this.#height = h;
    }
    
    set width (w) {
        this.#width = w;
    }
    
    getEntry (row, column) {
        if (row < 0 || row >= this.#height) {
            return -1;
        } else if (column < 0 || column >= this.#width) {
            return -1;
        }

        return this.#matrix[row][column];
    }

    setEntry (row, column, val) {
        this.#matrix[row][column] = val;
    }

    print () {
        var result = '';
        result = this.#matrix.map((arr) => (
            arr.map((item) => (
                Number(item).toFixed(2)
                    .toString()
                    .padStart(7 - item.toString().length)
                    .slice(-7)
            )).join(", ")
        )).join("\n");

        console.log(result);
    }

    static addMatrix (one, two) {
        return one.map((_, i) => (
            one[0].map((_, j) => (
                one.getEntry(i, j) + two.getEntry(i, j)
            ))
        ));
    }

    static subMatrix (one, two) {
        return one.map((_, i) => (
            one[0].map((_, j) => (
                one.getEntry(i, j) - two.getEntry(i, j)
            ))
        ));
    }

    static mulMatrix (one, two) {
        return one.map((_, i) => (
            one[0].map((_, j) => (
                one[0].reduce((sum, _, k) => (
                    sum + one.getEntry(i, k) * two.getEntry(k, j)
                ))
            ))
        ));
    }

    subtractRow (rowOne, rowTwo, multiplier) {
        for (var column=0; column < this.#width; column++) {
            var newEntry = this.getEntry(rowTwo, column) - multiplier * this.getEntry(rowOne, column);
            this.setEntry(rowTwo, column, newEntry);
        }
    }

    multiplyRow (row, multiplier) {
        for (var column=0; column < this.#width; column++) {
            var newEntry = multiplier * this.getEntry(row, column);
            this.setEntry(row, column, newEntry);
        }
    }

    swapRows (rowOne, rowTwo) {
        var temp;

        for (var column=0; column < this.#width; column++) {
            temp = this.getEntry(rowOne, column);
            this.setEntry(rowOne, column, this.getEntry(rowTwo, column));
            this.setEntry(rowTwo, column, temp);
        }
    }

    firstRowEntry (row) {
        for (var column=0; column < this.#width; column++) {
            if (this.getEntry(row, column) != 0) {
                return column;
            }
        }

        return -1;
    }

    lastColumnEntry (column) {
        for (var row=this.#height-1; column > -1; row--) {
            if (this.getEntry(row, column) != 0) {
                return row;
            }
        }

        return -1;
    }

    firstColumnEntry (column) {
        for (var row=0; column < this.#height; row++) {
            if (this.getEntry(row, column) != 0) {
                return row;
            }
        }

        return -1;
    }

    isRowForm () {
        var lastIndex = -1;

        for (var i = this.#height -1; i > -1; i--) {
            var index = this.firstRowEntry(i);
            if (index == -1 && lastIndex != -1) {
                return false;
            } else if (index >= lastIndex && lastIndex != -1) {
                return false;
            }

            lastIndex = index;
        }

        return true;
    }

    findRowForm () {
        var pivotRow = 0;
        var pivotColumn = 0;
        var rowTwo = 0;
        var divisor = 0;

        while (!this.isRowForm()) {
            rowTwo = this.lastColumnEntry(pivotColumn);

            if (!(rowTwo == -1 || rowTwo < pivotRow)) {

                console.log(pivotRow + ":" + pivotColumn + ":" + rowTwo);
                this.swapRows(pivotRow, rowTwo);
                this.multiplyRow(pivotRow, 1/this.getEntry(pivotRow, pivotColumn));
            
                for (var i = pivotRow + 1; i < this.#height; i++) {
                    divisor = this.getEntry(i, pivotColumn);

                    if (!(divisor == 0)) {
                        this.subtractRow(pivotRow, i, divisor);
                    }
                }

                pivotRow += 1;
            }
            pivotColumn += 1;
        }
    }

    reduceRowForm () {

        var col = 0;
        var val = 0;
        var mult = 0;

        for (var i = this.#height - 1; i > -1; i--) {
            
            col = this.firstRowEntry(i);
            val = this.getEntry(i, col);

            console.log(this.matrix);
            if (val != 0 && val != -1) {
                for (var j = 0; j < i; j++) {
                    mult = this.getEntry(j, col) / val;
                    this.subtractRow(i, j, mult);
                }
            }

            mult = 1 / this.getEntry(i, col);
            this.multiplyRow(i, mult);
        }

        for (i = 0; i < this.#height; i++) {
            for (j = 0; j < this.#width; j++) {
                this.setEntry(i, j, this.getEntry(i, j).toFixed(2));
            }
        }
    }
}

export default Matrix;