const router = require("express").Router();
const Users = require("../models/users-model");

router.get("/", (req, res, next) => {
  Users.getAll()
    .then((users) => {
      res.json(users);
    })
    .catch(next);
});


module.exports = router;
