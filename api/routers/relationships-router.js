const router = require("express").Router();
const restricted = require("../middleware/restricted");

const {
  relationshipExists,
  relationshipDoesntExist,
} = require("../middleware/relationships-middleware");

const Relationships = require("../models/relationships-model");

router.get("/:id", (req, res, next) => {
  Relationships.getRelationships(req.params.id)
    .then((relationships) => {
      res.json(relationships);
    })
    .catch(next);
});

router.get("/", (req, res, next) => {
    Relationships.getRelationship(req.body)
      .then((relationships) => {
        res.json(relationships);
      })
      .catch(next);
  });

router.post("/", restricted, relationshipDoesntExist, (req, res, next) => {
  Relationships.addRelationship(req.body)
    .then((relationship) => {
      res.json(relationship);
    })
    .catch(next);
});

router.put("/", restricted, relationshipExists, (req, res, next) => {
  Relationships.updateRelationship(req.body)
    .then((relationship) => {
      res.json(relationship);
    })
    .catch(next);
});

router.delete("/", restricted, relationshipExists, (req, res, next) => {
  Relationships.deleteRelationship(req.body)
    .then((deletedMovie) => {
      res.json(deletedMovie);
    })
    .catch(next);
});

module.exports = router;
