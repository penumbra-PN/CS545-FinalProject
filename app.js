const express = require('express')
const path = require('path');
const app = express()
const port = 3000

app.use(express.static('public'));

app.get('/', (req, res) => {
  res.sendFile('timer.html', {
    root: './public/views/'
  });
});

app.get('/about', (req, res) => {
  res.sendFile('about.html', {
    root: './public/views/'
  });
});

app.get('/settings', (req, res) => {
  res.sendFile('settings.html', {
    root: './public/views/'
  });
});


app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})