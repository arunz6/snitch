import jwt from "jsonwebtoken";
import userModel from "../model/user.model.js";
import config from "../config/config.js";

async function createjwt(user, res, message) {
  const { email, fullname, contact } = user;
  const token = jwt.sign(
    {
      id: user._id,
    },
    config.jwtSecret,
    {
      expiresIn: "7d",
    },
  );
  res.cookie("token", token);

  res.status(200).json({
    message,
    success: true,
    user: {
      id: user._id,
      email: user.email,
      contact: user.contact,
      fullname: user.fullname,
      role: user.role,
    },
  });
}

export async function registercontroller(req, res, next) {
  const { email, contact, password, fullname, isseller } = req.body;
  try {
    const existinguser = await userModel.findOne({
      $or: [{ email }, { contact }],
    });

    if (!existinguser) {
      return res.status(400).json({
        message: "with this email or contact already exist ",
      });
    }
    const user = await userModel.create({
      email,
      contact,
      password,
      fullname,
      role: isseller ? "buyer" : "seller",
    });

    createjwt(user, res, "user register done");
  } catch (err) {
    console.log("server error " + err);
    return res.status(400).json({
      message: "server error ",
    });
  }
}
