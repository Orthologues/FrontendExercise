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

// axios.get() returns to a promise, 'then' waits until the promise is resolved
async function getWeatherInfo(city, unit) {
  const units = unit;
  const url = `${API_header}${city}&units=${units}&appid=${apiKey}`;
  let weatherInfo = [];
  const dtObj = await axios.get(url).then(response => response.data).catch(err => {
    weatherInfo = [`${err.message}. Sorry, your query was invalid, please type in an actual city name.`];
  });
  // if error was caught, return immediately
  if (weatherInfo.length == 1){
    return weatherInfo;
  }
  let iconUrl = `https://openweathermap.org/img/wn/${dtObj.weather[0].icon}@2x.png`;
  weatherInfo.push(iconUrl);
  let nameStr = `city: ${dtObj.name}, country: ${dtObj.sys.country}`;
  weatherInfo.push(nameStr);
  let tempStr = `temperature: ${dtObj.main.temp.toFixed(1)}°C`;
  weatherInfo.push(tempStr);
  let feelingTempStr = `feels like: ${dtObj.main.feels_like.toFixed(1)}°C`;
  weatherInfo.push(feelingTempStr);
  let humidityStr = `humidity: ${dtObj.main.humidity}%`;
  weatherInfo.push(humidityStr);
  let windDirection = getWindDirec(dtObj.wind.deg);
  let windStr = `wind: ${dtObj.wind.speed}m/s, ${windDirection}`;
  weatherInfo.push(windStr);
  // https.get is asynchronous, its return value would be 'undefined' without using 'res.on('end',function(){})'
  return weatherInfo;
}

export {
  getWeatherInfo as default, getWindDirec as windDirection,
};
