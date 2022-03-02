const router = require("express").Router();
const restricted = require("../middleware/restricted");
const {
  checkIfUserHasMovie,
  checkIfUserHasTvShow,
} = require("../middleware/user-profile-middleware");
const Profile = require("../models/user-profile-model");

// RELATIONSHIPS //
router.get("/:id/relationships", (req, res, next) => {
  Profile.getRelationships(req.params.id)
    .then((relationships) => {
      res.json(relationships);
    })
    .catch(next);
});

router.post("/relationships", restricted, (req, res, next) => {
  Profile.addRelationship(req.body)
    .then((relationship) => {
      res.json(relationship);
    })
    .catch(next);
});

router.put("/relationships", restricted, (req, res, next) => {
  Profile.updateRelationship(req.body)
    .then((relationship) => {
      res.json(relationship);
    })
    .catch(next);
});

router.delete("/relationships", restricted, (req, res, next) => {
  Profile.deleteRelationship(req.body)
    .then((deletedMovie) => {
      res.json(deletedMovie);
    })
    .catch(next);
});

// MOVIES //
router.get("/:id/movies", (req, res, next) => {
  Profile.getMovies(req.params.id)
    .then((movies) => {
      res.json(movies);
    })
    .catch(next);
});

router.post("/movies", restricted, checkIfUserHasMovie, (req, res, next) => {
  Profile.addMovie(req.body)
    .then((newMovie) => {
      res.json(newMovie);
    })
    .catch(next);
});

router.delete("/movies", restricted, (req, res, next) => {
  Profile.deleteMovie(req.body)
    .then((deletedMovie) => {
      res.json(deletedMovie);
    })
    .catch(next);
});
// TV SHOWS //
router.get("/:id/tv-shows", (req, res, next) => {
  Profile.getTvShows(req.params.id)
    .then((tvShows) => {
      res.json(tvShows);
    })
    .catch(next);
});

router.post("/tv-shows", restricted, checkIfUserHasTvShow, (req, res, next) => {
  Profile.addTvShow(req.body)
    .then((newTvShow) => {
      res.json(newTvShow);
    })
    .catch(next);
});

router.delete("/tv-shows", restricted, (req, res, next) => {
  Profile.deleteTvShow(req.body)
    .then((deletedTvShow) => {
      res.json(deletedTvShow);
    })
    .catch(next);
});

module.exports = router;
