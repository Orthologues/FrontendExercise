import axios from 'axios';

const API_header = 'https://api.openweathermap.org/data/2.5/weather?q=';
const apiKey = '616238293f117bda325f7358a4c5982f';

function getWindDirec(degree) {
  let deg = parseFloat(degree);
  if (deg > 180) {
    deg -= 360;
  }
  if (deg > -22.5 && deg <= 22.5) {
    return 'North';
  } else if (deg > 22.5 && deg <= 67.5) {
    return 'Northeast';
  } else if (deg > 67.5 && deg <= 112.5) {
    return 'East';
  } else if (deg > 112.5 && deg <= 157.5) {
    return 'Southeast';
  } else if ((deg > 157.5 && deg <= 180) || (deg <= -157.5 && deg >= -180)) {
    return 'South';
  } else if (deg > -157.5 && deg <= -112.5) {
    return 'Southwest';
  } else if (deg > -112.5 && deg <= -67.5) {
    return 'West';
  } else if (deg > -67.5 && deg <= -22.5) {
    return 'Northwest';
  } else {
    return 'Direction Unknown';
  }
}

// axios.get() returns to a promise, 'then' returns a promise and is used in chaining
async function getWeatherInfo(city, unit) {
  const url = `${API_header}${city}&units=${unit}&appid=${apiKey}`;
  let weatherInfo = [];
  let t_unit = '';
  const dtObj = await axios.get(url).then(promise => promise.data).catch(err => {
    weatherInfo = [`${err.message}. Sorry, your query was invalid, please type in an actual city name.`];
  });
  // if error was caught, return immediately
  if (weatherInfo.length == 1) {
    return weatherInfo;
  }
  let nameStr = `${dtObj.name}, country: ${dtObj.sys.country}`;
  weatherInfo.push(nameStr);
  let today = new Date();
  let date = `${today.getFullYear()}-${(today.getMonth() + 1)}-${today.getDate()}`;
  let time = `${today.getHours()}:${today.getMinutes()}:${today.getSeconds()}`;
  let dateTime = `${date} ${time}`;
  weatherInfo.push(dateTime);
  // determine units of temperature according to 'unit'
  switch (unit) {
    case 'metric':
      t_unit = 'C';
      break;
    case 'imperial':
      t_unit = 'F';
      break;
    default:
      t_unit = 'K';
  }
  let tempStr = `temperature: ${dtObj.main.temp.toFixed(1)}°${t_unit}`;
  weatherInfo.push(tempStr);
  let feelingTempStr = `feels like: ${dtObj.main.feels_like.toFixed(1)}°${t_unit}`;
  weatherInfo.push(feelingTempStr);
  let humidityStr = `humidity: ${dtObj.main.humidity}%`;
  weatherInfo.push(humidityStr);
  let windDirection = getWindDirec(dtObj.wind.deg);
  let windStr = `wind: ${dtObj.wind.speed}m/s, ${windDirection}`;
  weatherInfo.push(windStr);
  let visibilityStr = `visibility: ${dtObj.visibility}m`;
  weatherInfo.push(visibilityStr);
  let iconUrl = `https://openweathermap.org/img/wn/${dtObj.weather[0].icon}@2x.png`;
  weatherInfo.push(iconUrl);
  // https.get is asynchronous, its return value would be 'undefined' without using 'res.on('end',function(){})'
  return weatherInfo;
}

export {
  getWeatherInfo as
  default, getWindDirec as windDirection,
};
