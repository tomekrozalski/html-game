import generateTreesRandomly from '$lib/utils/generateTreesRandomly';
import { board, cells } from '$lib/stores/board';
import type { Board } from '$types/types';

const createBoard = ({ height, width }: Board) => {
	board.set({ height, width });

	const columns = new Array(width).fill('');
	const rows = new Array(height).fill('');

	const updatedCells: {
		[row: number]: {
			[columnn: number]: {
				isAvailable: boolean;
			};
		};
	} = rows.reduce((acc, _, row) => {
		acc[row] = {};

		columns.forEach((_, column) => {
			acc[row][column] = { isAvailable: true };
		});

		return acc;
	}, {});

	cells.set(updatedCells);

	generateTreesRandomly({ amount: 5 });
};

export default createBoard;
