
using System;

public class Solution
{
    private class MinMaxBuildingPosition
    {
        public int min = RANGE_OF_POSITIONS[1];
        public int max = RANGE_OF_POSITIONS[0];
    }

    private static readonly int[] RANGE_OF_POSITIONS = { 1, (int)Math.Pow(10, 5) };

    private MinMaxBuildingPosition[]? rows;
    private MinMaxBuildingPosition[]? columns;

    public int CountCoveredBuildings(int matrixSide, int[][] buildings)
    {
        rows = new MinMaxBuildingPosition[matrixSide + 1];
        columns = new MinMaxBuildingPosition[matrixSide + 1];
        FillMinMaxBuildingPosition(matrixSide, buildings);

        return FindNumberOfCoveredBuildings(buildings);
    }

    private void FillMinMaxBuildingPosition(int matrixSide, int[][] buildings)
    {
        for (int i = 0; i <= matrixSide; ++i)
        {
            rows[i] = new MinMaxBuildingPosition();
            columns[i] = new MinMaxBuildingPosition();
        }

        foreach (int[] current in buildings)
        {
            int row = current[0];
            int column = current[1];

            rows[row].min = Math.Min(rows[row].min, column);
            rows[row].max = Math.Max(rows[row].max, column);

            columns[column].min = Math.Min(columns[column].min, row);
            columns[column].max = Math.Max(columns[column].max, row);
        }
    }

    private int FindNumberOfCoveredBuildings(int[][] buildings)
    {
        int numberOfCoveredBuildings = 0;

        foreach (int[] current in buildings)
        {
            int row = current[0];
            int column = current[1];
            if (BuildingIsCovered(row, column))
            {
                ++numberOfCoveredBuildings;
            }
        }
        return numberOfCoveredBuildings;
    }

    private bool BuildingIsCovered(int row, int column)
    {
        return rows[row].min < column && rows[row].max > column
                && columns[column].min < row && columns[column].max > row;
    }
}
