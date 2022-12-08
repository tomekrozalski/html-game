import { get } from 'svelte/store';
import calculateHighlightedCells from '$lib/utils/calculateHighlightedCells';
import { isBuildMode } from '$lib/stores';

const highlight = (e: Event) => {
	const cell = e.target as HTMLTableCellElement;

	if (get(isBuildMode)) {
		const row = Number(cell.dataset.row);
		const column = Number(cell.dataset.column);

		calculateHighlightedCells({ column, row });
	}
};

export default highlight;
