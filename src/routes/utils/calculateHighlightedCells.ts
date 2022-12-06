import { get } from 'svelte/store';
import generateCube from './generateCube';
import { cells } from './store';
import type { Board, CellCoordinates, HighlightedCells } from './types.d';

const calculateHighlightedCells = (
	board: Board,
	{ column, row }: CellCoordinates
): HighlightedCells => {
	const values = generateCube({ column, row });

	const valuesOutsideBoardFiltered = values.filter(
		({ column, row }) => column >= 0 && row >= 0 && column < board.width && row < board.height
	);

	const valuesOverlaping = valuesOutsideBoardFiltered.filter(({ column, row }) => {
		return !get(cells)[row][column].isAvailable;
	});

	const isPossibleToBuild =
		valuesOutsideBoardFiltered.length === values.length && !valuesOverlaping.length;

	return {
		isPossibleToBuild,
		values
	};
};

export default calculateHighlightedCells;
