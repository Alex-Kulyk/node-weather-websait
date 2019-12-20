const request = require("request");

const forecast = (latitude, longitude, callback) => {
  const url =
    "https://api.darksky.net/forecast/13b2ebda0d1b13f4074c8493e14a17af/" +
    encodeURIComponent(latitude) +
    "," +
    encodeURIComponent(longitude) +
    " ";
  request({ url, json: true }, (error, { body }) => {
    if (error) {
      callback("Cant connect to server", undefined);
    } else if (body.error) {
      callback("Unable to find location", undefined);
    } else {
      callback(
        undefined,
        `It is currently ${body.currently.temperature}, ${body.daily.data[0].summary}, wind speed is ${body.currently.windSpeed}`
      );
    }
  });
};

module.exports = forecast;
