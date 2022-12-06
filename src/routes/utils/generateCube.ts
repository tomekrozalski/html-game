import type { CellCoordinates } from './types.d';

const generateCube = ({ column, row }: CellCoordinates, size: 3 | 5 = 3): CellCoordinates[] => {
	const distance = (size - 1) / 2;
	const startingCell = { column: column - distance, row: row - distance };

	const columns = new Array(size).fill('').map((_, index) => startingCell.column + index);
	const rows = new Array(size).fill('').map((_, index) => startingCell.row + index);

	return rows.map((r) => columns.map((c) => ({ column: c, row: r }))).flat();
};

export default generateCube;
