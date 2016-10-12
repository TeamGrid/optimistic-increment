import { Tracker } from 'meteor/tracker'
import { reactiveInterval } from 'meteor/teamgrid:reactive-interval'


const _values = {}
export function optimisticIncrement(opts, value, precision = 1) {
  const options = _.isString(opts)
    ? { identifier: opts , value, precision }
    : opts
  const computation = Tracker.currentComputation ? Tracker.currentComputation._id : 'none'
  const identifier = `${options.identifier}_${computation}`

  if (!_values[identifier]) _values[identifier] = {}
  let val = _values[identifier] || {}
  if (val.start !== options.value.current || val.increment !== options.value.increment) {
    _values[identifier] = {
      start: options.value.current,
      current: options.value.current,
      increment: options.value.increment,
    }
    val = _values[identifier]
  }
  if (options.value.increment === 0) return val.current

  if (options.value.increment > 0) {
    const interval = 1000 / (options.value.increment / options.precision) // interval in milliseconds
    reactiveInterval(interval) // reactivity
    _values[identifier].current = val.current + options.precision
  } else {
    const interval = 1000 / ((options.value.increment * -1) / options.precision) // interval in milliseconds
    reactiveInterval(interval) // reactivity
    _values[identifier].current = val.current - options.precision
  }
  return _values[identifier].current
}
