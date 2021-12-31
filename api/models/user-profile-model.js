const db = require("../data/db-config");

module.exports = {
  getAll,
  getProfile,
  createProfile,
  getMovies,
  getTvShows,
  addMovie,
  addTvShow,
}

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
  ])
  return newProfile;
}

function getMovies(user_id) {
  return db("user_movies").where("user_id", user_id).select("movie_id");
}

function getTvShows(user_id) {
  return db("user_tv_shows").where("user_id", user_id).select("tv_show_id");
}

async function addMovie(movie) {
  const [newMovie] = await db("user_movies").insert(movie, [
    "user_movie_id",
    "movie_id",
    "user_id",
  ])
  return newMovie;
}

async function addTvShow(tvShow) {
  const [newTvShow] = await db("user_tv_shows").insert(tvShow, [
    "user_tv_show",
    "tv_show_id",
    "user_id",
  ])
  return newTvShow;
}
// function getFollowers(user_id) {
//     return db("user_relationships")
//         .where("user_id", user_id)
//         .select("tv_show_id");
//   }

