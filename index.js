const express = require('express');
const { resolve } = require('path');
const { getAllMovies, getMovieById } = require('./controllers');

const app = express();
const port = 3010;

app.use(express.static('static'));

app.get('/', (req, res) => {
  res.sendFile(resolve(__dirname, 'pages/index.html'));
});

app.get("/movies", (req, res) => {
  try {
    let result = getAllMovies();
    if(result.length === 0){
      res.status(404).json({message : "No movies found"})
    }
    res.status(200).json(result)
  } catch (error) {
    res.status(500).json({message : error.message})
  }
})

app.get("/movies/details/:id", (req, res) => {
  try {
    let id = parseInt(req.params.id)
    let result = getMovieById(id);
    if(!result){
      res.status(404).json({message : "Movie not found"})
    }
    res.status(200).json(result)
  } catch (error) {
    res.status(500).json({message : error.message})
  }
})
module.exports = { app }