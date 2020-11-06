const { response } = require('express');
const express = require('express');
const app = express();

app.listen(3000);
app.use(express.static('public'))
app.use(express.json({limit: '1mb'}));

app.post('/api/v1/weathery', (req, res) => {
  res.json({
    'status': 'success'
  })
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