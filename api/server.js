const express = require("express")
const helmet = require("helmet")
const morgan = require("morgan")
const cors = require("cors")

const attachUser = require("../middlewares/attachUser")
const requireAuth = require("../middlewares/requireAuth")
// const orgRouter = require("../ressources/organizations/organizations-router.js")
const usersRouter = require("../ressources/users/users-router.js")

const server = express()

// 3rd Party Middlewares
server.use(express.json())
server.use(helmet())
server.use(morgan("tiny"))
server.use(cors())

// Routes
// server.use("/api/organizations", orgRouter)
server.use("/api/users", attachUser, requireAuth, usersRouter)

server.get("/", (req, res) => res.status(200).json({ Eddy: "Says Hi!" }))

module.exports = server
