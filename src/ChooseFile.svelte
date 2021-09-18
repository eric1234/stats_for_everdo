<script>
  export let data
  let files
  let loading = false

  $: {
    (async () => {
      if( !(files && files[0]) ) return

      loading = true
      data = await files[0].text()
    })()
  }
</script>

<div class="container">
  <div class="row">
    <div class="col-md-6 offset-md-3">
      <p>
        Choose the "Export Data as JSON" option in Everdo. Save the JSON file
        somewhere. Then choose it with the file selector below.
      </p>

      <div class="input-group">
        <input class="form-control" type="file" bind:files />

        <div class="input-group-text" class:d-none={ !loading }>
          <div class="spinner-border spinner-border-sm" role="status">
            <span class="visually-hidden">Loading...</span>
          </div>
        </div>
      </div>

      <div class="card border-info mt-5">
        <div class="card-header bg-info">A Note on Privacy</div>
        <div class="card-body">
          Your data is not uploaded anywhere. It is processed entirely in
          your browser.
        </div>
      </div>
    </div>
  </div>
</div>
