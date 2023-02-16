/* eslint-disable no-console */
import { connection } from "../boot.js"
import LocationSeeder from "./seeders/LocationSeeder.js"

class Seeder {
  static async seed() {
    console.log("seeding locations")
    await LocationSeeder.seed()

    console.log("Done!")
    await connection.destroy()
  }
}

export default Seeder