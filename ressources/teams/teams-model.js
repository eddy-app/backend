const db = require("../../data/dbConfig.js")

const findAll = async () => await db("teams")

const findById = async (id) => await db("teams").where({ id }).first()

const add = async (data) => {
  const [id] = await db("teams").insert(data, "id")
  return findById(id)
}

const update = async (id, update) => {
  const team = await db("teams").where("id", id).update()
  return findById(id)
}

const remove = async (id) => await db("teams").where("id", id).del()

module.exports = {
  findAll,
  findById,
  add,
  update,
  remove,
}
