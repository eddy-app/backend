const router = require("express")
const db = require("./teams-model.js")
const authorized = require("../../middlewares/authorized.js")
const {
  teamValidation,
  idValidation,
} = require("../../middlewares/validation.js")

/**
 * @desc    Add a new team in the database
 * @route   POST /api/teams
 * @access  Private, Admin
 */
router.post(
  "/",
  authorized(["admin" | "manager"]),
  teamValidation,
  async (req, res) => {
    try {
      const team = await db.add(req.team)
      res.json(201).json(team)
    } catch ({ message }) {
      res.status(500).json({ message: "Unable to add the team." })
    }
  }
)

/**
 * @desc    Get all the user's team
 * @route   GET /api/teams
 * @access  Private, Admin
 */
router.get("/", authorized(["admin" | "manager"]), async (req, res) => {
  try {
    const team = await db.findAll()
    res.json(200).json(team)
  } catch ({ message }) {
    res.status(500).json({ message: "Unable to add the team." })
  }
})

/**
 * @desc    Get a single team
 * @route   GET /api/teams/:id
 * @access  Private, Admin
 */
router.get(
  "/:id",
  authorized(["admin" | "manager"]),
  idValidation,
  async (req, res) => {
    try {
      const team = await db.findbyId(req.id)
      if (!team) res.status(404).json({ message: "Team not found." })
      else res.json(200).json(team)
    } catch ({ message }) {
      res.status(500).json({ message: "Unable to add the team." })
    }
  }
)

/**
 * @desc    Update a team
 * @route   PUT /api/teams/:id
 * @access  Private, Admin
 */
router.put(
  "/:id",
  authorized(["admin" | "manager"]),
  idValidation,
  teamValidation,
  async (req, res) => {
    try {
      const team = await db.findbyId(req.id)
      if (!team) res.status(404).json({ message: "Team not found." })
      else {
        const update = await db.update(team.id, req.update)
        res.json(201).json(update)
      }
    } catch ({ message }) {
      res.status(500).json({ message: "Unable to add the team." })
    }
  }
)

/**
 * @desc    Delete a team
 * @route   DELETE /api/teams/:id
 * @access  Private, Admin
 */
router.delete(
  "/:id",
  authorized(["admin" | "manager"]),
  idValidation,
  async (req, res) => {
    try {
      const team = await db.findbyId(req.id)
      if (!team) res.status(404).json({ message: "Team not found." })
      else {
        const team = await db.remove(team.id)
        res.json(200).json({ message: "Team successfully deleted!" })
      }
    } catch ({ message }) {
      res.status(500).json({ message: "Unable to add the team." })
    }
  }
)

module.exports = router
