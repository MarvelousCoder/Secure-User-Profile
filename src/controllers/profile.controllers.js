import prisma from "../config/prisma.js";
import { decrypt } from "../utils/crypto.util.js";

// export const getProfile = async (req, res) => {
//     try {
//         const user = await prisma.user.findUnique({
//             where: { id: req.user.id }
//         });

//         const decryptedId = decrypt(user.encryptedId);

//         res.json({
//             id: user.id,
//             name: user.name,
//             email: user.email,
//             governmentId: decryptedId
//         });

//     } catch (error) {
//         res.status(500).json({ message: "Failed to fetch profile" });
//     }
// };
  

export const getProfile = async (req, res) => {
    try {
        const user = await prisma.user.findUnique({
            where: {
                id: req.user.userId
            }
        });

        if (!user) {
            return res.status(404).json({
                success: false,
                message: "User not found"
            });
        }

        const decryptedGovernmentId = decrypt(user.encryptedId);

        return res.json({
            id: user.id,
            name: user.name,
            email: user.email,
            governmentId: decryptedGovernmentId
        });

    } catch (error) {
        return res.status(500).json({
            success: false,
            message: "Failed to fetch profile"
        });
    }
};
