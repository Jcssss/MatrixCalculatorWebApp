class Matrix {
    #height = 0;
    #width = 0;
    #matrix = Array(0);

    constructor (height, width) {
        this.height = height;
        this.width = width;
        this.matrix = [...Array(height)].map(e => Array(width).fill(0));
    }
    get height () {
        return this.height;
    }
    get width () {
        return this.width;
    }
    set height (h) {
        this.height = h;
    }
    set width (w) {
        this.width = w;
    }
    getEntry (row, column) {
        return matrix[row][column];
    }
    setEntry (row, column, val) {
        matrix[row][column] = val;
    }
    print () {
        var result = '';
        result = this.matrix.map((arr) => (
            arr.map((item) => (
                item.toFixed(2)
                    .toString()
                    .padStart(7 - item.length())
                    .slice(-7)
            )).join(", ")
        )).join("\n");
    }
    static addMatrix (one, two) {
        return one.map((arr, i) => (
            arr.map((item, j) => (
                item + two.getEntry(i, j)
            ))
        ));
    }
    static subMatrix (one, two) {
        return one.map((arr, i) => (
            arr.map((item, j) => (
                item - two.getEntry(i, j)
            ))
        ));
    }
}