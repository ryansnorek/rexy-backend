const db = require("../data/db-config");

module.exports = {
  getWatchlistMovies,
  addWatchlistMovie,
  deleteWatchlistMovie,
  getWatchlistShows,
  addWatchlistShow,
  deleteWatchlistShow,
  getRexyMovies,
  addRexyMovie,
  deleteRexyMovie,
  getRexyShows,
  addRexyShow,
  deleteRexyShow,
};

// WATCHLIST //
function getWatchlistMovies(user_id) {
  return db("watchlist_movies").where("user_id", user_id).select("movie_id");
}

async function addWatchlistMovie(movie) {
  const [newMovie] = await db("watchlist_movies").insert(movie, [
    "movie_id",
    "user_id",
  ]);
  return newMovie;
}

async function deleteWatchlistMovie(movie) {
  const { user_id, movie_id } = movie;
  const [deletedMovie] = await db("watchlist_movies")
    .where("user_id", user_id)
    .andWhere("movie_id", movie_id)
    .delete(["user_id", "movie_id"]);
  return deletedMovie;
}

function getWatchlistShows(user_id) {
  return db("watchlist_shows").where("user_id", user_id).select("show_id");
}

async function addWatchlistShow(show) {
  const [newShow] = await db("watchlist_shows").insert(show, [
    "show_id",
    "user_id",
  ]);
  return newShow;
}

async function deleteWatchlistShow(show) {
  const { user_id, show_id } = show;
  const [deletedShow] = await db("watchlist_shows")
    .where("user_id", user_id)
    .andWhere("show_id", show_id)
    .delete(["user_id", "show_id"]);
  return deletedShow;
}

// REXYS //
function getRexyMovies(user_id) {
  return db("rexy_movies")
    .where("user_id", user_id)
    .select("movie_id", "relative_user_id");
}

async function addRexyMovie(movie) {
  const [newMovie] = await db("rexy_movies").insert(movie, [
    "movie_id",
    "user_id",
  ]);
  return newMovie;
}

async function deleteRexyMovie(movie) {
  const { user_id, movie_id } = movie;
  const [deletedMovie] = await db("rexy_movies")
    .where("user_id", user_id)
    .andWhere("movie_id", movie_id)
    .delete(["user_id", "movie_id"]);
  return deletedMovie;
}

function getRexyShows(user_id) {
  return db("rexy_shows")
    .where("user_id", user_id)
    .select("show_id", "relative_user_id");
}

async function addRexyShow(show) {
  const [newShow] = await db("rexy_shows").insert(show, ["show_id", "user_id"]);
  return newShow;
}

async function deleteRexyShow(show) {
  const { user_id, show_id } = show;
  const [deletedShow] = await db("rexy_shows")
    .where("user_id", user_id)
    .andWhere("show_id", show_id)
    .delete(["user_id", "show_id"]);
  return deletedShow;
}
