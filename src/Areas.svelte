<script>
  export let days
  export let rollingDays
  export let tasks
  export let tags

  import TagChart from './TagChart.svelte'

  $: areas = Object.values(tags).filter(tag => tag.type == 'Area')
</script>

<TagChart title="Areas" { days } { rollingDays } { tasks } tags={ areas } tagType=areas />
