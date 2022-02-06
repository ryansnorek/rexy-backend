const db = require("../data/db-config");

module.exports = {
  getAll,
  getProfile,
  createProfile,
  updateProfile,
  getMovies,
  addMovie,
  deleteMovie,
  getTvShows,
  addTvShow,
  deleteTvShow,
  getFollowers,
  followUser,
  getRelationships,
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
    "display_name",
    "personality_type",
    "uploaded_image",
    "user_id",
  ]);
  return newProfile;
}
async function updateProfile(profile, user_id) {
  const [updatedProfile] = await db("user_profile")
    .where("user_id", user_id)
    .update(profile, [
      "user_id",
      "display_name",
      "personality_type",
      "uploaded_image",
    ]);
  return updatedProfile;
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
    .delete(["user_id", "movie_id"]);
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
    .delete(["user_id", "tv_show_id"]);
  return deletedTvShow;
}


function getRelationships(user_id) {
  return db("user_relationships").where("user_id", user_id);
}

async function followUser(relationship) {
  const [newRelationship] = await db("user_relationships").insert(
    relationship,
    ["user_id", "relative_user_id", "following"]
  );
  return newRelationship;
}
