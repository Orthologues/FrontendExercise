//this server uses ES6 syntax
//use nodemon or node to launch this server, like 'nodemon express_srv.js'
import express from 'express';
const app = express();
import bodyParser from 'body-parser';
import fs from 'fs';

// import these functions to get information about weather
import {
  default as weatherInfo,
  windDirection as windDirec
} from './lib/weather_API_info.js'

// define a const ${sysTime} to record the time which this script starts
const today = new Date();
const date = `${today.getFullYear()}_${(today.getMonth() + 1)}_${today.getDate()}`;
const time = `${today.getHours()}_${today.getMinutes()}_${today.getSeconds()}`;
const sysTime = `${date}_${time}`;
// create this array to record the feedback of all successful queries, then add it to mongodb
var weatherRecords = [];
import {
  default as saveWeatherInfo2Mongodb
} from './lib/mongoose_record.js'

//to launch mongodb, spawn a detached childProcess and run 'brew services start mongodb-community@4.4'
import {
  spawn
} from 'child_process';
spawn('brew', ['services', 'start', 'mongodb-community@4.4'], {
  detached: true,
  stdio: 'ignore'
});

// __dirname isn't predefined in ES6 syntax
import path from 'path';
console.log(JSON.stringify(
  import.meta)); //import.meta is an object
const moduleURL = new URL(
  import.meta.url); //import.meta.url is an object as well
console.log(`pathname ${moduleURL.pathname}`);
console.log(`dirname ${path.dirname(moduleURL.pathname)}`);
// __dirname means the current folder
const __dirname = path.dirname(moduleURL.pathname);

// add middlewares
// use bodyParser.json() to parse json-type data in request from $.ajax()
app.use(bodyParser.json());
// mount the path of static files under ./src to /assets
app.use('/assets', express.static(path.join(__dirname, 'src')));
// mount distributable jquery path to '/asset/jquery' as middleware
app.use('/assets/jquery', express.static(path.join(__dirname, 'node_modules/jquery/dist')))

// defines the root route
app.get("/", (req, res) => {
  // test whether module importation above is successful
  console.log(windDirec('170'));
  let index_html = path.join(__dirname, 'src/index.html');
  if (fs.existsSync(index_html)) {
    res.sendFile(index_html);
  } else {
    res.send('<h2>Sorry, the page you are looking for doesn\'t exist!</h2>');
  }
});

// in order to call async function 'weatherInfo', add 'async' before (req,res)
app.post("/openWeatherAPI", async (req, res) => {
  // $.ajax() is an asynchronous function, use 'await' to render code synchronous
  const query = await req.body;
  let weather = [];
  weather = await weatherInfo(query.city_name, query.unit);
  if (weather.length > 1) {
    weatherRecords.push(weather);
    res.send({
      res_data: weather
    });
  } else if (weather.length == 1) {
    res.send({
      res_data: weather
    });
  } else if (weather.length == 0) {
    res.send({
      // has to be an object(array) to order to be handled at client-side function "html_show_weather(weather)"
      res_data: ["Sorry, this web app faced a technical issue!"]
    });
  }
});

const server = app.listen(3550, () => {
  console.log("local host 3550");
  // check localhost:3550 at your browser
});

async function writeAndCloseMongodb(sigType) {
  await saveWeatherInfo2Mongodb(weatherRecords, sysTime).catch(err => {
    console.log(err.message);
  });
  // open a new shell to close mongodb
  spawn('brew services stop mongodb-community@4.4', {
    stdio: 'ignore',
    shell: true
  });
  console.log(sigType);
}

// ctrl + c interruption from terminal
process.on('SIGINT', () => {
  server.close(async () => {
    await writeAndCloseMongodb('Signal of interruption');
  });
});

// 'pkill' or 'kill' command from terminal
process.on('SIGTERM', () => {
  server.close(async () => {
    await writeAndCloseMongodb('Signal of termination');
  });
});
