export type CellCoordinates = {
	column: number;
	row: number;
};

export type Board = {
	height: number;
	width: number;
};

export type HighlightedCells = {
	isPossibleToBuild: boolean;
	values: CellCoordinates[];
};
