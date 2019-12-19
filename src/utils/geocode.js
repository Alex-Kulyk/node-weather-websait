const request = require("request");

const geocode = (address, callback) => {
  const url =
    "https://api.mapbox.com/geocoding/v5/mapbox.places/" +
    encodeURIComponent(address) +
    ".json?access_token=pk.eyJ1IjoidmlsbGlhciIsImEiOiJjazNyc2VoMXcwY3kxM21wczY4bXlvbnRsIn0.iBktBWlSAZJKSbo43uj9fA&limit=1";

  request({ url, json: true }, (error, { body }) => {
    if (error) {
      callback("Cant connect to service", undefined);
    } else if (body.features.length === 0) {
      callback("Cant find location, try another search", undefined);
    } else {
      callback(undefined, {
        latitude: body.features[0].center[1],
        longitude: body.features[0].center[0],
        location: body.features[0].place_name
      });
    }
  });
};

module.exports = geocode;
