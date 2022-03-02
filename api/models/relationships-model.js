const db = require("../data/db-config");

module.exports = {
  getRelationships,
  addRelationship,
  updateRelationship,
  deleteRelationship,
};

function getRelationships(user_id) {
  return db("user_relationships").where("user_id", user_id);
}

async function addRelationship(relationship) {
  const [newRelationship] = await db("user_relationships").insert(
    relationship,
    ["user_id", "relative_user_id", "following", "follower", "blocked"]
  );
  return newRelationship;
}

async function updateRelationship(relationship) {
  const { user_id, relative_user_id } = relationship;
  const [updatedRelationship] = await db("user_relationships")
    .where("user_id", user_id)
    .andWhere("relative_user_id", relative_user_id)
    .update(relationship, [
      "user_id",
      "relative_user_id",
      "following",
      "follower",
      "blocked",
    ]);
  return updatedRelationship;
}

async function deleteRelationship(relationship) {
  const { user_id, relative_user_id } = relationship;
  const [deletedRelationship] = await db("user_relationships")
    .where("user_id", user_id)
    .andWhere("relative_user_id", relative_user_id)
    .delete(["user_id", "relative_user_id"]);
  return deletedRelationship;
}
