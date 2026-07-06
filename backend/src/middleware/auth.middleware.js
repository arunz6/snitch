import config from "../config/config.js";
import jwt from "jsonwebtoken";
import userModel from "../model/user.model.js";

export async function isSeller(req, res, next) {
  const token = req.cookies.token;
  if (!token) {
    return res.status(401).json({ message: "token not present" });
  }
  try {
    const decodedToken = jwt.verify(token, config.jwtSecret);

    const user = await userModel.findById(decodedToken.id).select("-password");
    if (!user) {
      return res.status(401).json({ message: "user not found" });
    }

    if (user.role !== "seller") {
      return res.status(401).json({ message: "user not seller" });
    }

    req.user = user;
    next();
  } catch (err) {
    return res.status(401).json({ message: "token not verified" });
  }
}
