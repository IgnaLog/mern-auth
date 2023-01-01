import jwt from "jsonwebtoken";
import { ACCESS_TOKEN_SECRET } from "../config/dotenv.js";

const verifyJWT = async (req, res, next) => {
  const authHeader = req.headers.authorization || req.headers.Authorization;
  if (!authHeader?.startsWith("Bearer ")) return res.sendStatus(401); // Unauthorized
  const token = authHeader.split(" ")[1];
  try {
    const decoded = await jwt.verify(token, ACCESS_TOKEN_SECRET);
    req.user = decoded.userInfo.username;
    req.roles = decoded.userInfo.roles;
    next();
  } catch (err) {
    return res.sendStatus(403); // Invalid token
  }
};

export default verifyJWT;
