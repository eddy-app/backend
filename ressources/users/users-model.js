const db = require("../../data/dbConfig.js")

const findAll = async () => await db("users")

const findById = async (id) => await db("users").where({ id }).first()

const add = async (data) => {
  const [id] = await db("users").insert(data, "id")
  return findById(id)
}

const update = async (id, update) => {
  const user = await db("users").where("id", id).update(update)
  return findById(id)
}

const remove = async (id) => await db("users").where("id", id).del()

module.exports = {
  findAll,
  findById,
  add,
  update,
  remove,
}
