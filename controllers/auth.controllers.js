import fs from "fs";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import path, { dirname } from "path";
import { fileURLToPath } from "url";
import { ACCESS_TOKEN_SECRET, REFRESH_TOKEN_SECRET } from "../config/dotenv.js";

const __dirname = dirname(fileURLToPath(import.meta.url));

const loadJSON = (path) =>
  JSON.parse(fs.readFileSync(new URL(path, import.meta.url)));

const usersDB = {
  users: loadJSON("../models/users.json"),
  setUsers: function (data) {
    this.users = data;
  },
};

const handleLogin = async (req, res) => {
  const { user, pwd } = req.body;
  if (!user || !pwd)
    return res
      .sendStatus(400)
      .json({ message: "Username and Password are required." });
  const foundUser = usersDB.users.find((person) => person.username === user);
  if (!foundUser) return res.sendStatus(401); // Unauthorized
  // Evaluate password
  const match = await bcrypt.compare(pwd, foundUser.password);
  if (match) {
    const roles = Object.values(foundUser.roles);
    // Create JWTs
    const accessToken = jwt.sign(
      {
        userInfo: {
          username: foundUser.username,
          roles: roles,
        },
      },
      ACCESS_TOKEN_SECRET,
      { expiresIn: "30s" } // Production expiresIn 5-15 min
    );
    const refreshToken = jwt.sign(
      { username: foundUser.username },
      REFRESH_TOKEN_SECRET,
      { expiresIn: "1d" }
    );
    const otherUsers = usersDB.users.filter(
      (person) => person.username !== foundUser.username
    );
    // Saving refreshToken with current user
    const currentUser = { ...foundUser, refreshToken };
    usersDB.setUsers([...otherUsers, currentUser]);
    await fs.promises.writeFile(
      path.join(__dirname, "..", "models", "users.json"),
      JSON.stringify(usersDB.users)
    );
    // Send tokens to the frontEnd developer
    // Send the refreshToken and save as a cookie in the browser
    res.cookie("jwt", refreshToken, {
      httpOnly: true, // With 'httpOnly' it will only be accessible from an http request, not from a javascript, which makes it more secure
      sameSite: "None", // None: The cookie will be sent with requests made from any site, including requests from third parties.
      secure: true, // The cookie will only be sent over a secure connection (https)
      maxAge: 24 * 60 * 60 * 1000, // 1d in milliseconds
    });
    // Send the accessToken
    res.json({ accessToken });
  } else {
    res.sendStatus(401); // Unauthorized
  }
};

export default handleLogin;
