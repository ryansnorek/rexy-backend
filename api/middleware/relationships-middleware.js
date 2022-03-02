const { getRelationship } = require("../models/relationships-model");

module.exports = { relationshipExists, relationshipDoesntExist };

async function relationshipExists(req, res, next) {
  const exists = await getRelationship(req.body);
  if (!exists) {
    return next({
      message: "relationship does not exist",
      status: 403,
    });
  }
  next();
}

async function relationshipDoesntExist(req, res, next) {
  const exists = await getRelationship(req.body);
  if (exists) {
    return next({
      message: "relationship already exists",
      status: 403,
    });
  }
  next();
}
