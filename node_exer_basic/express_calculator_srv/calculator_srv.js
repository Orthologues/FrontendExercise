// install nodemon to make it easier to autostart server

// necessary steps to launch the server and parse req
const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const path = require('path');
const fs = require('fs');
const calculate_BMI = require('./math_lib').calculate_BMI;
var BMI_calc_times = 0;

// __dirname means the current folder
// mount the path of static files under ./src to /assets
app.use('/assets', express.static(path.join(__dirname, 'src')));
// mount distributable jquery path to '/asset/jquery' as middleware
app.use('/assets/jquery', express.static(path.join(__dirname, 'node_modules/jquery/dist')))

// use body-parser to parse form request
app.use(bodyParser.urlencoded({
  extended: true
}));

// "/" means root route of the listened port
app.get("/", function(req, res) {
  res.send("<h1> Carpe diem!</h1>");
});

app.get("/BMI", function(req, res) {
  let index_html = path.join(__dirname, 'src/BMIcalculator.html');
  if (fs.existsSync(index_html)){
    res.sendFile(index_html);
  }else{
    res.send('Sorry, the page you are looking for doesn\'t exist!');
  }
});

// calculate BMI by parsing form request
app.post("/BMI", function(req, res) {
  try {
    let BMI = calculate_BMI(req.body.height, req.body.weight);
    res.send(BMI);
    BMI_calc_times++;
  } catch (e) {
    // by latency of 1000ms here is audio.play() in "assets/script/testJQ.js" able to be executed
    setTimeout(function() {
      res.send(e.message);
    }, 1000);
  } finally {
    console.log('Number of BMIs that have been calculated: ' + BMI_calc_times);
  }
});

app.listen(3500, function() {
  console.log("local host 3500");
  // check localhost:3500 at your browser
});
