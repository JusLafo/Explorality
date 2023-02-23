import express from "express";
import passport from "passport";
import { User } from "../../../models/index.js";
import uploadImage from "../../../services/uploadImage.js";

import { ValidationError } from "objection";

const usersRouter = new express.Router();

usersRouter.patch("/:id", uploadImage.single("image"), async (req, res) => {
  const { id } = req.params
  const { location } = req.file
  try {
    const user = await User.query().findById(id)
    await user.$query().patch({ ...user, profileImage: location })
    return res.status(200).json({ user })
  } catch (error) {
    return res.status(500).json({ errors: error })
  }
})

usersRouter.get("/:id", async (req, res) => {
  const { id } = req.params
  try {
    const user = await User.query().findById(id)
    return res.status(200).json({ user })
  } catch (error) {
    console.error(error)
  }
})


usersRouter.post("/", async (req, res) => {
  const { username, email, password, profileImage } = req.body;
  try {
    const persistedUser = await User.query().insertAndFetch({ username, email, password });
    console.log(persistedUser)
    return req.login(persistedUser, () => {
      return res.status(201).json({ user: persistedUser });
    });
  } catch (error) {
    if (error instanceof ValidationError) {
      return res.status(422).json({ errors: error.data })
    }
    return res.status(500).json({ errors: error })
  }
});

export default usersRouter;
