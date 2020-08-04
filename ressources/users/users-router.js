const router = require("express").Router()
const db = require("./users-model.js")
const {
  userValidation,
  idValidation,
} = require("../../middlewares/validation.js")

/**
 * @desc    Add a user to the database
 * @route   POST /api/users
 * @access  Private, Admin
 */
router.post("/", userValidation, async (req, res) => {
  try {
    const user = await db.add(req.user)
    res.status(201).json(user)
  } catch ({ message }) {
    res.status(500).json({ message: "Unable to create user." })
  }
})

/**
 * @desc    Get all the users from the database
 * @route   GET /api/users
 * @access  Private, Admin
 */
router.get("/", async (req, res) => {
  try {
    const users = await db.findAll()
    res.status(200).json(users)
  } catch ({ message }) {
    res.status(500).json({ message: "Unable to retrieve the  users." })
  }
})

/**
 * @desc    Get a single user
 * @route   GET /api/users/:id
 * @access  Private, Admin, user
 */
router.get(
  "/:id",

  idValidation,
  async (req, res) => {
    try {
      const user = await db.findById(req.id)
      if (!user) res.status(404).json({ message: "User not found." })
      else res.status(200).json(users)
    } catch ({ message }) {
      res.status(500).json({ message: "Unable to create user." })
    }
  }
)

/**
 * @desc    Update an existing user
 * @route   PUT /api/users/:id
 * @access  Private, Admin
 */
router.put("/:id", idValidation, userValidation, async (req, res) => {
  try {
    const user = await db.findById(req.id)
    if (!user) res.status(404).json({ message: "User not found." })
    else {
      const update = await db.update(user.id, req.update)
      res.status(201).json(update)
    }
  } catch ({ message }) {
    res.status(500).json({ message: "Unable to create user." })
  }
})

/**
 * @desc    Delete an existing user
 * @route   DELETE /api/users/:id
 * @access  Private, Admin
 */
router.delete("/:id", idValidation, async (req, res) => {
  try {
    const user = await db.findById(req.id)
    if (!user) res.status(404).json({ message: "User not found." })
    else {
      await db.remove(user.id)
      res.status(200).json({ message: "User successfully deleted!" })
    }
  } catch ({ message }) {
    res.status(500).json({ message: "Unable to create user." })
  }
})

module.exports = router
