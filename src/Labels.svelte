<script>
  export let days
  export let rollingDays
  export let tasks
  export let tags

  import TagChart from './TagChart.svelte'

  $: labels = Object.values(tags).filter(tag => tag.type == 'Label')
</script>

<TagChart title="Labels" { days } { rollingDays } { tasks } tags={ labels } tagType=labels />
