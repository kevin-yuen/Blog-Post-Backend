// serve as a lock for creating/updating/reading/deleting posts

const jwt = require("jsonwebtoken");

const authMiddleware = async (req, res, next) => {
  const token = req.header("Authorization");
  //console.log(token);

  if (!token) return res.status(403).json({ error: "Access Denied" });

  try {
    const decoded = jwt.verify(
      token.substring(7), // exclude "Bearer" prefix (a token is prefixed with "Bearer");
      process.env.JWT_SECRET
    );
    req.user = { userID: decoded.id };

    next(); // proceed to whatever the next function is (in this case, create/update/delete posts in routes/post.js)
  } catch (error) {
    res.status(403).json({ error: "Access Denied." });
  }
};

module.exports = {
  authMiddleware,
};
