import type { BuldingCell, CellCoordinates } from './types.d';

const generateBuildingCell = ({ column, row }: CellCoordinates, size: 3 | 5 = 3): BuldingCell => {
	const distance = (size - 1) / 2;
	const startingCell = { column: column - distance, row: row - distance };

	return {
		startingCell,
		size
	};
};

export default generateBuildingCell;
