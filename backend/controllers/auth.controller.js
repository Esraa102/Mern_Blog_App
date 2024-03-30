import { User } from "../models/user.model.js";
import { customError } from "../utils/customError.js";
import bcryptjs from "bcryptjs";

const registerUser = async (req, res, next) => {
  const { username, email, password } = req.body;
  try {
    const user = await User.findOne({ email });
    if (user) {
      next(customError(res.status(400), "User Is Already Exist"));
    } else {
      const hashedPassword = bcryptjs.hashSync(password, 10);
      const newUser = await User.create({
        username,
        email,
        password: hashedPassword,
      });
      if (!newUser) {
        next(customError(res.status(400), "Invalid Inputs"));
      } else {
        res.status(201).json({ newUser });
      }
    }
  } catch (error) {
    next(customError(500, error.message));
  }
};

export { registerUser };
