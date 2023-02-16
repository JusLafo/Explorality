const Model = require("./Model")

class Location extends Model {
  static get tableName() {
    return "locations"
  }

  static get jsonSchema() {
    return {
      type:"object",
      required: ["name", "coordinates", "image", "description", "difficulty"],
      properties: {
        name: { type: "string" },
        coordinates: { type: "string" },
        image: { type: "string" },
        description: { type: "string" },
        difficulty: { type: ["integer", "string"], minimum: 1, maximum: 5 }
      }
    }
  }
}

module.exports = Location

