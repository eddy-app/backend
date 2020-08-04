const Joi = require("@hapi/joi")
const uuid = require("uuid")

// Validation to create and update an organization
const orgValidation = async (req, res, next) => {
  /*
  @desc     Schema for req.body
  @method   POST
  */
  const createSchema = Joi.object().keys({
    name: Joi.string().min(3).max(128).required(),
    email: Joi.string().email().min(3).max(200).required(),
  })

  /*
  @desc     Schema for req.body
  @method   PUT
  */
  const updateSchema = Joi.object().keys({
    name: Joi.string().min(3).max(128),
    workspace: Joi.string().email().min(3).max(200),
    email: Joi.string().email().min(3).max(200),
    subscription: Joi.string().min(3).max(50),
    stripe_id: Joi.string().alphanum().min(20).max(128),
  })

  try {
    if (req.method === "POST") {
      const result = await createSchema.validateAsync(req.body)
      if (result) {
        req.org = result
        next()
      }
    }

    if (req.method === "PUT") {
      const result = await updateSchema.validateAsync(req.body)
      if (result) {
        req.update = result
        next()
      }
    }
  } catch (error) {
    if (error.isJoi === true) {
      error.status = 422
      res.status(error.status).json({ message: error.details[0].message })
    } else {
      res.status(500).json({
        message: "Unexpected error.",
      })
    }
  }
}

// Validation to create and update user
const teamValidation = async (req, res, next) => {
  /*
  @desc     Schema for req.body
  @method   POST
  */
  const createSchema = Joi.object().keys({
    id: Joi.string.uuid().required(),
    name: Joi.string().alphanum().min(3).max(128).required(),
    FK_organization: Joi.string().uuid().required(),
  })

  /*
  @desc     Schema for req.body
  @method   PUT
  */
  const updateSchema = Joi.object().keys({
    name: Joi.string().alphanum().min(3).max(128),
    FK_organization: Joi.string().uuid(),
  })

  try {
    if (req.method === "POST") {
      const result = await createSchema.validateAsync({
        ...req.body,
        id: uuid.v4(),
      })
      if (result) {
        req.team = result
        next()
      }
    }

    if (req.method === "PUT") {
      const result = await updateSchema.validateAsync(req.body)
      if (result) {
        req.update = result
        next()
      }
    }
  } catch (error) {
    if (error.isJoi === true) {
      error.status = 422
      res.status(error.status).json({ message: error.details[0].message })
    } else {
      res.status(500).json({
        message: "Unexpected error.",
      })
    }
  }
}

// Validation to create and update user
const userValidation = async (req, res, next) => {
  /*
  @desc     Schema for req.body
  @method   POST
  */
  const createSchema = Joi.object().keys({
    id: Joi.string().uuid(),
    firstname: Joi.string().alphanum().min(3).max(128).required(),
    lastname: Joi.string().alphanum().min(3).max(128).required(),
    email: Joi.string().email().lowercase().min(3).max(200).required(),
    handle: Joi.string().email().lowercase().min(3).max(128).required(),
    FK_team: Joi.string().uuid().required(),
    FK_organization: Joi.string().uuid().required(),
  })

  /*
  @desc     Schema for req.body
  @method   PUT
  */
  const updateSchema = Joi.object().keys({
    firstname: Joi.string().alphanum().min(3).max(128),
    lastname: Joi.string().alphanum().min(3).max(128),
    email: Joi.string().email().lowercase().min(3).max(200),
    handle: Joi.string().email().lowercase().min(3).max(200),
    is_employed: Joi.boolean(),
    FK_team: Joi.string().uuid(),
    FK_organization: Joi.string().uuid(),
  })

  try {
    if (req.method === "POST") {
      const result = await createSchema.validateAsync({
        ...req.body,
        id: uuid.v4(),
      })
      if (result) {
        req.user = result
        next()
      }
    }

    if (req.method === "PUT") {
      const result = await updateSchema.validateAsync(req.body)
      if (result) {
        req.update = result
        next()
      }
    }
  } catch (error) {
    if (error.isJoi === true) {
      error.status = 422
      res.status(error.status).json({ message: error.details[0].message })
    } else {
      res.status(500).json({
        message: "Unexpected error.",
      })
    }
  }
}

