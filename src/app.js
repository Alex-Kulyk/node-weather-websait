const path = require('path');
const express = require('express');
const hbs = require('hbs');
const geocode = require('./utils/geocode');
const forecast = require('./utils/forecast');

const app = express();
const port = process.env.PORT || 3000;

//Define paths for express config
const publicPath = path.join(__dirname, '../public');
const viewsPath = path.join(__dirname, '../templates/views');
const partialsPath = path.join(__dirname, '../templates/partials');

//Setup handlebars engine and views location
app.set('view engine', 'hbs');
app.set('views', viewsPath);
hbs.registerPartials(partialsPath);

//Setup static dicertory to serv
app.use(express.static(publicPath));

app.get('/', (req, res) => {
  res.render('index', {
    title: 'Weather',
    name: 'Alex'
  });
});

app.get('/about', (req, res) => {
  res.render('about', {
    title: 'About me',
    name: 'Alex'
  });
});
app.get('/help', (req, res) => {
  res.render('help', {
    helpText: 'this is some helpful text ',
    title: 'This is my help page',
    name: 'Alex'
  });
});

app.get('/weather', (req, res) => {
  if (!req.query.address) {
    return res.send({
      error: 'Please provide right address'
    });
  }
  geocode(
    req.query.address,
    (error, { latitude, longitude, location } = {}) => {
      if (error) {
        return res.send({ error });
      }
      forecast(latitude, longitude, (error, forecastData) => {
        if (error) {
          return res.send({ error });
        }
        res.send({
          forecast: forecastData,
          location,
          address: req.query.address
        });
      });
    }
  );
});
app.get('/help/*', (req, res) => {
  res.render('404', {
    errorMessage: 'help article not found',
    title: '404',
    name: 'alex'
  });
});
app.get('*', (req, res) => {
  res.render('404', {
    title: '404',
    name: 'Alex',
    errorMessage: 'Page not found'
  });
});
app.listen(port, () => console.log(`Example app listening on port ${port}!`));
