const router = require("express").Router();
const Users = require("../models/users-model");
const restricted = require("../middleware/restricted");
const { checkIfUserExists } = require("../middleware/users-middleware");
const { hashPassword } = require("../auth/auth-middleware");

router.get("/", (req, res, next) => {
  Users.getAll()
    .then((users) => {
      res.json(users);
    })
    .catch(next);
});

router.get("/:id", (req, res, next) => {
  Users.getById(req.params.id)
    .then((user) => {
      res.json(user);
    })
    .catch(next);
});

router.put(
  "/:id",
  checkIfUserExists,
  hashPassword,
  restricted,
  (req, res, next) => {
    Users.updateUser(req.body, req.params.id)
      .then((updatedUser) => {
        res.json(updatedUser);
      })
      .catch(next);
  }
);

router.delete(
  "/:id",
  checkIfUserExists,
  restricted,
  (req, res, next) => {
    Users.deleteUser(req.params.id)
      .then((deletedUser) => {
        res.json(deletedUser);
      })
      .catch(next);
  }
);

module.exports = router;