// Validation to create and update a device.
const deviceValidation = async (req, res, next) => {
  /*
  @desc     Schema for req.body
  @method   POST
  */
  const createSchema = Joi.object().keys({
    id: Joi.string().uuid().required(),
    model: Joi.string().alphanum().min(3).max(255).required(),
    serial: Joi.string().alphanum().min(3).max(255).required(),
    os: Joi.string().min(3).max(128).required(),
    brand: Joi.string().min(3).max(128).required(),
    FK_organization: Joi.string().uuid().required(),
    FK_team: Joi.string().uuid().required(),
    FK_user: Joi.string().uuid().required(),
  })

  /*
  @desc     Schema for req.body
  @method   PUT
  */
  const updateSchema = Joi.object().keys({
    model: Joi.string().alphanum().min(3).max(255),
    serial: Joi.string().alphanum().min(3).max(255),
    os: Joi.string().min(3).max(128),
    brand: Joi.string().min(3).max(128),
    FK_organization: Joi.string().uuid(),
    FK_team: Joi.string().uuid(),
    FK_user: Joi.string().uuid(),
    is_assigned: Joi.boolean(),
  })

  try {
    if (req.method === "POST") {
      const result = await createSchema.validateAsync({
        ...req.body,
        id: uuid.v4(),
      })
      if (result) {
        req.device = result
        next()
      }
    }

    if (req.method === "PUT") {
      const result = await updateSchema.validateAsync(req.body)
      if (result) {
        req.update = result
        next()
      }
    }
  } catch (error) {
    if (error.isJoi === true) {
      error.status = 422
      res.status(error.status).json({ message: error.details[0].message })
    } else {
      res.status(500).json({
        message: "Unexpected error.",
      })
    }
  }
}

// Validation to create and update a request.
const requestValidation = async (req, res, next) => {
  /*
  @desc     Schema for req.body
  @method   POST
  */
  const createSchema = Joi.object().keys({
    id: Joi.string().uuid().required(),
    device_model: Joi.string().min(3).max(128).required(),
    FK_user: Joi.string().uuid().required(),
  })

  /*
  @desc     Schema for req.body
  @method   PUT
  */
  const updateSchema = Joi.object().keys({
    device_model: Joi.string().min(3).max(128),
    body: Joi.string().min(3).max(500),
    is_open: Joi.boolean(),
    FK_user: Joi.string().uuid(),
  })

  try {
    if (req.method === "POST") {
      const result = await createSchema.validateAsync({
        ...req.body,
        id: uuid.v4(),
      })
      if (result) {
        req.request = result
        next()
      }
    }

    if (req.method === "PUT") {
      const result = await updateSchema.validateAsync(req.body)
      if (result) {
        req.update = result
        next()
      }
    }
  } catch (error) {
    if (error.isJoi === true) {
      error.status = 422
      res.status(error.status).json({ message: error.details[0].message })
    } else {
      res.status(500).json({ message: "Unexpected error." })
    }
  }
}

// Validation to create and update a request.
const logValidation = async (req, res, next) => {
  /*
  @desc     Schema for req.body
  @method   POST
  */
  const createSchema = Joi.object().keys({
    id: Joi.string().uuid().required(),
    description: Joi.string().min(3).max(500).required(),
    FK_device: Joi.string().uuid().required(),
    FK_user: Joi.string().uuid().required(),
  })

  /*
  @desc     Schema for req.body
  @method   PUT
  */
  const updateSchema = Joi.object().keys({
    description: Joi.string().min(3).max(500),
    FK_device: Joi.string().uuid(),
    FK_user: Joi.string().uuid(),
  })

  try {
    if (req.method === "POST") {
      const result = await createSchema.validateAsync({
        ...req.body,
        id: uuid.v4(),
      })
      if (result) {
        req.log = result
        next()
      }
    }

    if (req.method === "PUT") {
      const result = await updateSchema.validateAsync(req.body)
      if (result) {
        req.update = result
        next()
      }
    }
  } catch (error) {
    if (error.isJoi === true) {
      error.status = 422
      res.status(error.status).json({ message: error.details[0].message })
    } else {
      res.status(500).json({ message: "Unexpected error." })
    }
  }
}

// Validation for id parameters
const idValidation = async (req, res, next) => {
  /*
  @desc     Schema for req.params.id
  @method   GET, PUT, & DELETE
  */
  const idParam = Joi.string().uuid()
  try {
    const result = await idParam.validateAsync(req.params.id)
    if (result) {
      req.id = result
      next()
    }
  } catch (error) {
    if (error.isJoi === true) {
      error.status = 400
      res.status(error.status).json({ message: error.details[0].message })
    } else {
      res.status(500).json({ message: "Unexpected error." })
    }
  }
}

module.exports = {
  orgValidation,
  teamValidation,
  userValidation,
  deviceValidation,
  requestValidation,
  logValidation,
  idValidation,
}
