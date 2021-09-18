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
