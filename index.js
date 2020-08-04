require("dotenv").config()
const server = require("./api/server.js")
const PORT = process.env.PORT || 5000

server.listen(PORT, (req, res) =>
  console.log(`🔥🔥🔥 Eddy is up and running on port ${PORT} 🔥🔥🔥\n`)
)
