<script lang="ts">
	import { onMount } from 'svelte';
	import calculateHighlightedCells from './utils/calculateHighlightedCells';
	import generateBuildingCell from './utils/generateBuildingCell';
	import generateOperatingArea from './utils/generateOperatingArea';
	import Forester from './Forester.svelte';
	import { cells } from './utils/store';
	import type { Board, BuldingCell, CellCoordinates, HighlightedCells } from './utils/types.d';

	const board: Board = {
		height: 40,
		width: 50
	};

	const columns = new Array(board.width).fill('');
	const rows = new Array(board.height).fill('');

	const generateTrees = () => {
		$cells[2][30].isAvailable = false;
		$cells[2][30].content = 'tree';

		$cells[6][21].isAvailable = false;
		$cells[6][21].content = 'tree';
	};

	let mounted = false;

	onMount(() => {
		const allCells = rows.reduce((acc, _, row) => {
			acc[row] = {};

			columns.forEach((_, column) => {
				acc[row][column] = { isAvailable: true };
			});

			return acc;
		}, {});

		cells.set(allCells);

		generateTrees();

		mounted = true;
	});

	const emptyHighlightedCells = {
		isPossibleToBuild: false,
		values: []
	};

	let mode = 'build';
	let highlightedCells: HighlightedCells = emptyHighlightedCells;
	let building: BuldingCell | null = null;
	let operatingArea: CellCoordinates[] = [];

	const highlight = (e: Event) => {
		const cell = e.target as HTMLTableCellElement;

		if (mode === 'build') {
			const row = Number(cell.dataset.row);
			const column = Number(cell.dataset.column);

			highlightedCells = calculateHighlightedCells(board, { column, row });
		}
	};

	const onBoardMouseLeave = () => {
		highlightedCells = emptyHighlightedCells;
	};

	const build = (e: Event) => {
		const cell = e.target as HTMLTableCellElement;

		if (highlightedCells.isPossibleToBuild && mode === 'build') {
			const column = Number(cell.dataset.column);
			const row = Number(cell.dataset.row);

			building = generateBuildingCell({
				column,
				row
			});

			operatingArea = generateOperatingArea(board, {
				column,
				row
			});

			highlightedCells = emptyHighlightedCells;
			mode = 'none';
		} else {
			alert('cannot build in this place');
		}
	};

	$: console.log('!!!', $cells);
</script>

<table on:mouseleave={onBoardMouseLeave}>
	{#each rows as _, row}
		<tr>
			{#each columns as _, column}
				<!-- svelte-ignore a11y-click-events-have-key-events -->
				<td
					data-row={row}
					data-column={column}
					on:click={build}
					on:mouseenter={highlight}
					class:highlighted={highlightedCells.values.find(
						(props) => props.row === row && props.column === column
					)}
					class:isPossibleToBuild={highlightedCells.isPossibleToBuild}
					class:operatingArea={operatingArea.find(
						(props) => props.row === row && props.column === column
					)}
					class:building={building?.startingCell.column === column &&
						building?.startingCell.row === row}
				>
					{#if mounted && $cells[row][column].content === 'tree'}
						🌳
					{/if}
					{#if building?.startingCell.column === column && building?.startingCell.row === row}
						<Forester {operatingArea} />
					{/if}
				</td>
			{/each}
		</tr>
	{/each}
</table>

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

	td {
		display: flex;
		justify-content: center;
		align-items: flex-end;
		width: 15px;
		height: 15px;
		line-height: 1;
		font-size: 12px;
	}

	td + td {
		border-left: 1px solid #eee;
	}

	tr:not(:first-of-type) td {
		border-top: 1px solid #eee;
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
