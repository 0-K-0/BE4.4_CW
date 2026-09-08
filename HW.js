const { error } = require("node:console");
const { initializeDatabase } = require("./db/db.connect");
const Movie = require("./models/movie.model");
const express = require("express");
const app = express();
app.use(express.json());
const MovieUpdateHander = async (MovieID, dataToUpdate) => {
  try {
    const movieToUpdate = await Movie.findByIdAndUpdate(MovieID, dataToUpdate, {
      returnDocument: "after",
    });
    return movieToUpdate;
  } catch (error) {
    throw error;
  }
};
app.post("/movies/:movieId", async (req, res) => {
  try {
    const updatedMovie = await MovieUpdateHander(req.params.movieId, req.body);
    if (updatedMovie) {
      res
        .status(200)
        .json({
          message: "Movie Updated successfully.",
          UpdatedMovie: updatedMovie,
        });
    } else {
      res.status(404).json({ error: "Movie not found" });
    }
  } catch (error) {
    res.status(500).json({ error: "faild to update movie" });
  }
});

const connectionHander = async () => {
  try {
    initializeDatabase();
    console.log("Server is connected the Db");
    app.listen(3000, () => console.log("Server is Running of port 3000"));
  } catch (error) {
    throw error;
  }
};
connectionHander();
