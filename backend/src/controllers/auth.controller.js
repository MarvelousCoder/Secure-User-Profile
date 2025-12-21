import bcrypt from "bcrypt";
import prisma from "../config/prisma.js";
import { encrypt } from "../utils/crypto.util.js";
import { generateToken } from "../utils/jwt.util.js";

export const register = async (req, res) => {
    try {
        const { name, email, password, governmentId } = req.body;

        //  Basic validation
        if (!name || !email || !password || !governmentId) {
            return res.status(400).json({
                success: false,
                message: "All fields are required",
            });
        }

        //  Normalize email
        const normalizedEmail = email.toLowerCase();

        //  Check for existing user
        const existingUser = await prisma.user.findUnique({
            where: { email: normalizedEmail },
        });

        if (existingUser) {
            return res.status(409).json({
                success: false,
                message: "User already exists with this email",
            });
        }

        //  Hash password
        const hashedPassword = await bcrypt.hash(password, 10);

        //  Encrypt sensitive ID
        const encryptedId = encrypt(governmentId);

        //  Create user
        await prisma.user.create({
            data: {
                name,
                email: normalizedEmail,
                password: hashedPassword,
                encryptedId,
            },
        });

        //  Success response
        return res.status(201).json({
            success: true,
            message: "User registered successfully",
        });

    } catch (error) {
        console.error("Register error:", error.message);

        return res.status(500).json({
            success: false,
            message: "Registration failed",
        });
    }
};

export const login = async(req,res)=>{
    try{
        const {email,password}= req.body;
        // Validaton
        if (!email || !password){
            return res.status(400).json({
                success: false,
                message: "Email and password are required.",
            });
        }
        // normalize email
        const normalizedEmail = email.toLowerCase();

        // find user
        const user = await prisma.user.findUnique({
            where: {email: normalizedEmail},
        });

        // invalid credentials
        if (!user){
            return res.status(401).json({
                success: false,
                message: "Invalid Email or password",
            });
        }

        //verify password
        const isPasswordValid = await bcrypt.compare(
            password,
            user.password
        );

        if (!isPasswordValid) {
            return res.status(401).json({
                success: false,
                message: "Invalid email or password",
            });
        }

        // NOTE: Generate JWT
        const token = generateToken({userId: user.id})

        //success response
        return res.status(200).json({
            success: true,
            token,
        });
    }
    catch (error){
        console.error("Login error:", error.message);

        return res.status(500).json({
            success: false,
            message: "Login failed",
        });
    }
}
