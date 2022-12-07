<script lang="ts">
	import { onMount } from 'svelte';
	import HomeIcon from './HomeIcon.svelte';
	import generateTreesRandomly from './utils/generateTreesRandomly';
	import type { CellCoordinates } from './utils/types.d';

	export let operatingArea: CellCoordinates[] = [];

	function sleep(ms: number) {
		return new Promise((resolve) => setTimeout(resolve, ms));
	}

	const plantTree = async (ms: number) => {
		await sleep(ms);
		generateTreesRandomly({ cells: operatingArea });
		plantTree(5000);
	};

	onMount(() => plantTree(15000));
</script>

<HomeIcon />
