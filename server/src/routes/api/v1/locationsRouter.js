import express from "express";
import { ValidationError } from "objection";
import { Location } from "../../../models/index.js"
import uploadImage from "../../../services/uploadImage.js";

const locationsRouter = new express.Router()

locationsRouter.get("/:id", async (req, res) => {
  const { id } = req.params
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

locationsRouter.post("/", uploadImage.single("image"), async (req, res) => {
  const coordinates = `${req.body.latitude}, ${req.body.longitude}`
  const body = {
    name: req.body.name,
    coordinates: coordinates,
    image: req.file.location,
    description: req.body.description,
    difficulty: req.body.difficulty
  }
  try {
    const newLocation = await Location.query().insertAndFetch(body)
    return res.status(201).json({ location: newLocation })
  } catch (error) {
    if (error instanceof ValidationError) {
      return res.status(422).json({ errors: error.data })
    }
    return res.status(500).json({ errors: error })
  }
})

export default locationsRouter