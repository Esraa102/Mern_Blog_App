import { User } from "../models/user.model.js";
import bcryptjs from "bcryptjs";
const registerUser = async (req, res) => {
  const { username, email, password } = req.body;
  try {
    const user = await User.findOne({ email });
    if (user) {
      res.status(400).json({ error: "User Is Already Exist" });
    } else {
      const hashedPassword = bcryptjs.hashSync(password, 10);
      const newUser = await User.create({
        username,
        email,
        password: hashedPassword,
      });
      if (!newUser) {
        res.status(400).json({ error: "Invalid inputs" });
        throw new Error("Invalid inputs");
      } else {
        res.status(201).json({ newUser });
      }
    }
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: error.message });
  }
};

export { registerUser };
