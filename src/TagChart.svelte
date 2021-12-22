<script>
  export let days
  export let rollingDays
  export let tasks
  export let title
  export let tags
  export let tagType

  import LineChart from './LineChart.svelte'
  import { rolling, countIf } from './calc'

  const chartOptions = {
    plugins: {
      title: {
        display: true,
        text: title,
      }
    }
  }

  $: tasksCompletedByDay = days.reduce((memo, day) => {
    memo[day.toString()] = tasks.filter(task => task.isCompletedOn(day))
    return memo
  }, {})

  $: datasets = tags.map(tag => {
    let total = 0
    const counts = rolling(days, rollingDays, day => {
      const completed = tasksCompletedByDay[day] || []
      const dayCount = countIf(completed, task => task[tagType].some(t => t.title == tag.title))
      total += dayCount
      return dayCount
    })

    return {
      label: `# ${tag.title} - ${total}`,
      data: counts,
      total: total,
    }
  })
    .sort((a, b) => b.total - a.total)
    .filter(tag => tag.total > 0)
</script>

<LineChart labels={ days } { datasets } options={ chartOptions } />
