import jwt from "jsonwebtoken";
import { customError } from "../utils/customError.js";

export const verifyToken = async (req, res, next) => {
  const token = req.cookies.access_token;
  if (!token) {
    next(customError(401, "Access Denied,You Need To Log In"));
  }
  jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, (err, decoded) => {
    if (err) {
      next(customError(403, "Token Is Not Valid"));
    }
    req.user = decoded;
    next();
  });
};
