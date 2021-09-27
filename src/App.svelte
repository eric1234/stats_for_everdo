<script>
	let data = {}
	$: empty = Object.keys(data).length === 0

	import ChooseFile from './ChooseFile.svelte'
	import Analytics from './Analytics.svelte'
</script>

<main class="container my-3">
	{#if empty}
		<ChooseFile bind:data />
	{:else}
		<Analytics data={ JSON.parse(data) } />
	{/if}
</main>

<footer class="position-absolute bottom-0 start-50 translate-middle-x bg-info w-100 py-3 text-center position-fixed">
	Source code available at
	<a href="https://github.com/eric1234/stats_for_everdo">Github</a>
</footer>
