const router = require("express").Router();
const restricted = require("../middleware/restricted");
const {
  checkIfUserHasWatchlistMovie,
  checkIfUserHasWatchlistShow,
  checkIfUserHasRexyMovie,
  checkIfUserHasRexyShow,
} = require("../middleware/content-middleware");
const Content = require("../models/content-model");

// WATCHLIST //
router.get("/:id/movies/watchlist", (req, res, next) => {
  Content.getWatchlistMovies(req.params.id)
    .then((movies) => {
      res.json(movies);
    })
    .catch(next);
});

router.post(
  "/movies/watchlist",
  restricted,
  checkIfUserHasWatchlistMovie,
  (req, res, next) => {
    Content.addWatchlistMovie(req.body)
      .then((newMovie) => {
        res.json(newMovie);
      })
      .catch(next);
  }
);

router.delete("/movies/watchlist", restricted, (req, res, next) => {
  Content.deleteWatchlistMovie(req.body)
    .then((deletedMovie) => {
      res.json(deletedMovie);
    })
    .catch(next);
});

router.get("/:id/shows/watchlist", (req, res, next) => {
  Content.getWatchlistShows(req.params.id)
    .then((shows) => {
      res.json(shows);
    })
    .catch(next);
});

router.post(
  "/shows/watchlist",
  restricted,
  checkIfUserHasWatchlistShow,
  (req, res, next) => {
    Content.addWatchlistShow(req.body)
      .then((newShow) => {
        res.json(newShow);
      })
      .catch(next);
  }
);

router.delete("/shows/watchlist", restricted, (req, res, next) => {
  Content.deleteWatchlistShow(req.body)
    .then((deletedShow) => {
      res.json(deletedShow);
    })
    .catch(next);
});

// REXYS //
router.get("/:id/movies/rexys", (req, res, next) => {
  Content.getRexyMovies(req.params.id)
    .then((movies) => {
      res.json(movies);
    })
    .catch(next);
});

router.post(
  "/movies/rexys",
  restricted,
  checkIfUserHasRexyMovie,
  (req, res, next) => {
    Content.addRexyMovie(req.body)
      .then((newMovie) => {
        res.json(newMovie);
      })
      .catch(next);
  }
);

router.delete("/movies/rexys", restricted, (req, res, next) => {
  Content.deleteRexyMovie(req.body)
    .then((deletedMovie) => {
      res.json(deletedMovie);
    })
    .catch(next);
});

router.get("/:id/shows/rexys", (req, res, next) => {
  Content.getRexyShows(req.params.id)
    .then((shows) => {
      res.json(shows);
    })
    .catch(next);
});

router.post(
  "/shows/rexys",
  restricted,
  checkIfUserHasRexyShow,
  (req, res, next) => {
    Content.addRexyShow(req.body)
      .then((newShow) => {
        res.json(newShow);
      })
      .catch(next);
  }
);

router.delete("/shows/rexys", restricted, (req, res, next) => {
  Content.deleteRexyShow(req.body)
    .then((deletedShow) => {
      res.json(deletedShow);
    })
    .catch(next);
});
module.exports = router;
