const { getMovies, getTvShows, getRelationships } = require("../models/user-profile-model");

module.exports = {
  checkIfUserHasMovie,
  checkIfUserHasTvShow,
  checkIfRelationshipExists,
  checkIfRelationshipDoesntExist,
};

async function checkIfUserHasMovie(req, res, next) {
  const userMovies = await getMovies(req.body.user_id);
  if (!userMovies) return next();
  const hasMovie = userMovies.find(
    (movie) => movie.movie_id === req.body.movie_id
  );
  if (hasMovie) {
    return next({
      message: "user has movie already",
      status: 403,
    });
  }
  next();
}

async function checkIfUserHasTvShow(req, res, next) {
  const userTvShows = await getTvShows(req.body.user_id);
  if (!userTvShows) return next();
  const hasTvShow = userTvShows.find(
    (show) => show.tv_show_id === req.body.tv_show_id
  );
  if (hasTvShow) {
    return next({
      message: "user has tv show already",
      status: 403,
    });
  }
  next();
}

async function checkIfRelationshipExists(req, res, next) {
  const { user_id, relative_user_id } = req;
  const currentRelationships = await getRelationships(user_id);
  const exists = currentRelationships.find(
    (rel) => rel.relative_user_id === relative_user_id
  );
  if (exists) {
    return next({
        message: "relationship already exists",
        status: 403,
    })
  }
  next();
}

async function checkIfRelationshipDoesntExist(req, res, next) {
    const { user_id, relative_user_id } = req;
    const currentRelationships = await getRelationships(user_id);
    const exists = currentRelationships.find(
      (rel) => rel.relative_user_id === relative_user_id
    );
    if (!exists) {
      return next({
          message: "relationship doesn't exist",
          status: 404,
      })
    }
    next();
  }