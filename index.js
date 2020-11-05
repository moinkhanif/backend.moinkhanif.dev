const express = require('express');
const app = express();

app.listen();
app.use(express.static('public'))
app.use(express.json({limit: '1mb'}));

app.get('/gh-pinned', (req, res) => {
  res.json({
    "status": "ok"
  })
})