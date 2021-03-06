const jwt = require("express-jwt")
const jwks = require("jwks-rsa")

module.exports = jwt({
  secret: jwks.expressJwtSecret({
    cache: true,
    rateLimit: true,
    jwksRequestsPerMinute: 5,
    jwksUri: process.env.AUTH0_JWKS_URI,
  }),
  audience: process.env.AUTH0_AUDIENCE,
  issuer: process.env.AUTH0_JWKS_ISSUER,
  algorithms: ["RS256"],
})
