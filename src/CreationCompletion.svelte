<script>
  export let days
  export let rollingDays
  export let tasks

  import { sum } from 'lodash'
  import { rolling } from './calc.js'
  import LineChart from './LineChart.svelte'

  // To help count the number of tasks that relate to a specific day
  // with a single iteration of the tasks.
  function countByDay(days, tasks, dayCallback) {
    return tasks.reduce((memo, task) => {
      const value = dayCallback(task)
      if( !value ) return memo

      const on = value.toISODate()
      memo[on] ||= 0
      memo[on] += 1
      return memo
    }, {})
  }

  $: taskCreatedCountByDay = countByDay(days, tasks, task => task.createdAt)
  $: totalCreated = sum(days.map(day => taskCreatedCountByDay[day.toISODate()] || 0))
  $: avgCreated = Math.round(totalCreated / days.length)
  $: creation = rolling(days, rollingDays, day => taskCreatedCountByDay[day.toISODate()] || 0)

  $: taskCompletedCountByDay = countByDay(days, tasks, task => task.completedAt)
  $: totalCompleted = sum(days.map(day => taskCompletedCountByDay[day.toISODate()] || 0))
  $: avgCompleted = Math.round(totalCompleted / days.length)
  $: completion = rolling(days, rollingDays, day => taskCompletedCountByDay[day.toISODate()] || 0)

  $: datasets = [
    {
      label: `# Created - Total ${totalCreated} - ${avgCreated}/day`,
      data: creation,
    },
    {
      label: `# Completed - Total ${totalCompleted} - ${avgCompleted}/day`,
      data: completion,
    },
  ]
</script>

<LineChart labels={ days } { datasets } />
