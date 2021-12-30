const db = require("../data/db-config");

function getAll() {
  return db("users");
}

function getById(user_id) {
  return db("users").where("user_id", user_id).first();
}

function findByUsername(username) {
  return db("users").where("username", username).first();
}

async function createUser(user) {
  const [newUser] = await db("users").insert(user, [
    "user_id",
    "username",
    "password",
    "phone",
    "email",
  ]);
  return newUser;
}

async function updateUser(user, user_id) {
  const [updatedUser] = await db("users")
    .where("user_id", user_id)
    .update(user, [
        "user_id", 
        "username", 
        "password", 
        "phone", 
        "email"
    ]);
  return updatedUser;
}

async function deleteUser(user_id) {
  const [deletedUser] = await db("users")
    .where("user_id", user_id)
    .delete([
        "user_id", 
        "username", 
        "password", 
        "phone", 
        "email"
    ]);
  return deletedUser;
}

module.exports = {
  getAll,
  getById,
  findByUsername,
  createUser,
  updateUser,
  deleteUser,
};
