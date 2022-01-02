const { getMovies, getTvShows } = require("../models/user-profile-model");

module.exports = {
    checkIfUserHasMovie,
    checkIfUserHasTvShow,
}


async function checkIfUserHasMovie(req, res, next) {
    const userMovies = await getMovies(req.body.user_id);
    if (!userMovies) return next();
    const hasMovie = userMovies.find(movie => movie.movie_id === req.body.movie_id);
    if (hasMovie) {
      return next({ 
          message: "user has movie already", 
          status: 403
        });
    }
    next();
}

async function checkIfUserHasTvShow(req, res, next) {
    const userTvShows = await getTvShows(req.body.user_id);
    if (!userTvShows) return next();
    const hasTvShow = userTvShows.find(show => show.tv_show_id === req.body.tv_show_id);
    if (hasTvShow) {
      return next({ 
          message: "user has tv show already", 
          status: 403
        });
    }
    next();
}
