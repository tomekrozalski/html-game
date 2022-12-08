type BuldingCell = {
	startingCell: CellCoordinates;
	size: BuildingSize;
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
	buildingCells: CellCoordinates[];
	operatingAreaCells: CellCoordinates[];
};

export type BuildingType = 'forester';

export type BuildingData = {
	id: string;
	type: BuildingType;
	position: BuldingCell;
	operatingArea?: CellCoordinates[];
};

export type BuildingSize = 3 | 5 | 7;
export type OperatingAreaSize = 8 | 12;

type BuildingModeData = {
	type: BuildingType;
	size: BuildingSize;
	operatingArea?: OperatingAreaSize;
};
