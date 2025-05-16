
#include <span>
#include <cmath>
#include <array>
#include <vector>
#include <algorithm>
using namespace std;

class Solution {

    struct MinMaxBuildingPosition {
        int min = RANGE_OF_POSITIONS[1];
        int max = RANGE_OF_POSITIONS[0];
    };

    inline static array<int, 2> RANGE_OF_POSITIONS = { 1, static_cast<int>(pow(10, 5)) };

    vector<MinMaxBuildingPosition> rows;
    vector<MinMaxBuildingPosition> columns;

public:
    int countCoveredBuildings(int matrixSide, vector<vector<int>>& buildings) {
        rows.resize(matrixSide + 1);
        columns.resize(matrixSide + 1);
        fillMinMaxBuildingPosition(matrixSide, buildings);

        return findNumberOfCoveredBuildings(buildings);
    }

private:
    void fillMinMaxBuildingPosition(int matrixSide, span<const vector<int>> buildings) {
        for (int i = 0; i <= matrixSide; ++i) {
            rows[i] = MinMaxBuildingPosition();
            columns[i] = MinMaxBuildingPosition();
        }

        for (const auto& current : buildings) {
            int row = current[0];
            int column = current[1];

            rows[row].min = min(rows[row].min, column);
            rows[row].max = max(rows[row].max, column);

            columns[column].min = min(columns[column].min, row);
            columns[column].max = max(columns[column].max, row);
        }
    }

    int findNumberOfCoveredBuildings(span<const vector<int>> buildings) const {
        int numberOfCoveredBuildings = 0;

        for (const auto& current : buildings) {
            int row = current[0];
            int column = current[1];
            if (buildingIsCovered(row, column)) {
                ++numberOfCoveredBuildings;
            }
        }
        return numberOfCoveredBuildings;
    }

    bool buildingIsCovered(int row, int column) const {
        return rows[row].min < column && rows[row].max > column
                && columns[column].min < row && columns[column].max > row;
    }
};
