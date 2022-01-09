const db = require("../data/db-config");

module.exports = {
  getAll,
  getProfile,
  createProfile,
  getMovies,
  addMovie,
  deleteMovie,
  getTvShows,
  addTvShow,
  deleteTvShow,
};

function getAll() {
  return db("user_profile");
}

function getProfile(user_id) {
  return db("user_profile").where("user_id", user_id).first();
}

async function createProfile(profile) {
  const [newProfile] = await db("user_profile").insert(profile, [
    "user_profile_id",
    "ptype",
    "uploaded_image",
    "user_id",
  ]);
  return newProfile;
}

function getMovies(user_id) {
  return db("user_movies").where("user_id", user_id).select("movie_id");
}

async function addMovie(movie) {
  const [newMovie] = await db("user_movies").insert(movie, [
    "user_movie_id",
    "movie_id",
    "user_id",
  ]);
  return newMovie;
}

async function deleteMovie(movie) {
  const { user_id, movie_id } = movie;
  const [deletedMovie] = await db("user_movies")
    .where("user_id", user_id)
    .andWhere("movie_id", movie_id)
    .delete([
      "user_id", 
      "movie_id"
    ]);
  return deletedMovie;
}

function getTvShows(user_id) {
  return db("user_tv_shows").where("user_id", user_id).select("tv_show_id");
}

async function addTvShow(tvShow) {
  const [newTvShow] = await db("user_tv_shows").insert(tvShow, [
    "user_tv_show_id",
    "tv_show_id",
    "user_id",
  ]);
  return newTvShow;
}

async function deleteTvShow(tv_show) {
  const { user_id, tv_show_id } = tv_show;
  const [deletedTvShow] = await db("user_tv_shows")
    .where("user_id", user_id)
    .andWhere("tv_show_id", tv_show_id)
    .delete([
      "user_id", 
      "tv_show_id",
    ]);
  return deletedTvShow;
}

