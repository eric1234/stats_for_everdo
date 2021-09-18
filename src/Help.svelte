<script>
  import { tick } from 'svelte';

  let trigger, slot, text

  $: if( slot ) text = slot.textContent
  $: if( trigger && text ) {
    (async () => {
      await tick()
      new bootstrap.Popover(trigger)
    })()
  }
</script>

<span
  class="badge rounded-pill bg-info text-dark" bind:this={ trigger }
  data-bs-trigger="hover focus" data-bs-toggle="popover"
  data-bs-content={ text }>
  ?
</span>

<div bind:this={ slot } class="d-none"><slot /></div>
