const { getRelationships } = require("../models/relationships-model");

module.exports = { relationshipExists, relationshipDoesntExist };

async function relationshipExists(req, res, next) {
  const { user_id, relative_user_id } = req;
  const currentRelationships = await getRelationships(user_id);
  const exists = currentRelationships.find(
    (rel) => rel.relative_user_id === relative_user_id
  );
  if (!exists) {
    return next({
      message: "relationship does not exist",
      status: 403,
    });
  }
  next();
}

async function relationshipDoesntExist(req, res, next) {
  const { user_id, relative_user_id } = req;
  const currentRelationships = await getRelationships(user_id);
  const exists = currentRelationships.find(
    (rel) => rel.relative_user_id === relative_user_id
  );
  if (exists) {
    return next({
      message: "relationship already exists",
      status: 403,
    });
  }
  next();
}
