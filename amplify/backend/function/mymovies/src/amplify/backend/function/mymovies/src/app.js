/*
Copyright 2017 - 2017 Amazon.com, Inc. or its affiliates. All Rights Reserved.
Licensed under the Apache License, Version 2.0 (the "License"). You may not use this file except in compliance with the License. A copy of the License is located at
    http://aws.amazon.com/apache2.0/
or in the "license" file accompanying this file. This file is distributed on an "AS IS" BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
See the License for the specific language governing permissions and limitations under the License.
*/


var axios = require('axios');
const publicIp = require("react-public-ip");
var express = require('express')
var bodyParser = require('body-parser')
var awsServerlessExpressMiddleware = require('aws-serverless-express/middleware')

// declare a new express app
var app = express()
app.use(bodyParser.json())
app.use(awsServerlessExpressMiddleware.eventContext())

// Enable CORS for all methods
app.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*")
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept")
  next()
});


/**********************
 * Example get method *
 **********************/

app.get('/mymovies', async function(req, res) {
  const ipv4 =  await publicIp.v4() || "";
  axios
  .get(
    `http://ip-api.com/json/${ipv4}`
  ).then(data => {
    console.log(`http://ip-api.com/json/${ipv4}`);
    console.log(data.data);

    var country = data.data.countryCode;

    axios
      .get(
        `https://api.themoviedb.org/3/movie/top_rated?api_key=196a5e62d61a85e1a4d7aa52c237c10d&region=${country}`
      )
      .then(resp => {
        console.log(`https://api.themoviedb.org/3/movie/top_rated?api_key=196a5e62d61a85e1a4d7aa52c237c10d&region=${country}`);
        console.log(resp);
      })
      .catch((function (err) {
        console.log(err);
      })
      );
  })
  res.json({success: 'get call succeed!', url: req.url, body: resp.data.results});
});

app.get('/mymovies/*', function(req, res) {
  // Add your code here
  res.json({success: 'get call succeed!', url: req.url});
});

/****************************
* Example post method *
****************************/

app.post('/mymovies', function(req, res) {
  // Add your code here
  res.json({success: 'post call succeed!', url: req.url, body: req.body})
});

app.post('/mymovies/*', function(req, res) {
  // Add your code here
  res.json({success: 'post call succeed!', url: req.url, body: req.body})
});

/****************************
* Example put method *
****************************/

app.put('/mymovies', function(req, res) {
  // Add your code here
  res.json({success: 'put call succeed!', url: req.url, body: req.body})
});

app.put('/mymovies/*', function(req, res) {
  // Add your code here
  res.json({success: 'put call succeed!', url: req.url, body: req.body})
});

/****************************
* Example delete method *
****************************/

app.delete('/mymovies', function(req, res) {
  // Add your code here
  res.json({success: 'delete call succeed!', url: req.url});
});

app.delete('/mymovies/*', function(req, res) {
  // Add your code here
  res.json({success: 'delete call succeed!', url: req.url});
});

app.listen(3000, function() {
    console.log("App started")
});

// Export the app object. When executing the application local this does nothing. However,
// to port it to AWS Lambda we will create a wrapper around that will load the app from
// this file
module.exports = app
