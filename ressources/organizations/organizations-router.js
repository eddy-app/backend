const router = require("express").Router()

const db = require("./organizations-model.js")
const {
  orgValidation,
  idValidation,
} = require("../../middlewares/validation.js")

/**
 * @desc    Add a new organization in the database
 * @route   POST /api/organizations
 * @access  Private
 */
router.post("/", orgValidation, async (req, res) => {
  try {
    const organization = await db.add(req.org)
    res.status(201).json(organization)
  } catch ({ message }) {
    res.status(500).json({ message: "Unable to create the organization." })
  }
})

/**
 * @desc    Get a all organizations from the database
 * @route   GET /api/organizations
 * @access  Private
 */
router.get("/", async (req, res) => {
  try {
    const organizations = await db.findAll()
    res.status(200).json(organizations)
  } catch ({ message }) {
    res.status(500).json({ message: "Unable to create the organization." })
  }
})

/**
 * @desc    Get a single organization in the database
 * @route   GET /api/organizations/:id
 * @access  Private
 */
router.get("/:id", idValidation, async (req, res) => {
  try {
    const organization = await db.findById(req.id)
    if (!organization)
      res.status(404).json({ message: "Organization not found!" })
    else res.status(200).json(organization)
  } catch ({ message }) {
    res.status(500).json({ message: "Unable to create the organization." })
  }
})

/**
 * @desc    Update an organization in the database
 * @route   PUT  /api/organizations/:id
 * @access  Private
 */
router.put("/:id", idValidation, orgValidation, async (req, res) => {
  try {
    const organization = await db.findById(req.id)
    if (!organization) {
      res.status(404).json({ message: "Organization not found!" })
    } else {
      const update = await db.update(organization.id, req.organization)
      res.status(201).json(update)
    }
  } catch ({ message }) {
    res.status(500).json({ message: "Unable to create the organization." })
  }
})

/**
 * @desc    Remove an organization from the database
 * @route   DELETE /api/organizations/:id
 * @access  Private
 */
router.delete("/:id", idValidation, async (req, res) => {
  try {
    const organization = await db.findById(req.id)
    if (!organization) {
      res.status(404).json({ message: "Organization not found!" })
    } else {
      await db.remove(organization.id)
      res.status(200).json({ message: "Organization successfully deleted." })
    }
  } catch ({ message }) {
    res.status(500).json({ message: "Unable to create the organization." })
  }
})

module.exports = router
