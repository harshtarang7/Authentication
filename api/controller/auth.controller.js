import bcryptjs from "bcryptjs";
import User from "../models/user.model.js";

export const signup = async (req, res,next) => {
    const { username, email, password } = req.body;
    const hashedPassword = await bcryptjs.hash(password,10)
    const newUser = new User({ username, email, password:hashedPassword });

  try {
    await newUser.save();
    res.status(201).json({ 
        data:newUser,
        message: "user Created successfully" 
    });
  } catch (error) {
   next(error);
  }
}
