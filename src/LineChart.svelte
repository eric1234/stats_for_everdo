<script>
  export let labels
  export let datasets
  export let options = {}
  export let toolTipValueFormat = y => y

  import {
    Chart, TimeScale, LineController, LinearScale,
    PointElement, LineElement, Tooltip, Legend, Title
  } from 'chart.js'
  import 'chartjs-adapter-luxon'
  import { onMount } from 'svelte'
  import merge from 'deepmerge'

  Chart.register(
    TimeScale, LineController, LinearScale,
    PointElement, LineElement, Tooltip, Legend, Title
  )

  const colors = [
    'rgba(5, 95, 252, 0.9)',
    'rgba(57, 193, 32, 0.9)',
    'rgba(211, 221, 24, 0.9)',
    'rgba(221, 47, 24, 0.9)',
    'rgba(218, 24, 221, 0.9)',
    'rgba(24, 221, 221, 0.9)',
    'rgba(95, 132, 114, 0.9)',
    'rgba(239, 115, 0, 0.9)',
    'rgba(170, 175, 183, 0.9)',
    'rgba(0, 0, 0, 0.9)',
  ]

  let chart, canvas

  $: if( chart ) {
    chart.data.labels = labels
    datasets.forEach((dataset, idx) => {
      chart.data.datasets[idx].label = dataset.label
      chart.data.datasets[idx].data = dataset.data
    })
    chart.update()
  }

  onMount(()=> {
    const config = {
      type: 'line',
      data: {
        labels,
        datasets: datasets.map((dataset, idx) => {
          return Object.assign({
            fill: false,
            borderColor: colors[idx],
            backgroundColor: colors[idx],
          }, dataset)
        })
      },
      options: merge(options, {
        plugins: {
          tooltip: {
            callbacks: {
              label: context => {
                var label = context.dataset.label || ''
                label = label.split(' - ', 2)[0]
                if( label ) label += ': '

                if (context.parsed.y !== null)
                  label += toolTipValueFormat(context.parsed.y)

                return label
              }
            }
          }
        },
        interaction: {
          mode: 'index',
          intersect: false,
        },
        elements: {
          line: {
            tension: 0.4,
          },
          point: {
            radius: 0,
          },
        },
        scales: {
          x: {
            type: 'time',
            time: {
              tooltipFormat: 'DD',
              unit: 'day',
            },
          },
          y: {
            // Don't use fractiosn for y axis
            ticks: { precision: 0 },
          },
        },
      }),
    }
    chart = new Chart(canvas, config)
  })
</script>

<div><canvas bind:this={ canvas }></canvas></div>
