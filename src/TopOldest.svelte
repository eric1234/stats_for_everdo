<script>
  export let lastDay
  export let tasks
  export let title

  import { sortBy } from 'lodash'
  import { DateTime } from 'luxon'

  $: tasksOpen = tasks.filter(task => task.isOpenOn(lastDay))
  $: top = sortBy(tasksOpen, 'createdAt').splice(0, 10)
</script>

<table class="table">
  <caption class="caption-top text-center">{ title }</caption>

  <thead>
    <tr>
      <th scope="col">Title</th>
      <th scope="col">Created On</th>
    </tr>
  </thead>
  <tbody>
    {#each top as task}
      <tr>
        <td>{ task.title }</td>
        <td>{ task.createdAt.toLocaleString(DateTime.DATE_FULL) }
      </tr>
    {/each}
  </tbody>
</table>
