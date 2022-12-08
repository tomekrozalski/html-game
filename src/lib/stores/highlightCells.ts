import { writable } from 'svelte/store';
import type { HighlightedCells } from '$types/types.d';

const emptyHighlightedCells = {
	isPossibleToBuild: false,
	buildingCells: [],
	operatingAreaCells: []
};

export const highlightedCells = writable<HighlightedCells>(emptyHighlightedCells);
export const resetHighlightedCells = () => highlightedCells.update(() => emptyHighlightedCells);
