type BuldingCell = {
	startingCell: CellCoordinates;
	size: 3 | 5;
};

export type CellCoordinates = {
	column: number;
	row: number;
};

export type CellData = {
	[row: number]: {
		[column: number]: {
			isAvailable: boolean;
			content?: string;
		};
	};
};

export type Board = {
	height: number;
	width: number;
};

export type HighlightedCells = {
	isPossibleToBuild: boolean;
	values: CellCoordinates[];
};
