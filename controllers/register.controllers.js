import bcrypt from "bcrypt";
import User from "../models/User.js";

const handleNewUser = async (req, res) => {
  const { user, pwd } = req.body;
  if (!user || !pwd)
    return res
      .status(400)
      .json({ message: "Username and Password are required." });
  // Check for duplicate username in the db
  const duplicate = await User.findOne({ username: user }).exec();
  if (duplicate) return res.sendStatus(409); // Conflict
  try {
    // Encrypt the password
    const hashedPwd = await bcrypt.hash(pwd, 10); // 10 (salt) sets of random characters to form a hash with the password
    // Create and store the new user
    const newUser = await User.create({
      username: user,
      password: hashedPwd,
    });
    console.log(newUser);
    res.status(201).json({ success: `New user ${user} created!` });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

export default handleNewUser;
