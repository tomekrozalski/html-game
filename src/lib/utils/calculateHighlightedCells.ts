import { get } from 'svelte/store';
import { board, cells, mode, highlightedCells } from '$lib/stores';
import type { BuildingModeData, CellCoordinates } from '$types/types.d';
import generateCube from './generateCube';
import generateOperatingArea from './generateOperatingArea';

const calculateHighlightedCells = ({ column, row }: CellCoordinates): void => {
	const { height, width } = get(board);

	if (!get(mode).building) {
		console.error('Unknown building type');
	}

	const { size, operatingArea } = get(mode).building as BuildingModeData;
	const buildingCells = generateCube({ column, row }, size);

	const valuesOutsideBoardFiltered = buildingCells.filter(
		({ column, row }) => column >= 0 && row >= 0 && column < width && row < height
	);

	const valuesOverlaping = valuesOutsideBoardFiltered.filter(({ column, row }) => {
		return !get(cells)[row][column].isAvailable;
	});

	const isPossibleToBuild =
		valuesOutsideBoardFiltered.length === buildingCells.length && !valuesOverlaping.length;

	highlightedCells.set({
		isPossibleToBuild,
		buildingCells,
		operatingAreaCells: operatingArea
			? generateOperatingArea(
					{
						column,
						row
					},
					operatingArea,
					size
			  )
			: []
	});
};

export default calculateHighlightedCells;
