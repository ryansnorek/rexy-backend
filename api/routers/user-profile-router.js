const router = require("express").Router();
const Profile = require("../models/user-profile-model");

router.get("/", (req, res, next) => {
  Profile.getAll()
    .then((profiles) => {
      res.json(profiles);
    })
    .catch(next);
});

router.get("/:id", (req, res, next) => {
  Profile.getProfile(req.params.id)
    .then((profile) => {
      res.json(profile);
    })
    .catch(next);
});

router.post(
    "/", 

(req, res, next) => {
    Profile.createProfile(req.body)
      .then((newProfile) => {
        res.json(newProfile);
      })
      .catch(next);
  });

router.get("/:id/movies", (req, res, next) => {
  Profile.getMovies(req.params.id)
    .then((movies) => {
      res.json(movies);
    })
    .catch(next);
});

router.post("/movies", (req, res, next) => {
    Profile.addMovie(req.body)
      .then((newMovie) => {
        res.json(newMovie);
      })
      .catch(next);
  });

router.get("/:id/tv-shows", (req, res, next) => {
  Profile.getTvShows(req.params.id)
    .then((tvShows) => {
      res.json(tvShows);
    })
    .catch(next);
});

router.post("/tv-shows", (req, res, next) => {
  Profile.addTvShow(req.body)
    .then((newTvShow) => {
      res.json(newTvShow);
    })
    .catch(next);
});

module.exports = router;
