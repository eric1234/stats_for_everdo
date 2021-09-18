import { Interval } from 'luxon'

// Iterating a luxon interval by day is a bit annoying. This returns an
// array of luxon DateTime objects for the given start/end. Note that the
// `end` is included in the array. This means this function is fully open
// instead of half-open like a luxon interval.
export function dateRange(start, end) {
  const afterEnd = end.plus({ days: 1 })
  return Interval.fromDateTimes(start, afterEnd).splitBy({ days: 1 }).map(i => i.start)
}

// The toFormat() function for a duration is pretty limited so doing my own.
export function formatDuration(duration) {
  const units = normalizeDuration(duration).toObject()
  return Object
    .keys(units)
    .map(unit => {
      if( units[unit] > 0 && unit != 'seconds' )
        return `${units[unit]}${unit.charAt(0)}`
    })
    .filter(segment => segment)
    .join(' ')
}

export function roundToLargestDuration(duration) {
  const units = normalizeDuration(duration).toObject()
  const largestUnit = Object
    .keys(units)
    .find(unit => units[unit] > 0)
  if( !largestUnit ) return 0

  return `${units[largestUnit]} ${largestUnit}`
}

function normalizeDuration(duration) {
  return duration
    .shiftTo('years', 'months', 'days', 'hours', 'minutes', 'seconds')
    .normalize()
}
