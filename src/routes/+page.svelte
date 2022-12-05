<script>
	import Table from './Table.svelte';
</script>

<main>
	<h1>HTML game proof of concept</h1>

	<p>
		I think about strategic game like The Settlers IV written in SvelteKit, HTML. It might be later
		rewritten on Canvas API, but for now I wonder how it would work in the simplest web
		technologies.
	</p>

	<Table />
</main>

<style>
	main {
		width: 100%;
		max-width: 800px;
		margin: 0 auto;
		padding: 40px;
		background-color: #fff;
	}

	:global(body) {
		margin: 0;
		padding: 0;
		background-color: #ddd;
	}
</style>
