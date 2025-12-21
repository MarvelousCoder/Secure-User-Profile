// import { Router } from "express";
// import { authMiddleware } from "../middlewares/auth.middleware.js";

// const router = Router();

// /**
//  * TEST PROTECTED ROUTE
//  */
// router.get("/profile", authMiddleware, (req, res) => {
//     res.status(200).json({
//         success: true,
//         message: "Access granted to protected route",
//         user: req.user,
//     });
// });

// export default router;

import { Router } from "express";
import { authMiddleware } from "../middlewares/auth.middleware.js";
import { getProfile } from "../controllers/profile.controllers.js";

const router = Router();

router.get("/profile", authMiddleware, getProfile);

export default router;

