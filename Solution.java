
public class Solution {

    private class MinMaxBuildingPosition {
        int min = RANGE_OF_POSITIONS[1];
        int max = RANGE_OF_POSITIONS[0];
    }

    private static final int[] RANGE_OF_POSITIONS = {1, (int) Math.pow(10, 5)};

    private MinMaxBuildingPosition[] rows;
    private MinMaxBuildingPosition[] columns;

    public int countCoveredBuildings(int matrixSide, int[][] buildings) {
        rows = new MinMaxBuildingPosition[matrixSide + 1];
        columns = new MinMaxBuildingPosition[matrixSide + 1];
        fillMinMaxBuildingPosition(matrixSide, buildings);

        return findNumberOfCoveredBuildings(buildings);
    }

    private void fillMinMaxBuildingPosition(int matrixSide, int[][] buildings) {
        for (int i = 0; i <= matrixSide; ++i) {
            rows[i] = new MinMaxBuildingPosition();
            columns[i] = new MinMaxBuildingPosition();
        }

        for (int[] current : buildings) {
            int row = current[0];
            int column = current[1];

            rows[row].min = Math.min(rows[row].min, column);
            rows[row].max = Math.max(rows[row].max, column);

            columns[column].min = Math.min(columns[column].min, row);
            columns[column].max = Math.max(columns[column].max, row);
        }
    }

    private int findNumberOfCoveredBuildings(int[][] buildings) {
        int numberOfCoveredBuildings = 0;

        for (int[] current : buildings) {
            int row = current[0];
            int column = current[1];
            if (buildingIsCovered(row, column)) {
                ++numberOfCoveredBuildings;
            }
        }
        return numberOfCoveredBuildings;
    }

    private boolean buildingIsCovered(int row, int column) {
        return rows[row].min < column && rows[row].max > column
                && columns[column].min < row && columns[column].max > row;
    }
}
