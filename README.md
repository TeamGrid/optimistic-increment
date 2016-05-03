# Optimistic increments for Meteor
Reactively increment values with a better user experience.

## Install

Install [`teamgrid:optimistic-increment`](http://atmospherejs.com/teamgrid/optimistic-increment) from Atmosphere:

```bash
meteor add teamgrid:optimistic-increment
```

## Usage
This package export a function called `optimisticIncrement`, which takes three parameters.
````javascript
optimisticIncrement(
  // the first parameter must by a unique id,
  // to identify the value which should be incremented.
  'uniqueID',

  // the second parameter is an object which indicates
  // the current value and the increment per second.
  { current: 0, increment: 10 },

  // the third parameter is the precision and defaults to 1.
  // The precision sets how often the function should rerun.
  // basically it is the value, which will be added to current
  // everytime the function rerun.
  0.01
)
````

## Example
Automatically increment the revenue by 10 per second.
````javascript
  import { optimisticIncrement } from 'meteor/teamgrid:optimistic-increment';
  import { ReactiveVar } from 'meteor/reactive-var'

  const revenue = new ReactiveVar({ current: 0, increment: 0})

  // runs only once and log "0"
  Tracker.autorun(() => {
    current = optimisticIncrement('uniqueID', revenue.get())
    console.log(current);
  })

  // after this line, the revenue will be incremented by 10 per second.
  // The autorun above will rerun every 100ms to add 1 to current.
  revenue.set({ current: 0, increment: 10})
````

## Contributions

Contributions are welcome. Please open issues and/or file Pull Requests.

***

Made by [TeamGrid](http://www.teamgridapp.com).
