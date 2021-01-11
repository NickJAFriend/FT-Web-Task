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
It is usually important to use a machine for time testing that is not executing too much other code - i.e. is (mostly) idle. 
Pagination and virtual memory use is also a factor in performance speed - so having a reasonable amount of memory available for the task is absolutely critical.
Thinking with efficiency in mind gives us a reasonable idea of how efficient our solutions are, in time, so we can measure computing in a logical, algegraic way and solve our solutions without having to prototype over and over, again and again. 
Once you understand time notation *(Big O notation)* you can always learn from your prototypes... Your logic can improve every time you program...

See [Big O Notation](https://en.wikipedia.org/wiki/Big_O_notation) - the diagrams should show the difference between the simplest linear, contstant and exponential approaches to alogirthms and how they can be expressed. 
You will find logical answers rather than just seconds and minutes to compare recursion, iteration and more...

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
To calculate the average time the computation occurs in you can use the same approach to take an average of the set of values after multiple runs.

***

### Part one of the solution -> Fetching the results of the urls in JSON and placing them in an array...

Node.JS includes an http interface but the joy of using Node.JS is the middleware that is available so simply via the require interface and the node pacakge manager (NPM). 
The 'http' interface is a joy to use but it includes both client and server architecture and so isn't entirely suitable for a lean approach to fetching data.
The 'node-fetch' interface is however entirely suitable for this. It is available from the NPM library, so must be included in the package.json dependency field and also installed.
It has minimal, effective methods to GET web resources with HTTP (for example a 200 'status' code which means 'OK' from the headers of the HTTP response and then retreive the data or 'body' of the HTTP response) and even a method to parse the data into JSON rather than leaving it in UTF-8 or whatever encoding or 'charset' the HTTP webserver has given the body of the response in. 

The code provided in the task problem sheet (shown below) shows a function ready to call the URIs (API endpoints) asynchronously. Upon retreiving that Promise's resolve, it gives space for the coder to handle the data and complete the aforementioned task (to fetch the URIs and return a promise containing a single array with the data inside).

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
NOTE this code uses semi-colons to break the lines, which isn't actually entirely necessary in Node.JS... I haven't used them but both methods are fine... 

***

The main function is requestMultipleUrls(). It is shown below...

```javascript
function requestMultipleUrls(urls){
    
    let results = Promise.all(urls.map(url =>
        fetch(url)
             .then(checkStatus)
             .then(parseJSON)
            
    ))
    .catch(error => console.log(`There was a problem fetching a URL! \n${error}`))

    return results;
}
```

The function uses Promise.all() which holds the CPU until it has executed *every* line of code and retreived a resolution where needed before executing any .then() functions. 
In total the Promise method supports seven methods... These are shown below. 
See if you can follow the logic. The main note is that the fianlly clause will execute even if an error is thrown... 
If you wish for further explaination please see (this link for the documentation on Promises)[https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Promise].

```javascript
Promise.all( () => {
   //executes all code and Promises, expecting a resolution at all times, otherwise executing .catch() with the error message as a variable...
})

Promise.race( () => {
   //executes all code and Promises, expecting only one resolution (the fasted) and returning a resolved method as soon as one Promise resolves...
   //upon error .catch() is executed with the error message as a variable...
})

let canItBeTrue = new Promise((resolve,reject) => {
   //executes if true
      resolve(message)
   //executes if false
      reject(error)
}).then( () => { doSomethingImmediatelyAfter() }).then( () => { doSomethingJustAfterThat() })
.catch( (error) => { doSomethingUponRejection(error) } )
.finally( () => { doSomethingAfterALLThingsHaveExecuted() })
```

***

The next methods worth explaining are parseJSON() and checkStatus(). These are shown below.
The parseJSON() method uses the .json() method in the 'node-fetch' library to turn the output into JavaScript Object Notation
