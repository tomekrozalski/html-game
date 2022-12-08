import { writable } from 'svelte/store';
import type { BuildingData } from '$types/types.d';

export const buildings = writable<BuildingData[]>([]);
