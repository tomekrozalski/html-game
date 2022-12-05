<script lang="ts">
	import calculateHighlightedCells from './utils/calculateHighlightedCells';
	import type { Board, CellCoordinates, HighlightedCells } from './utils/types.d';

	const board: Board = {
		height: 40,
		width: 50
	};

	const columns = new Array(board.width).fill('');
	const rows = new Array(board.height).fill('');

	const emptyHighlightedCells = {
		isPossibleToBuild: false,
		values: []
	};

	let mode = 'build';
	let highlightedCells: HighlightedCells = emptyHighlightedCells;
	let building: CellCoordinates[] = [];
	let inArea: CellCoordinates[] = [];

	const highlight = (e: Event) => {
		const cell = e.target as HTMLTableCellElement;

		if (mode === 'build') {
			const row = Number(cell.dataset.row);
			const column = Number(cell.dataset.column);

			highlightedCells = calculateHighlightedCells(board, { column, row });
		}
	};

	// 	function countSquares(row, column) {
	// 		// Count top left squares
	// 		var topLeft = Math.min(row, column) - 1;
	//
	// 		// Count bottom right squares
	// 		var bottomRight = 8 - Math.max(row, column);
	//
	// 		// Count top right squares
	// 		var topRight = Math.min(row, 9 - column) - 1;
	//
	// 		// Count bottom left squares
	// 		var bottomLeft = 8 - Math.max(row, 9 - column);
	//
	// 		// Return total count
	// 		return topLeft + topRight + bottomRight + bottomLeft;
	// 	}

	// 	const checkIsArea = (row, column) => {
	// 		console.log('b', { row, column });
	//
	// 		inArea = [`${row - 2}-${column - 1}`, `${row - 2}-${column}`, `${row - 2}-${column + 1}`];
	// 	};

	const blur = () => {
		highlightedCells = emptyHighlightedCells;
	};

	const build = (e) => {
		// 		if (canBuild && mode === 0) {
		// 			const row = Number(e.target.dataset.row);
		// 			const column = Number(e.target.dataset.column);
		//
		// 			building = [
		// 				`${row - 1}-${column - 1}`,
		// 				`${row - 1}-${column}`,
		// 				`${row - 1}-${column + 1}`,
		// 				`${row}-${column - 1}`,
		// 				`${row}-${column}`,
		// 				`${row}-${column + 1}`,
		// 				`${row + 1}-${column - 1}`,
		// 				`${row + 1}-${column}`,
		// 				`${row + 1}-${column + 1}`
		// 			];
		//
		// 			highlightedCells = [];
		// 			mode = 1;
		// 			checkIsArea(row, column);
		// 		} else {
		// 			alert('cannot build in this place');
		// 		}
	};
</script>

<table on:mouseleave={blur}>
	{#each rows as _, row}
		<tr>
			{#each columns as _, column}
				<td
					data-row={row}
					data-column={column}
					on:mouseenter={highlight}
					class:highlighted={highlightedCells.values.find(
						(props) => props.row === row && props.column === column
					)}
					class:canBuild={highlightedCells.isPossibleToBuild}
				/>
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
	}

	td {
		display: flex;
		justify-content: center;
		align-items: center;
		width: 15px;
		height: 15px;
		line-height: 0;
	}

	td + td {
		border-left: 1px solid #eee;
	}

	tr:not(:first-of-type) td {
		border-top: 1px solid #eee;
	}

	td.highlighted.canBuild {
		background-color: green;
		cursor: pointer;
	}

	td.highlighted {
		background-color: pink;
		cursor: not-allowed;
	}

	td.building {
		background-color: #333;
	}

	td.area {
		background-color: #eee;
	}
</style>
