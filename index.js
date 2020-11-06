const express = require('express');
const app = express();
const fetch = require("node-fetch");


app.listen(3000);
app.use(express.static('public'))
app.use(express.json({limit: '1mb'}));

const getweather = async ({place}) => {
  const weather = await fetch(`https://api.openweathermap.org/data/2.5/weather?q=${place}&appid=${process.env.WEATHER_API_KEY}`)
  const weatherJSON = await weather.json()
  return weatherJSON
}

app.post('/api/v1/weathery', async (req, res) => {
  const lot = await getweather(req.body)
  res.json(lot)
})

app.get('/api/v1/gh-pinned', (req,res) => {
  res.json({
    "ok": "ok"
  })
})

app.get('/gh-pinned', (req, res) => {
  res.json({
    "status": "ok",
    "req": req.body
  })
})