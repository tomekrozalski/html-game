<script lang="ts">
	import Forester from '$lib/buildings/Forester.svelte';
	import highlight from '$lib/utils/highlight';
	import build from '$lib/utils/build';
	import { buildings, cells, highlightedCells } from '$lib/stores';

	export let column: number;
	export let row: number;

	$: building = $buildings.find(
		({ position }) => position.startingCell.column === column && position.startingCell.row === row
	);

	const types = {
		forester: Forester
	};
</script>

<!-- svelte-ignore a11y-click-events-have-key-events -->
<td
	data-row={row}
	data-column={column}
	on:click={build}
	on:mouseenter={highlight}
	class:highlighted={$highlightedCells.buildingCells.find(
		(props) => props.row === row && props.column === column
	)}
	class:isPossibleToBuild={$highlightedCells.isPossibleToBuild}
	class:operatingArea={$highlightedCells.operatingAreaCells.find(
		(props) => props.row === row && props.column === column
	)}
	class:building
>
	{#if $cells[row][column].content === 'tree'}
		🌳
	{/if}
	{#if building?.type}
		<svelte:component this={types[building.type]} id={building.id} />
	{/if}
</td>

<style>
	td {
		display: flex;
		justify-content: center;
		align-items: flex-end;
		width: 15px;
		height: 15px;
		line-height: 1;
		font-size: 12px;
	}

	td.highlighted.isPossibleToBuild {
		background-color: green;
		cursor: pointer;
	}

	td.highlighted {
		background-color: pink;
		cursor: not-allowed;
	}

	td.building {
		background-color: #333;
		position: relative;
	}

	td.building::before {
		content: '';
		width: 47px;
		height: 47px;
		background-color: white;
		position: absolute;
		top: 0;
		left: 0;
	}

	td.building :global(svg) {
		width: 47px;
		height: 47px;
		position: absolute;
		top: 0;
		left: 0;
		fill: black;
	}

	td.operatingArea {
		background-color: rgba(0, 0, 0, 0.025);
	}
</style>
