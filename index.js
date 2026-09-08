const { initializeDatabase } = require("./db/db.connect");
const Movie = require("./models/movie.model");
const fs = require("fs");
const jsonData = fs.readFileSync("movies.json", "utf-8");
const movies_Data = JSON.parse(jsonData);
const InsertData = async () => {
  try {
    initializeDatabase();
    await Movie.deleteMany();
    await Movie.create(movies_Data);
    console.log("movie uploaded to db successfully");
  } catch (error) {
    throw error;
  }
};
InsertData();

