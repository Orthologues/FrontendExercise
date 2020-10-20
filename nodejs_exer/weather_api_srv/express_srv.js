//this server uses ES6 syntax
//use nodemon to launch this server, 'nodemon express_srv.js'
import express from 'express';
const app = express();
import https from 'https';
import bodyParser from 'body-parser';
import fs from 'fs';
// in order to read .txt file line by line into an array, a line-reading stream is needed
import readline from 'readline';
import stream from 'stream';
// this is static import, doesn't work for async functions
import {
  default as weatherInfo,
  windDirection as windDirec
} from './lib/weather_API_info.js'
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
// use this .txt file as database record
const record_path = './db/weatherAPI_tempData.txt';
// use bodyParser.json() to parse json-type data in request from $.ajax()
app.use(bodyParser.json());
// mount the path of static files under ./src to /assets
app.use('/assets', express.static(path.join(__dirname, 'src')));
// mount distributable jquery path to '/asset/jquery' as middleware
app.use('/assets/jquery', express.static(path.join(__dirname, 'node_modules/jquery/dist')))
var num_success = 0;

async function writeDBtxt(weatherInfo) {
  await fs.writeFile(record_path, '', 'utf8', (data, err) => {
    if (err) {
      throw new Error('Database file writing failed!');
    }
  });
  for (let info of weatherInfo) {
    await fs.appendFile(record_path, `${info}\n`, 'utf8', (data, err) => {
      if (err) {
        throw new Error('Database file appending failed!');
      }
    });
  }
}

// defines the root route
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
app.post("/openWeatherAPI", async (req, res, next) => {
  // $.ajax() is an asynchronous function, use 'await' to render code synchronous
  const query = await req.body;
  let weather = [];
  weather = await weatherInfo(req.body.city_name, req.body.unit);
  if (weather.length > 1) {
    num_success++;
    try {
      await writeDBtxt(weather);
      // read .txt db file line by line, then send data back to client side
      let weather_txt = [];
      let instream = fs.createReadStream(record_path);
      let outstream = new stream;
      let rlInterface = readline.createInterface(instream, outstream);
      rlInterface.on('line', line => {
        weather_txt.push(line);
      });
      rlInterface.on('close', () => {
        res.send({
          data: weather_txt
        });
      });
    } catch (e) {
      res.send({
        // has to be an object(array) to order to be handled at client-side function "html_show_weather(weather)"
        data: ["Sorry, this web app faced a technical issue!", e.message]
      });
    }
  } else if (weather.length == 1) {
    res.send({
      data: weather
    });
  } else if (weather.length == 0) {
    res.send({
      // has to be an object(array) to order to be handled at client-side function "html_show_weather(weather)"
      data: ["Sorry, this web app faced a technical issue!"]
    });
  }
});

app.listen(3550, () => {
  console.log("local host 3550");
  // check localhost:3550 at your browser
});
