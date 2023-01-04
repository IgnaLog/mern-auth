import jwt from "jsonwebtoken";
import User from "../models/User.js";
import { ACCESS_TOKEN_SECRET, REFRESH_TOKEN_SECRET } from "../config/dotenv.js";

const handleRefreshToken = async (req, res) => {
  const cookies = req.cookies;
  if (!cookies?.jwt) return res.sendStatus(401); // Unauthorized
  const refreshToken = cookies.jwt;
  const foundUser = await User.findOne({ refreshToken }).exec();
  if (!foundUser) return res.sendStatus(403); // Forbidden

  // Evaluate jwt
  try {
    const decoded = await jwt.verify(refreshToken, REFRESH_TOKEN_SECRET);
    if (foundUser.username !== decoded.username) throw new Error();
    const roles = Object.values(foundUser.roles);
    const accessToken = jwt.sign(
      {
        userInfo: {
          username: decoded.username,
          roles: roles,
        },
      },
      ACCESS_TOKEN_SECRET,
      { expiresIn: "30s" } // Production expiresIn 5-15 min
    );
    res.json({ accessToken });
  } catch (err) {
    return res.sendStatus(403);
  }
};

export default handleRefreshToken;
