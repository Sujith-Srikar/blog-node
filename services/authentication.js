const JWT = require("jsonwebtoken");

const secret = "SLMV142620";

function createToken(user) {
  const payload = {
    id: user._id,
    email: user.email,
    profileImageURL: user.profileImageURL,
    role: user.role,
  };
  const token = JWT.sign(payload, secret);
  return token;
}

function validate(token) {
  const payload = JWT.verify(token, secret);
  return payload;
}

module.exports = {
  createToken,
  validate,
};
