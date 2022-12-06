import { writable } from 'svelte/store';
import type { CellData } from './types.d';

export const cells = writable<CellData>({});
