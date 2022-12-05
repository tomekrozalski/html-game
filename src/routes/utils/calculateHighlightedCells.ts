import type { Board, CellCoordinates, HighlightedCells } from './types.d';

const generateRow = ({ column, row }: CellCoordinates, values: CellCoordinates[]) => {
	values.push({ column: column - 1, row });
	values.push({ column, row });
	values.push({ column: column + 1, row });
};

const calculateHighlightedCells = (
	board: Board,
	{ column, row }: CellCoordinates
): HighlightedCells => {
	const values: CellCoordinates[] = [];

	generateRow({ column, row: row - 1 }, values);
	generateRow({ column, row }, values);
	generateRow({ column, row: row + 1 }, values);

	const filteredValues = values.filter(
		({ column, row }) => column >= 0 && row >= 0 && column < board.width && row < board.height
	);
	const isPossibleToBuild = filteredValues.length === values.length;

	return {
		isPossibleToBuild,
		values: filteredValues
	};
};

export default calculateHighlightedCells;
