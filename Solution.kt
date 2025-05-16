
import kotlin.math.pow
import kotlin.math.min
import kotlin.math.max

class Solution {

    private class MinMaxBuildingPosition() {
        var min = RANGE_OF_POSITIONS[1]
        var max = RANGE_OF_POSITIONS[0]
    }

    private companion object {
        val RANGE_OF_POSITIONS = intArrayOf(1, (10.0).pow(5.0).toInt())
    }

    private lateinit var rows: Array<MinMaxBuildingPosition>
    private lateinit var columns: Array<MinMaxBuildingPosition>

    fun countCoveredBuildings(matrixSide: Int, buildings: Array<IntArray>): Int {
        rows = Array<MinMaxBuildingPosition>(matrixSide + 1) { MinMaxBuildingPosition() }
        columns = Array<MinMaxBuildingPosition>(matrixSide + 1) { MinMaxBuildingPosition() }
        fillMinMaxBuildingPosition(matrixSide, buildings)

        return findNumberOfCoveredBuildings(buildings)
    }

    private fun fillMinMaxBuildingPosition(matrixSide: Int, buildings: Array<IntArray>): Unit {
        for (current in buildings) {
            val row = current[0]
            val column = current[1]

            rows[row].min = min(rows[row].min, column)
            rows[row].max = max(rows[row].max, column)

            columns[column].min = min(columns[column].min, row)
            columns[column].max = max(columns[column].max, row)
        }
    }

    private fun findNumberOfCoveredBuildings(buildings: Array<IntArray>): Int {
        var numberOfCoveredBuildings = 0

        for (current in buildings) {
            val row = current[0]
            val column = current[1]
            if (buildingIsCovered(row, column)) {
                ++numberOfCoveredBuildings
            }
        }
        return numberOfCoveredBuildings
    }

    private fun buildingIsCovered(row: Int, column: Int): Boolean {
        return rows[row].min < column && rows[row].max > column &&
                columns[column].min < row && columns[column].max > row
    }
}
