import type { BuldingCell, CellCoordinates, BuildingSize } from '$types/types.d';

const generateBuildingCell = (
	{ column, row }: CellCoordinates,
	size: BuildingSize = 3
): BuldingCell => {
	const distance = (size - 1) / 2;
	const startingCell = { column: column - distance, row: row - distance };

	return {
		startingCell,
		size
	};
};

export default generateBuildingCell;
