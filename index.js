const express = require('express');
const app = express();
const fetch = require("node-fetch");
require('dotenv').config()

const weatherApiKey = process.env.WEATHER_API_KEY
const placeSuggestionsKey = process.env.LOCATIONIQ_API_KEY


app.listen(3000);
app.use(express.static('public'))
app.use(express.json({limit: '1mb'}));

const getweather = async ({place}) => {
  const weather = await fetch(`https://api.openweathermap.org/data/2.5/weather?q=${place}&appid=${weatherApiKey}`)
  const weatherJSON = await weather.json()
  return weatherJSON
}

const getInstantDetail = async ({instantPlace}) => {
  const result = await fetch(`https://api.locationiq.com/v1/autocomplete.php?key=${placeSuggestionsKey}&q=${instantPlace}&limit=5&normalizecity=1&tag=place%3Acity&dedupe=1`)
  const json = await result.json();
  return json
}


app.post('/api/v1/weathery', async (req, res) => {
  const body = req.body;
  let lot, instantDetail = {};

  if (body.instantPlace) {
    instantDetail = await getInstantDetail(body)
  }
  if (body.place) {
    lot = await getweather(body)
  }

  res.json({
    'weatherInfo': lot,
    "places": instantDetail
  })
})

app.get('/api/v1/gh-pinned', (req,res) => {
  res.json({
    "ok": "ok"
  })
})