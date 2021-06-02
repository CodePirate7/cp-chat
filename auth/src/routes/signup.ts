import express, { Request, Response } from "express";
import { body } from "express-validator";
import jwt from "jsonwebtoken";
import { BadRequestError } from "@cptodos/common";
import { validateRequest } from "@cptodos/common";
import { User } from "../models/user";
import { natsWrapper } from "../nats-wrapper";
import { UserCreatedPublisher } from "../events/publishers/user-created-publisher";

const router = express.Router();

router.post(
  "/api/users/signup",
  [
    body("email").isEmail().withMessage("Email must be valid"),
    body("password")
      .trim()
      .isLength({ min: 4, max: 20 })
      .withMessage("Password must be between 4 and 20 characters"),
  ],
  validateRequest,
  async (req: Request, res: Response) => {
    const { email, password, nickName } = req.body;
    let { avatar } = req.body;
    if (!avatar) {
      avatar = "https://avatars.githubusercontent.com/u/35660919?v=4";
    }
    const existingUser = await User.findOne({ email });

    if (existingUser) {
      throw new BadRequestError("Email in use");
    }

    const user = User.build({ email, password, nickName, avatar });
    await user.save();

    // Generate JWT
    const userJwt = jwt.sign(
      {
        id: user.id,
        email: user.email,
      },
      process.env.JWT_KEY!
    );

    // Store it on session object
    req.session = {
      jwt: userJwt,
    };
    // publish user:created 事件
    new UserCreatedPublisher(natsWrapper.client).publish({
      ...user.toJSON(),
    });

    res.status(201).send(user);
  }
);

export { router as signupRouter };
