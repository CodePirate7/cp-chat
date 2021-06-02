import express, { Request, Response } from "express";
import { currentUser } from "@cptodos/common";
import { User } from "../models/user";

const router = express.Router();

router.get(
  "/api/users/currentuser",
  currentUser,
  async (req: Request, res: Response) => {
    console.log(req.currentUser);
    if (req.currentUser) {
      const existingUser = await User.findById(req.currentUser.id);
      return res.status(200).send({ currentUser: existingUser });
    }
    res.status(200).send({ currentUser: null });
  }
);

export { router as currentUserRouter };
