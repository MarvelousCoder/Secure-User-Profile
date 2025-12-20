import "dotenv/config";
import { generateToken, verifyToken } from "./jwt.util.js";

const token = generateToken({ userId: 1 });
console.log("TOKEN:", token);

const decoded = verifyToken(token);
console.log("DECODED:", decoded);
