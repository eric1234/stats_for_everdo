<script>
  export let days
  export let rollingDays
  export let tasks

  import { Duration } from 'luxon'

  import { formatDuration, roundToLargestDuration } from './dates'
  import { rolling, avg } from './calc.js'
  import LineChart from './LineChart.svelte'

  const toolTipValueFormat = y => formatDuration(Duration.fromMillis(y))

  const chartOptions = {
    scales: {
      y: {
        ticks: { callback: value => roundToLargestDuration(Duration.fromMillis(value)) }
      }
    },
  }

  function avgDuration(completed_tasks) {
    if( completed_tasks.length === 0 ) return

    return Duration.fromMillis(avg(completed_tasks.map(task => task.completedAt.diff(task.createdAt).toMillis())))
  }

  $: tasksCompletedByDay = tasks.reduce((memo, task) => {
    if( !task.completedAt ) return memo

    const on = task.completedAt.toISODate()
    memo[on] ||= []
    memo[on].push(task)

    return memo
  }, {})
  $: avgTurnAround = avgDuration(tasks.filter(task => task.isCompletedDuring(days)))
  $: turnAround = rolling(days, rollingDays, day => avgDuration(tasksCompletedByDay[day.toISODate()] || []))

  $: datasets = [
    {
      label: `Turn-around of closed - Avg ${formatDuration(avgTurnAround)}`,
      data: turnAround,
    },
  ]
</script>

<LineChart labels={ days } { datasets } options={ chartOptions } { toolTipValueFormat } />
