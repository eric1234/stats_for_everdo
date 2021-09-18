import { sum } from 'lodash'

import { dateRange } from './dates'

// Generic average function. How is this not in lodash?
export const avg = list => Math.round(sum(list) / list.length)

// Counts the number of tasks where the callback is true
export const countIf = (item, cb) => item.reduce((t, i) => t + (cb(i) ? 1 : 0), 0)

// Iterates through the dates in the range. For each day runs the callback
// to get the raw value for that day. It then averages with the last X
// days (based on configured rollingDays) to get a rolling value for each day
export function rolling(days, rollingDays, callback) {
  const raw = {}

  // Calculate raw values for days preceding date range so we can determine
  // the correct rolling average
  const preDaysStart = days[0].minus({ days: rollingDays - 1 })
  const daysForRolling = dateRange(preDaysStart, days[0])
  daysForRolling.forEach(day => raw[day] = callback(day))

  return days.map(day => {
    raw[day] = callback(day)

    const lookup = d => raw[d]
    const rollingStart = day.minus({ days: rollingDays - 1 })
    const rollingAverage = avg(dateRange(rollingStart, day).filter(lookup).map(lookup))

    return rollingAverage || 0
  })
}
