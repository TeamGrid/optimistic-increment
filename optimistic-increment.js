import { check } from 'meteor/check'
import { Tracker } from 'meteor/tracker'
import { reactiveInterval } from 'meteor/teamgrid:reactive-interval'


const _values = {}
export function optimisticIncrement(identifier, value, precision = 1) {
  check(identifier, String)
  check(precision, Number)
  check(value, {
    current: Number,
    increment: Number,
  })

  if (!_values[identifier]) _values[identifier] = {}
  const computation = Tracker.currentComputation ? Tracker.currentComputation._id : 'none'
  let val = _values[identifier][computation] || {}
  if (val.start !== value.current || val.increment !== value.increment) {
    _values[identifier][computation] = {
      start: value.current,
      current: value.current,
      increment: value.increment,
    }
    val = _values[identifier][computation]
  }
  if (value.increment === 0) return val.current

  if (value.increment > 0) {
    const interval = 1000 / (value.increment / precision) // interval in milliseconds
    reactiveInterval(interval) // reactivity
    _values[identifier][computation].current = val.current + precision
  } else {
    const interval = 1000 / ((value.increment * -1) / precision) // interval in milliseconds
    reactiveInterval(interval) // reactivity
    _values[identifier][computation].current = val.current - precision
  }
  return _values[identifier][computation].current
}
