// const express = require('express');
import express from 'express';
import path from 'path';

const app = express();

const port = process.env.PORT || 80;

const __dirname = path.resolve(path.dirname(''));

app.use(express.static(path.join(__dirname, 'build')));

app.use(express.json()) // for parsing application/json
app.use(express.urlencoded({ extended: true })) // for parsing application/x-www-form-urlencoded

// const bodyParser = require('body-parser')
// app.use(bodyParser.json());

app.get('/ping', function (req, res) {
  return res.send('pong');
});

app.get('/*', function (req, res) {
  res.sendFile(path.join(__dirname, 'build', 'index.html'));
});

app.listen(port);
console.log("Server Ready!")