<script>
  export let data

  import { DateTime } from 'luxon'

  import { dateRange } from './dates'
  import Task from './task'
  import Filters from './Filters.svelte'
  import ChartCard from './ChartCard.svelte'
  import CreationCompletion from './CreationCompletion.svelte'
  import Open from './Open.svelte'
  import TurnAround from './TurnAround.svelte'
  import Areas from './Areas.svelte'
  import Labels from './Labels.svelte'
  import TopOldest from './TopOldest.svelte'

  // As we iterate through we update this if the item is earlier than the
  // current value to find the oldest date to be the start date for the data
  let createdOn = DateTime.now()

  const tags = data.tags.reduce((memo, tag) => {
    const record = { title: tag.title }

    switch( tag.type ) {
      case 'c':
        record.type = 'Contact'
        break
      case 'l':
        record.type = 'Label'
        break
      case 'a':
        record.type = 'Area'
    }

    memo[tag.id] = record
    return memo
  }, {})

  // Using `reduce` instead of `filter` chained to a `map` for just a single
  // iteration of all tasks
  const [tasks, projectsById] = data.items.reduce((memo, item) => {
    const ignoreTypes = [
      // Lists (of notes) are not tasks or projects
      'l',

      // Remove notes as they are not tasks or projects
      'n',
    ]

    const isDeleted = item.list == 'd'

    // Schedule filter is to remove the template task as they are not a task
    // we do but just a template to create tasks from.
    if( ignoreTypes.includes(item.type) || isDeleted || item.schedule ) return memo

    const record = new Task()
    record.id = item.id
    record.title = item.title
    record.createdAt = DateTime.fromSeconds(item.created_on)
    if( record.createdAt < createdOn ) createdOn = record.createdAt
    if( item.completed_on )
      record.completedAt = DateTime.fromSeconds(item.completed_on)
    record.maintenance = !!item.recurrent_task_id
    record.project = item.parent_id

    item.tags.forEach(tag_id => {
      const tag = tags[tag_id]
      switch( tag.type ) {
        case 'Area':
          record.areas.push(tag)
          break
        case 'Label':
          record.labels.push(tag)
          break
      }
    })

    if( item.type == 'p' )
      memo[1][record.id] = record
    else
      memo[0].push(record)

    return memo
  }, [[], {}])
  const projects = Object.values(projectsById)

  // Associating project has to happen after the main loop since task might be
  // before project in data file. While making the association copy down areas
  // and labels so the task shows up in all the right buckets
  tasks.forEach(task => {
    // Task may not be part of a project
    if( !task.project ) return

    const project = projectsById[task.project]

    // Project might be deleted even though task on it was done. Skip
    if( !project ) return

    // Make association to object rather than ID
    task.project = project

    // Concat projects tags to tasks so completed the tag affects tag graphs
    task.areas = task.areas.concat(project.areas)
    task.labels = task.labels.concat(project.labels)

    // If project is completed before task then assume task completion date
    // is the same a task completion date. Otherwise the task will be considered
    // completed when the archive happens which is less relevant
    if( task.completedAt && project.completedAt && task.completedAt > project.completedAt )
      task.completedAt = project.completedAt
  })

  const tasksWithoutProjects = tasks.filter(t => !t.project)

  createdOn = createdOn.startOf('day')

  // Default config

  let startOn = DateTime.now().minus({weeks: 1})
  if( startOn < createdOn ) startOn = createdOn
  startOn = startOn.toISODate()

  let endOn = DateTime.now().minus({day: 1})
  if( endOn < createdOn ) endOn = createdOn
  endOn = endOn.toISODate()

  let rollingDays = 1
  let maintenance = true
  let projectsOnly = false

  let filteredTasks = tasks
  $: filteredTasks = tasks.filter(task => (
    // Either maintenance tasks (recurrent) are allowed OR the task is not
    // a maintenance task
    (maintenance || !task.maintenance) &&

    // Either projects only is not enabled OR the task is a project
    (!projectsOnly || task.project)
  ))

  // Days in range based on config
  $: days = dateRange(DateTime.fromISO(startOn), DateTime.fromISO(endOn))
  $: lastDay = days[days.length-1]
</script>

<Filters bind:createdOn bind:startOn bind:endOn bind:rollingDays bind:maintenance bind:projectsOnly />

<div class="row row-cols-1 row-cols-xl-2">
  <ChartCard>
    <CreationCompletion { days } { rollingDays } tasks={ filteredTasks } />
  </ChartCard>

  <ChartCard>
    <Open { days } { rollingDays } { projects } tasks={ filteredTasks } />
  </ChartCard>

  <ChartCard>
    <Areas { days } { rollingDays } tasks={ filteredTasks } { tags } />
  </ChartCard>

  <ChartCard>
    <Labels { days } { rollingDays } tasks={ filteredTasks } { tags } />
  </ChartCard>

  <ChartCard>
    <TurnAround { days } { rollingDays } tasks={ filteredTasks } />
  </ChartCard>
</div>

<div class="row row-cols-1 row-cols-xl-2">
  <ChartCard>
    <TopOldest { lastDay } tasks={ tasksWithoutProjects } title="Top Oldest Tasks" />
  </ChartCard>

  <ChartCard>
    <TopOldest { lastDay } tasks={ projects } title="Top Oldest Projects" />
  </ChartCard>
</div>
