<script lang="ts">
	import { onMount } from 'svelte';
	import HomeIcon from '$lib/assets/icons/HomeIcon.svelte';
	import { buildings } from '$lib/stores';
	import generateTreesRandomly from '$lib/utils/generateTreesRandomly';
	import type { BuildingData } from '$types/types';

	export let id: string;
	const { operatingArea } = $buildings.find((props) => props.id === id) as BuildingData;

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
