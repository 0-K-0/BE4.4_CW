const { initializeDatabase } = require("./db/db.connect");
const Movie = require("./models/movie.model");
const express = require("express");
const cors = require("cors");
const app = express();
app.use(cors());
app.use(express.json());

const UploadMovies = async (movies) => {
  try {
    const uploadMovie = await Movie.create(movies);
    return uploadMovie;
  } catch (error) {
    throw error;
  }
};

app.post("/movies/upload", async (req, res) => {
  try {
    const movies = req.body;
    if (movies && movies.length > 0) {
      const sendTheMovies = await UploadMovies(movies);
      res
        .status(200)
        .json({ message: "movie uploaded successfully", sendTheMovies });
    } else {
      res.status(400).json({ error: error });
    }
  } catch (error) {
    res.status(500).json({ error: error });
    console.error(error);
  }
});
const allMovieHandler = async () => {
  try {
    const allMovie = await Movie.find();
    return allMovie;
  } catch (error) {
    console.log(error);
  }
};
app.get("/movies/show_movies", async (req, res) => {
  const allMovies = await allMovieHandler();
  try {
    if (!allMovies || allMovies.length === 0) {
      app.status(404).json({
        message: "Movies is not found",
      });
    } else {
      res.status(200).json(allMovies);
    }
  } catch (error) {
    res.status(500).json({ error: error });
  }
});
const PORT = 4000;
initializeDatabase();
app.listen(process.env.PORT || PORT, () =>
  console.log(`server is running on ${PORT}`),
);
