const Model = require("./Model")

class Comment extends Model {
  static get tableName() {
    return "comments"
  }

  static get jsonSchema() {
    return {
      type: "object",
      required: ["userId", "locationId", "comment"],
      properties: {
        userId: { type: ["integer", "string"] },
        locationId: { type: ["integer", "string"] },
        comment: { type: "string", minLength: 10, maxLength: 150 }
      }
    }
  }

  static get relationMappings() {
    const { Location, User } = require("./index.js")
    return {
      location: {
        relation: Model.BelongsToOneRelation,
        modelClass: Location,
        join: {
          from: "comments.locationId",
          to: "locations.id"
        }
      },
      user: {
        relation: Model.BelongsToOneRelation,
        modelClass: User,
        join: {
          from: "comments.userId",
          to: "users.id"
        }
      }
    }
  }
}

module.exports = Comment