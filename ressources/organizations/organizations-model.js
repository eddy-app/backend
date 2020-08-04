const db = require("../../data/dbConfig.js")

const findAll = async () => await db("organizations")

const findById = async (uid) => await db("organizations").where({ uid }).first()

const add = async (data) => {
  const [uid] = await db("organizations").insert(data, "uid")
  return findById(id)
}

const update = async (uid, update) => {
  const organization = await db("organizations")
    .where("uid", uid)
    .update(update)
  return findById(id)
}

const remove = async (uid) => await db("organizations").where("uid", uid).del()

module.exports = {
  findAll,
  findById,
  add,
  update,
  remove,
}
