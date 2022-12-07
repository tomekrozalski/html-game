import { get } from 'svelte/store';
import { cells } from './store';

const generateBoardCellsArray = () =>
	Object.entries(get(cells))
		.map(([row, values]) => Object.keys(values).map((column) => ({ row: +row, column: +column })))
		.flat();

export default generateBoardCellsArray;
