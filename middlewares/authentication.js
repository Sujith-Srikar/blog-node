const { validate } = require("../services/authentication");

function checkForAuthenticationCookie(cookieName) {
  return (req, res, next) => {
    const tokenCookieValue = req.cookies[cookieName];
    if (!tokenCookieValue) {
      res.locals.user = null;
      req.user = null;
      return next();
    }

    try {
      const userPayload = validate(tokenCookieValue);
      req.user = userPayload;
      res.locals.user = userPayload;
    } catch (error) {
      res.locals.user = null;
      req.user = null;
    }

    return next();
  };
}

module.exports = {
  checkForAuthenticationCookie,
};
