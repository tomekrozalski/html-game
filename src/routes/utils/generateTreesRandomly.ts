import { get } from 'svelte/store';
import { cells } from './store';
import generateBoardCellsArray from './generateBoardCellsArray';
import type { CellCoordinates } from './types.d';

type GenerateTreeRandomlyProps = {
	amount?: number;
	cells?: CellCoordinates[];
};

const generateSingleTreeRandomly = (operatingAreaCells: CellCoordinates[]) => {
	const availableFields = operatingAreaCells.filter(
		({ column, row }) => get(cells)[row][column].isAvailable
	);

	if (!availableFields.length) {
		return null;
	}

	const randomCell = availableFields[Math.floor(Math.random() * availableFields.length)];
	const data = get(cells);

	cells.set({
		...data,
		[randomCell.row]: {
			...data[randomCell.row],
			[randomCell.column]: {
				...data[randomCell.row][randomCell.column],
				isAvailable: false,
				content: 'tree'
			}
		}
	});
};

const generateTreesRandomly = ({
	amount = 1,
	cells = generateBoardCellsArray()
}: GenerateTreeRandomlyProps) => {
	for (let i = 0; i < amount; i = i + 1) {
		generateSingleTreeRandomly(cells);
	}
};

export default generateTreesRandomly;
