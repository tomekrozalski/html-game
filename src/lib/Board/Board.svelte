<script lang="ts">
	import { onMount } from 'svelte';
	import { cellsArray, resetHighlightedCells } from '$lib/stores';
	import createBoard from './utils/createBoard';
	import Cell from './Cell.svelte';

	export let height: number;
	export let width: number;

	onMount(() => createBoard({ height, width }));
</script>

{#if $cellsArray.length}
	<table on:mouseleave={resetHighlightedCells}>
		{#each new Array(height).fill('') as _, row}
			<tr>
				{#each new Array(width).fill('') as _, column}
					<Cell {column} {row} />
				{/each}
			</tr>
		{/each}
	</table>
{:else}
	Loading…
{/if}

<style>
	table {
		display: flex;
		flex-direction: column;
		margin-top: 80px;
		border: 1px solid #ddd;
	}

	tr {
		display: flex;
		height: 17px;
	}

	tr :global(td + td) {
		border-left: 1px solid #eee;
	}

	tr:not(:first-of-type) :global(td) {
		border-top: 1px solid #eee;
	}
</style>
