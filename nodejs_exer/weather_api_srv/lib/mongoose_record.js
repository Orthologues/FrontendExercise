// this script tests storage of API queries using mongoose

import mongoose from 'mongoose';
const mongoUrl = 'mongodb://localhost:27017';

export default async (weatherInfo, systemTime) => {
  if (weatherInfo.length > 0) {
    mongoose.connect(`${mongoUrl}/openWeatherAPI`, {
      useNewUrlParser: true,
      useUnifiedTopology: true
    });

    // define an array to store all pieces of array ${weatherInfo}
    const weatherRecords = [];
    const weatherSchema = new mongoose.Schema({
      cityName: {
        type: String,
        // add data validation
        required: [true, 'City name missing']
      },
      systemTime: {
        type: String,
        required: [true, 'System time missing']
      },
      temperature: {
        type: String,
        required: [true, 'Temperature missing']
      },
      feelsLike: {
        type: String,
        required: [false, 'Felt-like temperature data missing']
      },
      humidity: {
        type: String,
        required: [true, 'Humidity data missing']
      },
      wind: {
        type: String,
        required: [true, 'Wind data missing']
      },
      visibility: {
        type: String,
        required: [false, 'Visibility data missing']
      },
      iconUrl: {
        type: String,
        required: [true, 'weatherIconUrl missing']
      }
    });
    // create a new model under ${dbName} using ${weatherSchema}, using ${systemTime} as the name of the new collection
    const weatherModel = mongoose.model(systemTime, weatherSchema);

    weatherInfo.forEach((weatherRecord) => {
      // define information from ${weatherRecord} to model ${weather}
      const weather = new weatherModel({
        cityName: weatherRecord[0],
        systemTime: weatherRecord[1],
        temperature: weatherRecord[2],
        feelsLike: weatherRecord[3],
        humidity: weatherRecord[4],
        wind: weatherRecord[5],
        visibility: weatherRecord[6],
        iconUrl: weatherRecord[7]
      });
      weatherRecords.push(weather);
    });

    // insert information of array ${weatherRecords} to ${weatherCollection} in db
    weatherModel.insertMany(weatherRecords, (err) => {
      throw new Error('Error during \'insertMany\'!');
    });
  } else {
    throw new Error('No successful queries during this round');
  }
}
