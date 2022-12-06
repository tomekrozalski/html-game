import generateCube from './generateCube';
import type { Board, CellCoordinates } from './types.d';

const generateOperatingArea = (
	board: Board,
	{ column, row }: CellCoordinates,
	areaSize: 8 | 12 = 8,
	buildingSize: 3 | 5 = 3
): CellCoordinates[] => {
	const distance = (buildingSize - 1) / 2;
	const startingCell = { column: column - distance - areaSize, row: row - distance - areaSize };

	const columns = new Array(areaSize * 2 + buildingSize)
		.fill('')
		.map((_, index) => startingCell.column + index);
	const rows = new Array(areaSize * 2 + buildingSize)
		.fill('')
		.map((_, index) => startingCell.row + index);

	const buildingCells = generateCube({ column, row }, buildingSize);

	return rows
		.map((r) => columns.map((c) => ({ column: c, row: r })))
		.flat()
		.filter(
			(selectedCell) =>
				selectedCell.column >= 0 &&
				selectedCell.row >= 0 &&
				selectedCell.column < board.width &&
				selectedCell.row < board.height
		)
		.filter(
			(selectedCell) =>
				!buildingCells.find(
					(buildingCell) =>
						buildingCell.column === selectedCell.column && buildingCell.row === selectedCell.row
				)
		);
};

export default generateOperatingArea;
