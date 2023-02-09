const jwt = require("jsonwebtoken");
const authenticateJWT = (req, res, next) => {
  const token = req.cookies.access_token;

  if (token) {
    // verify the token to authorize
    jwt.verify(token, process.env.JWTSECRETKEY, (err, user) => {
      if (err) return res.status(403).json("Forbidden access, invalid credentials");
      console.log("passed JWT verification");
      next();
    });
  } else {
    // if no token, user is not logged in
    return res.status(401).json("User must login");
  }
};

module.exports = {
  authenticateJWT,
};
