const jwt = require("jsonwebtoken");

module.exports = req => {
  const payload = req.body.user_name;
  const key = process.env.JWT_PRIVATE_KEY;
  const options = {
    algorithm: process.env.ENCODING_ALGORITHM
  };

  return jwt.sign(payload, key, options);
};
