import { customError } from "../utils/customError.js";
import bcryptjs from "bcryptjs";
import { User } from "../models/user.model.js";

const updateUserProfile = async (req, res, next) => {
  // to ensure that the owner of proifle is who trying to update it
  if (req.user._id !== req.params.id) {
    return next(customError(403, "You can only update your profile"));
  } else {
    try {
      if (req.body.password) {
        req.body.password = bcryptjs.hashSync(req.body.password, 10);
      }
      const updatedUser = await User.findByIdAndUpdate(
        req.params.id,
        {
          $set: {
            username: req.body.username,
            password: req.body.password,
            imgProfile: req.body.imgProfile,
          },
        },
        { new: true }
      );
      const { password, ...rest } = updatedUser._doc;
      res.status(200).json({ userData: rest });
    } catch (error) {
      return next(customError(500, error.message));
    }
  }
};

export { updateUserProfile };
