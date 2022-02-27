const router = require("express").Router();
const bcrypt = require("bcryptjs");
const Users = require("../models/users-model");

const {
    reqBodyIsValidForRegister,
    reqBodyIsValidForLogin,
    checkIfUserExistsAlready,
    confirmAndStoreUser,
    tokenBuilder,
    hashPassword,
  } = require("./auth-middleware");

router.post(
    "/register",
    reqBodyIsValidForRegister,
    checkIfUserExistsAlready,
    hashPassword,
    (req, res, next) => {
      const { username, password, phone, email } = req.body;
      Users.createUser({
        username,
        password,
        phone,
        email,
      })
        .then((newUser) => {
          res.json(newUser);
        })
        .catch(next);
    }
  );

  router.post(
    "/login",
    reqBodyIsValidForLogin,
    confirmAndStoreUser,
    (req, res, next) => {
      const { password } = req.body;
      const passwordMatches = bcrypt.compareSync(password, req.user.password);
      if (!passwordMatches) {
          return next({ message: "invalid credentials" });
      }
      const token = tokenBuilder(req.user);
      res.json({ 
          user_id: req.user.user_id,
          admin: req.user.admin,
          message: `welcome, ${req.user.username}`,
          token 
      });
    }
  );

  module.exports = router;