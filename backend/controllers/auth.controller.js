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
        const { password: encryptedPassword, ...rest } = newUser._doc;
        const accessToken = jwt.sign(
          {
            _id: newUser._id,
            username: newUser.username,
            email: newUser.email,
            password: hashedPassword,
          },
          process.env.ACCESS_TOKEN_SECRET
        );
        const expiresData = new Date(Date.now() + 3600000); // 1hour
        res
          .cookie("access_token", accessToken, {
            httpOnly: true,
            expires: expiresData,
          })
          .status(200)
          .json({
            newUser: rest,
          });
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
      next(customError(401, "User Is Unauthenticated"));
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

const googleAuth = async (req, res, next) => {
  const { username, email, imgProfile } = req.body;
  try {
    const user = await User.findOne({ email });
    if (user) {
      const accessToken = jwt.sign(
        { _id: user._id },
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
          userData: rest,
        });
    } else {
      const genertatedPassword = Math.random().toString(30).slice(2);
      const generatedUsername =
        username.split(" ").join("").toLowerCase() +
        Math.round(Math.random() * 10000);
      const hashedGenertatedPassword = bcryptjs.hashSync(
        genertatedPassword,
        10
      );
      const newUser = await User.create({
        username: generatedUsername,
        email,
        imgProfile,
        password: hashedGenertatedPassword,
      });
      if (!newUser) {
        next(customError(res.status(400), "Invalid Inputs"));
      } else {
        const { password: encryptedPassword, ...rest } = newUser._doc;
        const accessToken = jwt.sign(
          {
            _id: newUser._id,
            username: newUser.username,
            email: newUser.email,
            password: newUser.password,
          },
          process.env.ACCESS_TOKEN_SECRET
        );
        const expiresData = new Date(Date.now() + 3600000); // 1hour
        res
          .cookie("access_token", accessToken, {
            httpOnly: true,
            expires: expiresData,
          })
          .status(200)
          .json({
            userData: rest,
          });
      }
    }
  } catch (error) {
    next(customError(500, error.message));
  }
};
export { registerUser, loginUser, googleAuth };
