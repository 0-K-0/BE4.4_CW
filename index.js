const { initializeDatabase } = require("./db/db.connect");
const Movie = require("./models/movie.model");
const express = require("express");
const cors = require("cors");
const app = express();
app.use(cors());
app.use(express.json());

const allMovieHandler = async (movies) => {
  try {
    const uploadMovie = await Movie.insertMany(movies);
    return uploadMovie;
  } catch (error) {
    throw error;
  }
};

app.post("/Upload_movies/movies", async (req, res) => {
  try {
    const movies = req.body.movies;
    if (movies && movies.length > 0) {
      const sendTheMovies = await allMovieHandler(movies);
      res
        .status(200)
        .json({ message: "movie uploaded successfully", sendTheMovies });
    } else {
      res.status(400).json({ error: "an error oquired" });
    }
  } catch (error) {
    res.status(500).json({ error: "an error oquired" });
    console.error(error);
  }
});

const PORT = 4000;
initializeDatabase();
app.listen(process.env.PORT || PORT, () =>
  console.log(`server is running on ${PORT}`),
);
