import jwt from "jsonwebtoken";
import userModel from "../model/user.model.js";
import config from "../config/config.js";
async function createjwt(user, res, message) {
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

    if (existinguser) {
      return res.status(400).json({
        message: "User with this email or contact already exists",
      });
    }

    const user = await userModel.create({
      email,
      contact,
      password,
      fullname,
      role: isseller ? "seller" : "buyer",
    });

    return await createjwt(user, res, "User registered successfully");
  } catch (err) {
    console.log("server error " + err);
    return res.status(500).json({
      message: "Server error",
    });
  }
}

export async function loginController(req, res, next) {
  const { email, password } = req.body;
  try {
    const user = await userModel.findOne({ email: email });
    if (!user) {
      return res.status(404).json({
        message: "User not found",
      });
    }

    const ispasswordvalid = await user.comparePassword(password);
    if (!ispasswordvalid) {
      return res.status(401).json({
        message: "Invalid password",
      });
    }
    createjwt(user, res, {
      message: "User logged in successfully",
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      message: " server error",
    });
  }
}
