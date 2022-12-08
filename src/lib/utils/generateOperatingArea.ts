import { get } from 'svelte/store';
import { board } from '$lib/stores';
import type { CellCoordinates, BuildingSize, OperatingAreaSize } from '$types/types.d';
import generateCube from './generateCube';

const generateOperatingArea = (
	{ column, row }: CellCoordinates,
	areaSize: OperatingAreaSize = 8,
	buildingSize: BuildingSize = 3
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
	const { height, width } = get(board);

	return rows
		.map((r) => columns.map((c) => ({ column: c, row: r })))
		.flat()
		.filter(
			(selectedCell) =>
				selectedCell.column >= 0 &&
				selectedCell.row >= 0 &&
				selectedCell.column < width &&
				selectedCell.row < height
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
