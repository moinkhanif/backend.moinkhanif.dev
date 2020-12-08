const express = require('express');
const app = express();
const fetch = require("node-fetch");
const Datastore = require('nedb')
require('dotenv').config()

const db = new Datastore('database.db');
const weatherApiKey = process.env.WEATHER_API_KEY
const placeSuggestionsKey = process.env.LOCATIONIQ_API_KEY
const giphyKey = process.env.GIPHY_IMAGE_API

db.loadDatabase();
app.listen(3000);
app.use(express.static('public'))
app.use(express.json({ limit: '1mb' }));

const getweather = async ({ place }) => {
  const weather = await fetch(`https://api.openweathermap.org/data/2.5/weather?q=${place}&appid=${weatherApiKey}&units=metric`)
  const weatherJSON = await weather.json()
  if (weatherJSON.message) {
    weatherJSON.gify = {}
  } else {
    const giphyRes = await fetch(`https://api.giphy.com/v1/gifs/search?q=weather%20${weatherJSON.weather[0].description}&rating=g&limit=10&api_key=${giphyKey}`)
    weatherJSON.gify = await giphyRes.json()
  }
  return weatherJSON
}

const getInstantDetail = async ({ instantPlace }) => {
  const result = await fetch(`https://api.locationiq.com/v1/autocomplete.php?key=${placeSuggestionsKey}&q=${instantPlace}&limit=5&normalizecity=1&tag=place%3Acity&dedupe=1`)
  const json = await result.json();
  return json
}


app.post('/api/v1/weathery', async (req, res) => {
  const body = req.body;
  let lot, instantDetail = {};

  if (body.instantPlace && body.instantPlace.length > 1) {
    instantDetail = await getInstantDetail(body)
  }
  if (body.place && body.place.length > 1) {
    lot = await getweather(body)
  }

  res.json({
    'weatherInfo': lot,
    "places": instantDetail
  })
})

app.post('/api/v1/mk-platform-game', (req, res) => {
  const body = req.body;
  db.insert(body)
  res.json({ message: 'success' })
})

app.get('/api/v1/mk-platform-game', async (req,res) => {
  db.find({}).sort({total: -1}).exec((err,doc) => {
    res.json({result:doc})
  })
})

const anything = (any) => {
  console.log(any)
}

const githubPinned = async () => {
  const baseAPICall = 'https://api.github.com/graphql';
  const headers = {
    'Content-Type': 'application/json',
    'Authorization': `bearer a344c699206c394e0ae186ccc6b1d97ddd4fbc1b`,
    "User-Agent": "moin-backend"
  };
  const body = {
    'query': `
      query {
        viewer {
          login
          pinnedItems(first: 5, types: [REPOSITORY, GIST]) {
            totalCount
            edges {
              node {
                ... on Repository {
                  name
                  description
                  primaryLanguage {
                    name
                  }
                  homepageUrl
                  projectsResourcePath
                }
              }
            }
          }
        }
      }
    `
  };

  // const data = await fetch(baseAPICall, {
  //     method: 'POST',
  //     headers: headers,
  //     body: JSON.stringify(body)
  //   })
  // const djson = await data.json();
  // return djson;
  return fetch(baseAPICall, {
    method: 'POST',
    headers: headers,
    body: JSON.stringify(body)
  }).then(responseie => responseie)
}

app.get('/api/v1/gh-pinned', (req, res) => {
  const baseAPICall = 'https://api.github.com/graphql';
  const headers = {
    'Content-Type': 'application/json',
    'Authorization': `bearer a344c699206c394e0ae186ccc6b1d97ddd4fbc1b`,
    "User-Agent": "moin-backend"
  };
  const body = {
    'query': `
      query {
        viewer {
          login
          pinnedItems(first: 5, types: [REPOSITORY, GIST]) {
            totalCount
            edges {
              node {
                ... on Repository {
                  name
                  description
                  primaryLanguage {
                    name
                  }
                  homepageUrl
                  projectsResourcePath
                }
              }
            }
          }
        }
      }
    `
  };
  res.json(
    fetch(baseAPICall, {
      method: 'POST',
      headers: headers,
      body: JSON.stringify(body)
    })
  )
})
