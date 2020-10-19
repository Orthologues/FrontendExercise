//this server uses ES6 syntax
//use nodemon to launch this server, 'nodemon express_srv.js'
import express from 'express';
const app = express();
import https from 'https';
import bodyParser from 'body-parser';
import fs from 'fs';
// this is static import, doesn't work for async functions
import { default as weatherInfo, windDirection as windDirec } from './lib/weather_API_info.js'
// __dirname isn't predefined in ES6 syntax
import path from 'path';
console.log(JSON.stringify(import.meta));
const moduleURL = new URL(import.meta.url);
console.log(`pathname ${moduleURL.pathname}`);
console.log(`dirname ${path.dirname(moduleURL.pathname)}`);
const __dirname = path.dirname(moduleURL.pathname);
// __dirname means the current folder
var queryTimes = 0;

// use bodyParser.json() to parse json-type data in request from $.ajax()
app.use(bodyParser.json());
// mount the path of static files under ./src to /assets
app.use('/assets', express.static(path.join(__dirname, 'src')));
// mount distributable jquery path to '/asset/jquery' as middleware
app.use('/assets/jquery', express.static(path.join(__dirname, 'node_modules/jquery/dist')))

app.get("/", (req, res) => {
  // test whether module importation above is successful
  console.log(windDirec('170'));
  let index_html = path.join(__dirname, 'index.html');
  if (fs.existsSync(index_html)) {
    res.sendFile(index_html);
  } else {
    res.send('Sorry, the page you are looking for doesn\'t exist!');
  }
});

// in order to call async function 'weatherInfo', add 'async' before (req,res)
app.post("/save", async (req, res) => {
  let weather = [];
  // $.ajax() is an asynchronous function, use 'await' to render code synchronous
  const query = await req.body;
  console.log(query);
  weather = await weatherInfo(req.body.cityName, req.body.unit);
  console.log(weather);
  if (weather.length > 1){
    queryTimes++;
  }
  console.log(`You have successfully search weather of ${queryTimes} cities.`);
  res.redirect('/');
});

app.listen(3550, () => {
  console.log("local host 3550");
  // check localhost:3550 at your browser
});
