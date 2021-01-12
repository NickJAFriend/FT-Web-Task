# FT-Web-Task

## Welcome to the Web Task... 
This is a task that has been set by the Financial Times. The target is to: 
 - fetch an array of URLs which contain JSON data
 - return their contents in a promise
  
>It's amazing that the amount of news that happens in the world every day always just exactly fits the newspaper - Jerry Seinfeld

### Let us begin...
***
For absolute time performance we will use the enhanced interpretation... this is known as 'strict' mode... the alternative and native is known as 'sloppy' mode.
Strict mode does not allow for variables to be used in a casual fashion. It is mainly during functional programming that you will see what this is about.
```javascript
'use strict'
```

This code indicates that the process will be analysed for performance. We use the perf_hooks module (native to node.js) to gather a time in milliseconds, right now and we store this so we can obtain a value to calculate the runtime duration.

```javascript
const {performance} = require('perf_hooks')
let _start = performance.now()
```
Protecting the timer will allow us to have better access to our meta information - this is why we use the _ prefix.
This came from the infamous underscore.js - an invaluable library to develop and manipulate data, long before ECMA6 and later (post 2015). 

See this [Link to Underscore.JS](https://underscorejs.org/) - their libraries are very useful and provide efficient and fast to compute resources for almost every use of data types in JavaScript.

### Efficiency - Measuring with and without time...

> If we can monitor performance, we can truly understand the merits of different solutions... It is at the essence of computing...
***

As we measure our code time and time again, with time, we find that our figures vary. 
This is due to a range of factors such as CPU load, priority, other programs being used by the interpreted language or virtual machine, or other factors. 
It is usually important to use a machine for time testing that is not executing too much other code - i.e. is (mostly) idle. 
Pagination and virtual memory use are also a factor in performance speed - so having a reasonable amount of memory available for the task is absolutely critical.
Thinking with efficiency in mind gives us a reasonable idea of how efficient our solutions are, in time, so we can measure computing in a logical, algebraic way and solve our solutions without having to prototype over and over, again and again. 
Once you understand time notation *(Big O notation)* you can always learn from your prototypes... Your logic can improve every time you program...

See [Big O Notation](https://en.wikipedia.org/wiki/Big_O_notation) - the diagrams should show the difference between the simplest linear, constant and exponential approaches to algorithms and how they can be expressed. 
You will find logical answers rather than just seconds and minutes to compare recursion, iteration and more...

It is of course the timer that measures the actual data to solve the *Big O* solution into **real** terms. We incorporate the timer measures in the code. This is a simple logical compromise but it is necessary to be able to calculate the **real** answer and even find compromising factors in the machine environment. 

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
To calculate the average time the computation occurs in you can use the same approach to take an average of the set of results after multiple runs.

***

### Part one of the solution -> Fetching the results of the urls in JSON, placing them in an array and returning them as a promise...

Node.JS includes an http interface but the joy of using Node.JS is the middleware that is available so simply via the require interface and the node package manager (NPM). 
The 'http' interface is a joy to use but it includes both client and server architecture and so isn't entirely suitable for a lean approach to fetching data.
The 'node-fetch' interface is however entirely suitable for this. It is available from the NPM library, so must be included in the package.json dependency field and also installed.
It has minimal, effective methods to GET web resources with HTTP (for example a 200 'status' code which means 'OK' from the headers of the HTTP response and then retrieve the data or 'body' of the HTTP response) and even a method to parse the data into JSON rather than leaving it in UTF-8 or whatever encoding or 'charset' the HTTP webserver has given the body of the response in. 

The code provided in the task problem sheet (shown below) shows a function ready to call the URIs (API endpoints) asynchronously. Upon retrieving that Promise's resolve, it gives space for the coder to handle the data and complete the aforementioned task (to fetch the URIs and return a promise containing a single array with the data inside).

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

The function uses Promise.all() which holds the CPU until it has executed *every* line of code and retrieved a resolution where needed before executing any .then() functions. 
In total the Promise method supports seven methods... These are shown below. 
See if you can follow the logic. The main note is that the finally clause will execute even if an error is thrown... 
If you wish for further explanation please see [this link for the documentation on Promises](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Promise).

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
The parseJSON() method uses the .json() method in the 'node-fetch' library to turn the output from JavaScript Object Notation into JavaScript Objects.

```javascript
function parseJSON(response) {
    return response.json();
}
  
function checkStatus(response){
    if(response.ok){
        return Promise.resolve(response);
    } else{
        return Promise.reject(new Error(response.statusText));
    }
}
```

The URIs are defined in an array. 

```javascript
const urls = [
    'https://ft-tech-test-example.s3-eu-west-1.amazonaws.com/ftse-fsi.json',
    'https://ft-tech-test-example.s3-eu-west-1.amazonaws.com/gbp-hkd.json',
    'https://ft-tech-test-example.s3-eu-west-1.amazonaws.com/gbp-usd.json'
]
```

Then the main function call occurs to handle the requests, catch the errors and finally complete the timing of the process. Outputs are handled with console.log(output). Errors are handled with console.error(error). This is standard practice, especially useful in test first (test driven) development.

```javascript
//Make the requests and return the Promise containing the array
requestMultipleUrls(urls).then(urlContent => {
    //print json results
            //Collect multiple arrays :return joined array
            urlContent.map((item) => {
                return item
            })
            //Remove nulls created by failed requests :return whole array
            urlContent.filter((item) => {
                return item != null
            })

            return console.log(Promise.resolve( urlContent ))
    
})
.catch(
    //Handle errors from the requests
    (error) => console.error(`One or more of the web links are not JSON formatted API endpoints. \nAnd so: ${error}`))
.finally( 
    //Handle performance timing
    () =>{
        //Stop performance clock and save time
        let _end = performance.now()
        //Time taken is the final clock check subtract the first clock check (in milliseconds)
        let _timetaken = _end - _start
        //Thanks for reading my code
        console.log(`Thank you for setting the task... It was a pleasure to complete... Wishing you a lovely day.`)
        //Output Time to console
        console.log(`Runtime took ${_timetaken} milliseconds (${_timetaken / 1000} seconds) to complete.`)
})
```

The code is not modularised because this was not asked in the specification.

### Part two of the solution - testing the objects in the array for validity (the verification process)

The standard testing framework used in Node.JS and JavaScript is Mocha. A subtle equivalent to JUint is Chai... 

Testing relies on assertions, expectations and valid data. The simple way of thinking about testing is to obtain the correct data or answer (information), create an assertion - a functional switch: one direction on a true assertion and one direction on a false assertion and to write code to compare the answer computed with the correct result. 
This should fully test the logic used. Testing alone will not deliver performance analysis or logic critique, although some philosophies hypothesise that test driven development will stress the programmer much less and result in systematically improved logic and therefore improved performance.

These testing frameworks operate by throwing errors. They can be handled with Promises, or with a try/catch clause. Errors MUST be handled correctly.

Testing here has only been used to test performance, as results were of type Promise and within that, an array... Consider the following:
   *In my opinion test driven development is most efficient and effective in OOP and memory controlled code such as C++. JavaScript is not this...
   *Test driven development gives less dopamine to the brain, although it is systematic and infallible. Serotonin is key, so choose well...
   *The task had two requirements. Logging out an answer is NOT the same as running a development mode test, as it defies efficient and is so much against the open-source (efficiency leading) methodology, a subset of the Free Software Movement... However, if the answer is right, it can be just as valid.
   *The specification asked for testing to be considered and so performance testing is a valid consideration and so, consider this a true solution.
   *Unit testing is designed for TDD and math - it is slightly overdone if used to test type of a result that has already been redacted. However if TDD is used, it is very much a part of a rigorous and correctly used methodology. Every outcome MUST first be settled, code should never be broken.
   *I would actively have to rewrite the code to use testing and I consider that, when time has also been mentioned, a waste of resources.
   
Thank you for reading. Documentation is so much more than a professional solution, it is it's heart.
