import { User } from "../models/user.model.js";
import { customError } from "../utils/customError.js";
import bcryptjs from "bcryptjs";
import jwt from "jsonwebtoken";
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

const loginUser = async (req, res, next) => {
  const { password, email } = req.body;
  try {
    const user = await User.findOne({ email });
    if (!user) {
      next(customError(404, "User Not Found"));
    } else {
      // compare password with encrypted password
      if (await bcryptjs.compare(password, user.password)) {
        const accessToken = jwt.sign(
          {
            _id: user._id,
            username: user.username,
            email: user.email,
            password,
          },
          process.env.ACCESS_TOKEN_SECRET
        );
        const { password: encryptedPassword, ...rest } = user._doc;
        const expiresData = new Date(Date.now() + 3600000); // 1hour
        res
          .cookie("access_token", accessToken, {
            httpOnly: true,
            expires: expiresData,
          })
          .status(200)
          .json({
            user: rest,
          });
      } else {
        next(customError(400, "Wrong Credentials"));
      }
    }
  } catch (error) {
    next(customError(500, error.message));
  }
};

export { registerUser, loginUser };
