const db = require("../data/db-config");

function getMovies(user_id) {
  return db("user_movies").where("user_id", user_id).select("movie_id");
}

function getTvShows(user_id) {
  return db("user_tv_shows").where("user_id", user_id).select("tv_show_id");
}

// function getFollowers(user_id) {
//     return db("user_relationships")
//         .where("user_id", user_id)
//         .select("tv_show_id");
//   }

module.exports = {
    getMovies,
    getTvShows,
}