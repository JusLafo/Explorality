import express from "express";
import passport from "passport";
import { User } from "../../../models/index.js";

import { ValidationError } from "objection";

const usersRouter = new express.Router();

usersRouter.post("/", async (req, res) => {
  console.log("IN ROUTER")
  const { email, password, passwordConfirmation } = req.body;
  console.log(req.body)
  try {
    const persistedUser = await User.query().insertAndFetch({ email, password });
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
