// import { verifyToken } from "../utils/jwt.util.js";

// export const authMiddleware = (req, res, next) => {
//     try {
//         const authHeader = req.headers.authorization;

//         // 1️⃣ Check token presence
//         if (!authHeader) {
//             return res.status(401).json({
//                 success: false,
//                 message: "Authorization token missing",
//             });
//         }

//         // 2️⃣ Extract token
//         const token = authHeader.split(" ")[1];

//         if (!token) {
//             return res.status(401).json({
//                 success: false,
//                 message: "Invalid authorization format",
//             });
//         }

//         // 3️⃣ Verify token
//         const decoded = verifyToken(token);

//         // 4️⃣ Attach decoded payload
//         req.user = decoded;

//         // 5️⃣ Proceed
//         next();

//     } catch (error) {

//         // Token errors handled here
//         return res.status(401).json({
//             success: false,
//             message: "Invalid or expired token",
//         });
        
//     }
// };




import jwt from "jsonwebtoken";

export const authMiddleware = (req, res, next) => {
    try {
        const authHeader = req.headers.authorization;

        if (!authHeader || !authHeader.startsWith("Bearer ")) {
            return res.status(401).json({
                success: false,
                message: "Unauthorized"
            });
        }

        const token = authHeader.split(" ")[1];
        const decoded = jwt.verify(token, process.env.JWT_SECRET);

        req.user = decoded;
        next();

    } catch (error) {
        return res.status(401).json({
            success: false,
            message: "Unauthorized"
        });
    }
};
