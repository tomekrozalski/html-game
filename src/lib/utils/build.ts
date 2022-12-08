import { get } from 'svelte/store';
import generateBuildingCell from '$lib/utils/generateBuildingCell';
import generateOperatingArea from '$lib/utils/generateOperatingArea';
import generateId from '$lib/utils/generateId';
import {
	buildings,
	highlightedCells,
	isBuildMode,
	mode,
	resetHighlightedCells,
	setIdleMode
} from '$lib/stores';
import type { BuildingModeData } from '$types/types';

const build = (e: Event) => {
	const cell = e.target as HTMLTableCellElement;

	if (get(highlightedCells).isPossibleToBuild && get(isBuildMode)) {
		const column = Number(cell.dataset.column);
		const row = Number(cell.dataset.row);

		const { size, operatingArea } = get(mode).building as BuildingModeData;

		resetHighlightedCells();

		setIdleMode();
		buildings.update((store) => {
			return [
				...store,
				{
					id: generateId(),
					position: generateBuildingCell(
						{
							column,
							row
						},
						size
					),
					operatingArea: operatingArea
						? generateOperatingArea(
								{
									column,
									row
								},
								operatingArea,
								size
						  )
						: [],
					type: 'forester'
				}
			];
		});
	} else {
		alert('cannot build in this place');
	}
};

export default build;
