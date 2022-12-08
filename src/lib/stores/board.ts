import { derived, writable } from 'svelte/store';
import type { Board, CellCoordinates, CellData } from '$types/types.d';

export const board = writable<Board>({ height: 0, width: 0 });
export const cells = writable<CellData>({});
export const cellsArray = derived<typeof cells, CellCoordinates[]>(cells, ($cells) =>
	Object.entries($cells)
		.map(([row, values]) => Object.keys(values).map((column) => ({ row: +row, column: +column })))
		.flat()
);
