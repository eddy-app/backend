const router = require("express").Router()
const db = require("../users/users-model")

router.post("/", async (req, res) => {
  try {
    const organization = await db.findById(req.validToken.user_id)
    if (organization) res.status(200).json(organization)
    else {
      const data = {
        uid: req.validToken.user_id,
        email: req.validToken.email,
      }

      const newOrg = await db.add(data)
      res.status(201).json(newOrg)
    }
  } catch ({ message }) {
    res.status(500).json({ message: "Unable to log user." })
  }
})

module.exports = router
