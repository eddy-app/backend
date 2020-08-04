const jwtDecode = require("jwt-decode")

module.exports = (req, res, next) => {
  const token = req.headers.authorization

  if (!token) res.status(401).json({ message: "Authentication invalid" })

  // Remove the Bearer scheme from the token.
  const decodeToken = jwtDecode(token.slice(7))

  if (!decodeToken)
    res
      .status(401)
      .json({ message: "There was a problem authorizing the request" })
  else {
    req.user = decodeToken
    next()
  }
}
