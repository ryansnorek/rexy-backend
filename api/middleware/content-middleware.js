const {
  getWatchlistMovies,
  getWatchlistShows,
  getRexyMovies,
  getRexyShows,
} = require("../models/content-model");

module.exports = {
  checkIfUserHasWatchlistMovie,
  checkIfUserHasWatchlistShow,
  checkIfUserHasRexyMovie,
  checkIfUserHasRexyShow,
};

async function checkIfUserHasWatchlistMovie(req, res, next) {
  const userMovies = await getWatchlistMovies(req.body.user_id);
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

async function checkIfUserHasWatchlistShow(req, res, next) {
  const userTvShows = await getWatchlistShows(req.body.user_id);
  if (!userTvShows) return next();
  const hasTvShow = userTvShows.find(
    (show) => show.show_id === req.body.show_id
  );
  if (hasTvShow) {
    return next({
      message: "user has tv show already",
      status: 403,
    });
  }
  next();
}

async function checkIfUserHasRexyMovie(req, res, next) {
  const userMovies = await getRexyMovies(req.body.user_id);
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

async function checkIfUserHasRexyShow(req, res, next) {
  const userTvShows = await getRexyShows(req.body.user_id);
  if (!userTvShows) return next();
  const hasTvShow = userTvShows.find(
    (show) => show.show_id === req.body.show_id
  );
  if (hasTvShow) {
    return next({
      message: "user has tv show already",
      status: 403,
    });
  }
  next();
}
