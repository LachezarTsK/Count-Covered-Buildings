
function countCoveredBuildings(matrixSide: number, buildings: number[][]): number {
    const rows = new Array(matrixSide + 1);
    const columns = new Array(matrixSide + 1);
    fillMinMaxBuildingPosition(matrixSide, buildings, rows, columns);

    return findNumberOfCoveredBuildings(buildings, rows, columns);
};

class MinMaxBuildingPosition {

    private static RANGE_OF_POSITIONS = [1, Math.pow(10, 5)];
    min: number;
    max: number;

    constructor() {
        this.min = MinMaxBuildingPosition.RANGE_OF_POSITIONS[1];
        this.max = MinMaxBuildingPosition.RANGE_OF_POSITIONS[0];
    }
}

function fillMinMaxBuildingPosition(matrixSide: number, buildings: number[][],
                                    rows: MinMaxBuildingPosition[],
                                    columns: MinMaxBuildingPosition[]): void {
    for (let i = 0; i <= matrixSide; ++i) {
        rows[i] = new MinMaxBuildingPosition();
        columns[i] = new MinMaxBuildingPosition();
    }

    for (let current of buildings) {
        const row = current[0];
        const column = current[1];

        rows[row].min = Math.min(rows[row].min, column);
        rows[row].max = Math.max(rows[row].max, column);

        columns[column].min = Math.min(columns[column].min, row);
        columns[column].max = Math.max(columns[column].max, row);
    }
}

function findNumberOfCoveredBuildings(buildings: number[][],
                                      rows: MinMaxBuildingPosition[],
                                      columns: MinMaxBuildingPosition[]): number {
    let numberOfCoveredBuildings = 0;

    for (let current of buildings) {
        const row = current[0];
        const column = current[1];
        if (buildingIsCovered(row, column, rows, columns)) {
            ++numberOfCoveredBuildings;
        }
    }
    return numberOfCoveredBuildings;
}

function buildingIsCovered(row: number, column: number,
                           rows: MinMaxBuildingPosition[],
                           columns: MinMaxBuildingPosition[]): boolean {
    return rows[row].min < column && rows[row].max > column
           && columns[column].min < row && columns[column].max > row;
}
