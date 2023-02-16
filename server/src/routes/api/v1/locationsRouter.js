import express from "express";
import { ValidationError } from "objection";

import { Location } from "../../../models/index.js"

const locationsRouter = new express.Router()

locationsRouter.get("/:id", async (req, res) => {
  const { id } = req.params

  console.log("IN THE ROUTER", id)
  try {
    const location = await Location.query().findById(id)
    return res.status(200).json({ location: location })
  } catch(error) {
    return res.status(500).json({ errors: error })
  }
})

locationsRouter.get("/", async (req, res) => {
  try {
    const locations = await Location.query()
    return res.status(200).json({ locations: locations })
  } catch (error) {
    return res.status(500).json({ errors: error })
  }
})

export default locationsRouter