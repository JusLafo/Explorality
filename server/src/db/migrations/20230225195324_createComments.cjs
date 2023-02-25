/**
 * @typedef {import("knex")} Knex
 */

/**
 * @param {Knex} knex
 */
exports.up = async (knex) => {
  return knex.schema.createTable("comments", (table) => {
    table.bigIncrements("id")
    table.bigInteger("userId").notNullable().unsigned().index().references("users.id")
    table.bigInteger("locationId").notNullable().unsigned().index().references("locations.id")
    table.string("comment").notNullable()
    table.timestamp("createdAt").notNullable().defaultTo(knex.fn.now())
    table.timestamp("updatedAt").notNullable().defaultTo(knex.fn.now())
  })
}

/**
 * @param {Knex} knex
 */
exports.down = (knex) => {
  return knex.schema.dropTableIfExists("comments")
}
