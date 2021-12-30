const { findByUsername } = require("../models/users-model");
const { JWT_SECRET } = require("../../config");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");

module.exports = {
  reqBodyIsValidForRegister,
  reqBodyIsValidForLogin,
  checkIfUserExistsAlready,
  confirmAndStoreUser,
  tokenBuilder,
  hashPassword,
};

function reqBodyIsValidForRegister(req, res, next) {
  const { username, password, phone, email } = req.body;
  username && password && phone && email ? next() : 
  next({ 
      message: "missing required fields", 
      status: 401
    });
}

function reqBodyIsValidForLogin(req, res, next) {
  const { username, password } = req.body;
  username && password ? next() : 
  next({ 
      message: "username and password required", 
      status: 401
    });
}

async function checkIfUserExistsAlready(req, res, next) {
  const user = await findByUsername(req.body.username);
  if (user) {
    return next({ 
        message: "username taken", 
        status: 422 
      });
  }
  next();
}

async function confirmAndStoreUser(req, res, next) {
  const user = await findByUsername(req.body.username);
  if (!user) {
    return next({
        message: "invalid credentials", 
        status: 401
    });
  }
  req.user = user;
  next();
}

function tokenBuilder(user) {
  const options = { expiresIn: "1d" };
  const payload = { 
      subject: user.user_id, 
      username: user.username 
    };
  return jwt.sign(
      payload, 
      JWT_SECRET,
      options,
    );
}

function hashPassword(req, res, next) {
  if (req.body.password) {
    req.body.password = bcrypt.hashSync(req.body.password);
  }
  next();
}