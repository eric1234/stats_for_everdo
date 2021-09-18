<script>
  export let createdOn, startOn, endOn, rollingDays, maintenance, projectsOnly

  import { DateTime } from 'luxon'

  import Help from './Help.svelte'

  createdOn = createdOn.toISODate()
  const today = DateTime.now().toISODate()
</script>

<div class="card my-3">
  <div class="card-body">
    <div class="row row-cols-xl-auto g-3 align-items-end">
      <div class="col-12 col-sm-6 col-lg-4">
        <label for="from" class="form-label">From</label>
        <input type="date" class="form-control" id="from" bind:value={ startOn } min={ createdOn } max={ today } />
      </div>

      <div class="col-12 col-sm-6 col-lg-4">
        <label for="to" class="form-label">To</label>
        <input type="date" class="form-control" id="to" bind:value={ endOn } min={ createdOn } max={ today } />
      </div>

      <div class="col-12 col-md-4 col-lg-4">
        <label for="rolling" class="form-label">
          Rolling Avg Days
          <Help>
            Averages with the values from the given previous days to smooth
            out the graph to make trends more appearant. Set to 1 to effectively
            remove rolling averages and see raw data.
          </Help>
        </label>
        <input type="number" class="form-control" id="rolling" bind:value={ rollingDays } min="1" style="width: 10rem" />
      </div>

      <div class="col-12 col-sm-6 col-md-4 col-lg-auto">
        <div class="form-check form-switch mb-2">
          <input type="checkbox" class="form-check-input" id="maintenance" bind:checked={ maintenance } />
          <label for="maintenance" class="form-check-label">
            Show Recurring?
            <Help>
              Recurring tasks tend to be maintenance tasks. Removing those
              from the stats helps you see your long term progress to make sure
              your not just treading water.
            </Help>
          </label>
        </div>
      </div>

      <div class="col-12 col-sm-6 col-md-4 col-lg-auto">
        <div class="form-check form-switch mb-2">
          <input type="checkbox" class="form-check-input" id="projects" bind:checked={ projectsOnly } />
          <label for="projects" class="form-check-label">
            Project Tasks Only?
            <Help>
              Project tasks tend to target longer-term big picture items. Enable
              this to focus on those only.
            </Help>
          </label>
        </div>
      </div>
    </div>
  </div>
</div>
