'use strict'
//Time results using '_end' subtract '_start' milliseconds... Timer object comes from 'performance' in 'perf_hooks'
const {performance} = require("perf_hooks")
let _start = performance.now()
//Request URLs using 'fetch' from 'node-fetch'
const fetch = require("node-fetch")

console.log('Beginning FT-Web-Task...')

function requestMultipleUrls(urls){
    
    let results = Promise.all(urls.map(url =>
        fetch(url)
             .then(checkStatus)
             .then(parseJSON)
            
    ))
    .catch(error => console.log(`There was a problem fetching a URL! \n${error}`))

    return results;
}

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

const urls = [
    'https://ft-tech-test-example.s3-eu-west-1.amazonaws.com/ftse-fsi.json',
    'https://ft-tech-test-example.s3-eu-west-1.amazonaws.com/gbp-hkd.json',
    'https://ft-tech-test-example.s3-eu-west-1.amazonaws.com/gbp-usd.json'
]

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
