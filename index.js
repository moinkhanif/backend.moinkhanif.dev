const express = require('express');
const app = express();

app.listen(3000);
app.use(express.static('public'))
app.use(express.json({limit: '1mb'}));

app.get('/gh-pinned', (req, res) => {
  res.json({
    "status": "ok",
    "req": req.body
  })
})