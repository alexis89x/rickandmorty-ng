const express = require('express');

const app = express();

const appName = 'rickandmorty-ng';

app.use(express.static(`./dist/${appName}`));

app.get('/*', (req, res) =>
  res.sendFile('index.html', {root: `dist/${appName}/`}));

app.listen(process.env.PORT || 8080);
