<script>
  export let days
  export let rollingDays
  export let tasks
  export let projects

  import { rolling, countIf } from './calc.js'
  import LineChart from './LineChart.svelte'

  $: openTasks = rolling(days, rollingDays, day => countIf(tasks, task => task.isOpenOn(day)))
  $: openProjects = rolling(days, rollingDays, day => countIf(projects, project => project.isOpenOn(day)))

  $: datasets = [
    {
      label: '# Open Tasks',
      data: openTasks,
    },
    {
      label: '# Open Projects',
      data: openProjects,
    },
  ]
</script>

<LineChart labels={ days } { datasets } />
