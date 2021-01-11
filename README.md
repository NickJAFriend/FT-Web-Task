# FT Web-Task

## Welcome to the Web Task... 
This is a task that has been set by the Financial Times. The target is to: 
 - fetch an array of URLs which contain JSON data
 - return their contents in a promise
  
>It's amazing that the amount of news that happens in the world every day always just exactly fits the newspaper - Jerry Seinfeld

### Let us begin...
***
This code indicates that the process will be analysed for performance. We use the perf_hooks module (native to node.js) to gather a time in milliseconds, right now.
```
const {performance} = require('perf_hooks')
let _start = performance.now()
```
Protecting the timer will allow us to have better access to our meta information - this is why we use the _ prefix.
This came from the infamous underscore.js - an invaluable library to develop and manipulate data, long before ECMA6 and later (post 2016). \
See this [Link to Underscore.JS](https://underscorejs.org/) - their libraries are very useful and provide efficient and fast acting resources.

### If we can monitor performance, we can truly understand why we are computing...
#### Efficeincy - Measuring with time: what does it tell us?
***
As we measure our code time and time again, with time, we find that our figures vary. \
This is due to a range of factors such as CPU load, priority, other programs being used by the interpreted language or other factors. It is quite important to use a machine for time testing that is not executing too much other code... i.e. is (mostly) idle. \
Measuring with time gives us a reasonable idea of how efficient our constants are, in time, so we can measure computing in a logical, algegraic way. \
See [Big O Notation](https://en.wikipedia.org/wiki/Big_O_notation) - the diagrams should show the difference between the linear, contstant and expenential approaches to alogirthms and how they can be expressed. It is of course the timer that measures the actual data to solve the *Big O* solution. \

