export default class Task {
  constructor() {
    this.areas = []
    this.labels = []
  }

  isCreatedOn(day) {
    return this.createdAt.hasSame(day, 'day')
  }

  isCreatedDuring(days) {
    return this._isDuring(days, 'createdAt')
  }

  isCompletedOn(day) {
    return this.completedAt && this.completedAt.hasSame(day, 'day')
  }

  isCompletedDuring(days) {
    if( !this.completedAt ) return false

    return this._isDuring(days, 'completedAt')
  }

  isOpenOn(day) {
    return this.isStartedAsOf(day) && this.isIncompleteAsOf(day)
  }

  isStartedAsOf(day) {
    return this.createdAt.startOf('day') <= day
  }

  isIncompleteAsOf(day) {
    if( !this.completedAt ) return true
    return this.completedAt > day.endOf('day')
  }

  // NOTE: Assume days are consequitive and therefore first and last are the
  // smallest and greatest respectively. Also assume all days are at the start
  // of that day (but the accessor might not be)
  _isDuring(days, accessor) {
    const val = this[accessor].startOf('day')
    const last = days[days.length-1]
    return days[0] <= val && val <= last
  }
}
