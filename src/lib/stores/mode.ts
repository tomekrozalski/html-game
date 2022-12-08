import { derived, writable } from 'svelte/store';
import type { BuildingModeData } from '$types/types';

enum ModeEnum {
	idle = 'idle',
	build = 'build'
}

type Mode = {
	type: ModeEnum;
	building?: BuildingModeData;
};

export const mode = writable<Mode>({
	type: ModeEnum.build,
	building: {
		type: 'forester',
		size: 3,
		operatingArea: 8
	}
});
export const isBuildMode = derived<typeof mode, boolean>(
	mode,
	($mode) => $mode.type === ModeEnum.build
);
export const setIdleMode = () => mode.set({ type: ModeEnum.idle });
