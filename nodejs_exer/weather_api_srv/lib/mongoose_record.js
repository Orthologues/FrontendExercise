// this script tests storage of API queries using mongoose

import mongoose from 'mongoose';
const mongoUrl = 'mongodb://localhost:27017';

export default async (weatherInfo, systemTime) => {
  mongoose.connect(`${mongoUrl}/openWeatherAPI`, {
    useNewUrlParser: true,
    useUnifiedTopology: true
  });
  const weatherSchema = new mongoose.Schema({
    cityName: String,
    systemTime: String,
    temperature: String,
    feelsLike: String,
    humidity: String,
    wind: String,
    visibility: String,
    iconUrl: String
  });
  // create a new collection under ${dbName} using ${weatherSchema}, using ${systemTime} as the name of the new collection
  const Weather = mongoose.model(systemTime, weatherSchema);
  // define information from ${weatherInfo} to collection ${Weather}
  const weather = new Weather({
    cityName: weatherInfo[0],
    systemTime: weatherInfo[1],
    temperature: weatherInfo[2],
    feelsLike: weatherInfo[3],
    humidity: weatherInfo[4],
    wind: weatherInfo[5],
    visibility: weatherInfo[6],
    iconUrl: weatherInfo[7]
  });
  // add information from ${weatherInfo} to collection ${Weather}
  weather.save();
}
