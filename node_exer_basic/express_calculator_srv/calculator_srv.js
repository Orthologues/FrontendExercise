// install nodemon to make it easier to autostart server

const express = require('express');
const app = express();
const path = require('path');
const bodyParser = require("body-parser");
const jsdom = require('jsdom');


function parseData_DOM(html) {
  const {
    JSDOM
  } = jsdom;
  const dom = new JSDOM(html);
  const $ = (require('jquery'))(dom.window);
  // to be continued
}

// __dirname means the current folder
// add static files to route
app.use(express.static(path.join(__dirname, 'src')));

// use body-parser to parse form request
app.use(bodyParser.urlencoded({
  extended: true
}));

// "/" means root route of the listened port
app.get("/", function(req, res) {
  res.send("<h1>Carpe diem!</h1>");
});

app.get("/BMI", function(req, res) {
  res.sendFile(path.join(__dirname, 'src/BMIcalculator.html'));
});

function calculate_BMI(height, weight) {
  height = Number(height) / 100;
  let BMI = Number(weight) / Math.pow(height, 2);
  // if height or weight isn't a number, then BMI isn't a number, throw err
  if (isNaN(BMI)) {
    throw 'Invalid input';
  } else {
    // round BMI to 2 numbers after dot
    return "Your BMI is " + BMI.toFixed(2).toString();
  }
}

// calculate BMI by parsing form request
app.post("/", function(req, res) {
  try {
    let BMI = calculate_BMI(req.body.height, req.body.weight);
    res.send(BMI);
  } catch (e) {
    res.send("Your input should be number!");
  } finally {}
});

app.listen(3500, function() {
  console.log("local host 3500");
  // check localhost:3500 at your browser
});
