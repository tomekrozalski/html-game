<script lang="ts">
	import { onMount } from 'svelte';
	import { get } from 'svelte/store';
	import { cells } from './utils/store';
	import HomeIcon from './HomeIcon.svelte';
	import type { CellCoordinates } from './utils/types.d';

	export let operatingArea: CellCoordinates[] = [];

	const plantTree = () => {
		const emptyFields = operatingArea.filter(
			({ column, row }) => get(cells)[row][column].isAvailable
		);

		if (!emptyFields) {
			return null;
		}

		const randomCell = emptyFields[Math.floor(Math.random() * emptyFields.length)];

		const data = get(cells);

		cells.set({
			...data,
			[randomCell.row]: {
				...data[randomCell.row],
				[randomCell.column]: {
					...data[randomCell.row][randomCell.column],
					isAvailable: false,
					content: 'tree'
				}
			}
		});

		setTimeout(plantTree, 5000);
	};

	onMount(plantTree);
</script>

<HomeIcon />
