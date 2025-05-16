
/**
 * @param {number} matrixSide
 * @param {number[][]} buildings
 * @return {number}
 */
var countCoveredBuildings = function (matrixSide, buildings) {
    this.rows = new Array(matrixSide + 1);
    this.columns = new Array(matrixSide + 1);
    fillMinMaxBuildingPosition(matrixSide, buildings);

    return findNumberOfCoveredBuildings(buildings);
};

class MinMaxBuildingPosition {

    static #RANGE_OF_POSITIONS = [1, Math.pow(10, 5)];

    constructor() {
        this.min = MinMaxBuildingPosition.#RANGE_OF_POSITIONS[1];
        this.max = MinMaxBuildingPosition.#RANGE_OF_POSITIONS[0];
    }
}

/**
 * @param {number} matrixSide
 * @param {number[][]} buildings
 * @return {void}
 */
function fillMinMaxBuildingPosition(matrixSide, buildings) {
    for (let i = 0; i <= matrixSide; ++i) {
        this.rows[i] = new MinMaxBuildingPosition();
        this.columns[i] = new MinMaxBuildingPosition();
    }

    for (let current of buildings) {
        const row = current[0];
        const column = current[1];

        this.rows[row].min = Math.min(this.rows[row].min, column);
        this.rows[row].max = Math.max(this.rows[row].max, column);

        this.columns[column].min = Math.min(this.columns[column].min, row);
        this.columns[column].max = Math.max(this.columns[column].max, row);
    }
}

/**
 * @param {number[][]} buildings
 * @return {number}
 */
function findNumberOfCoveredBuildings(buildings) {
    let numberOfCoveredBuildings = 0;

    for (let current of buildings) {
        const row = current[0];
        const column = current[1];
        if (buildingIsCovered(row, column)) {
            ++numberOfCoveredBuildings;
        }
    }
    return numberOfCoveredBuildings;
}

/**
 * @param {number} row
 * @param {number} column
 * @return {boolean}
 */
function  buildingIsCovered(row, column) {
    return this.rows[row].min < column && this.rows[row].max > column
            && this.columns[column].min < row && this.columns[column].max > row;
}
