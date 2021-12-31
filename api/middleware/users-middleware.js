const { getById } = require("../models/users-model");

module.exports = {
    checkIfUserExists,
}

async function checkIfUserExists(req, res, next) {
    const user = await getById(req.params.id);
    if (!user) {
      return next({ 
          message: "user does not exist", 
          status: 401 
        });
    }
    req.user = user; 
    next();
}

