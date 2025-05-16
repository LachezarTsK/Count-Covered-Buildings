
package main
import "math"

var RANGE_OF_POSITIONS = [2]int{1, int(math.Pow(10.0, 5.0))}

var rows []MinMaxBuildingPosition
var columns []MinMaxBuildingPosition

type MinMaxBuildingPosition struct {
    min int
    max int
}

func NewMinMaxBuildingPosition() MinMaxBuildingPosition {
    minMaxBuildingPosition := MinMaxBuildingPosition{
        min: RANGE_OF_POSITIONS[1],
        max: RANGE_OF_POSITIONS[0],
    }
    return minMaxBuildingPosition
}

func countCoveredBuildings(matrixSide int, buildings [][]int) int {
    rows = make([]MinMaxBuildingPosition, matrixSide+1)
    columns = make([]MinMaxBuildingPosition, matrixSide+1)
    fillMinMaxBuildingPosition(matrixSide, buildings)

    return findNumberOfCoveredBuildings(buildings)
}

func fillMinMaxBuildingPosition(matrixSide int, buildings [][]int) {
    for i := 0; i <= matrixSide; i++ {
        rows[i] = NewMinMaxBuildingPosition()
        columns[i] = NewMinMaxBuildingPosition()
    }

    for _, current := range buildings {
        row := current[0]
        column := current[1]

        rows[row].min = min(rows[row].min, column)
        rows[row].max = max(rows[row].max, column)

        columns[column].min = min(columns[column].min, row)
        columns[column].max = max(columns[column].max, row)
    }
}

func findNumberOfCoveredBuildings(buildings [][]int) int {
    numberOfCoveredBuildings := 0

    for _, current := range buildings {
        row := current[0]
        column := current[1]
        if buildingIsCovered(row, column) {
            numberOfCoveredBuildings++
        }
    }
    return numberOfCoveredBuildings
}

func buildingIsCovered(row int, column int) bool {
    return rows[row].min < column && rows[row].max > column &&
           columns[column].min < row && columns[column].max > row
}
