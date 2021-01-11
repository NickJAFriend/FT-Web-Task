# FT-Web-Task

## Welcome to the Web Task... 
This is a task that has been set by the Financial Times. The target is to: 
 - fetch an array of URLs which contain JSON data
 - return their contents in a promise
  
>It's amazing that the amount of news that happens in the world every day always just exactly fits the newspaper - Jerry Seinfeld

### Let us begin...
***
This code indicates that the process will be analysed for performance. We use the perf_hooks module (native to node.js) to gather a time in milliseconds, right now.
```javascript
const {performance} = require('perf_hooks')
let _start = performance.now()
```
Protecting the timer will allow us to have better access to our meta information - this is why we use the _ prefix.
This came from the infamous underscore.js - an invaluable library to develop and manipulate data, long before ECMA6 and later (post 2016). 

See this [Link to Underscore.JS](https://underscorejs.org/) - their libraries are very useful and provide efficient and fast to compute resources for almost every use of data types in Javascript.

### Efficiency - Measuring with and without time...

> If we can monitor performance, we can truly understand the merits of different solutions... It is the essence of computing...
***

As we measure our code time and time again, with time, we find that our figures vary. 
This is due to a range of factors such as CPU load, priority, other programs being used by the interpreted language or virtual machine, or other factors. 
It is usually important to use a machine for time testing that is not executing too much other code - i.e. is (mostly) idle. Pagination and virtual memory is also a factor in performance speed - so having a reasonable amount of memory available for the task is absolutely critical.
Thinking with efficiency in mind gives us a reasonable idea of how efficient our solutions are, in time, so we can measure computing in a logical, algegraic way and solve our solutions without having to prototype over and over, again and again. 
Once you understand time notation *(Big O notation)* you can always learn from your prototypes... Your logic can improve every time you program...

See [Big O Notation](https://en.wikipedia.org/wiki/Big_O_notation) - the diagrams should show the difference between the linear, contstant and exponential approaches to alogirthms and how they can be expressed. You will find logical answers rather than just seconds and minutes to compare recursion, iteration and more...

It is of course the timer that measures the actual data to solve the *Big O* solution into **real** terms. We incorperate the timer measures in the code. This is a simple logical compromise but it is necessary to be able to calculate the **real** answer and even find compromising factors in the machine environment. 

Our time computation calculation code is completed using the following statement which follows on from the above code snippet.
```javascript
let _stop = performance.now()
let _timetaken = _stop - _start
```

Typically when computing time efficiency in Node.JS, it is best to execute the final performance task in the final batch of the last *Promise* as follows...
```javascript
Promise.resolve( () => { doTasksHere() } ).catch( (error) => { handle(error) }).finally( stopClockHere() )
```
If you are looking to understand the maximum and minimum time your code will typically execute in, you should send the time results to a log (file or server).

***

### Part one of the solution -> Fetching the results of the urls in JSON and placing them in an array...

Node.JS includes an http interface but the joy of using Node.JS is the middleware that is available so simply via the require interface and the node pacakge manager (NPM). The 'http' interface is a joy to use but it includes both client and server architecture and so isn't entirely suitable for a lean approach to fetching data.
The 'fetch' interface is however entirely suitable for this. It has minimal, effective methods to find the outcome in HTTP (for example a 200 'status' code which equals 'OK' from the headers of the HTTP response and then retreive the data or 'body' of the HTTP response) and even parse the data into JSON rather than leaving it in UTF-8 or whatever encoding/ charset the HTTP webserver has given the body to us in. 

The code provided (shown below) shows a function ready to call the URLs (API endpoints) asynchronously and upon retreiving that Promise's resolve, gives space for the coder to handle the data and complete the aforementioned task.

```javascript
const requestMultipleUrls = require('request-multiple-urls');
const urls = [
       'https://ft-tech-test-example.s3-eu-west-1.amazonaws.com/ftse-fsi.json',
       'https://ft-tech-test-example.s3-eu-west-1.amazonaws.com/gbp-hkd.json',
       'https://ft-tech-test-example.s3-eu-west-1.amazonaws.com/gbp-usd.json'
];
requestMultipleUrls(urls).then(urlContent => {
       ...
});
```


