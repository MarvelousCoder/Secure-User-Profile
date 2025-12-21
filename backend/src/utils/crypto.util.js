import "dotenv/config";
import crypto from "crypto";

const ALGORITHM = "aes-256-gcm";
const IV_LENGTH = 12;
const AUTH_TAG_LENGTH = 16;

const key = Buffer.from(process.env.AES_SECRET_KEY, "hex");

function isValidHex(str) {
    return /^[0-9a-fA-F]+$/.test(str);
}

export function encrypt(text) {
    if (!text) return null;

    const iv = crypto.randomBytes(IV_LENGTH);
    const cipher = crypto.createCipheriv(ALGORITHM, key, iv);

    const encrypted = Buffer.concat([
        cipher.update(text, "utf8"),
        cipher.final()
    ]);

    const authTag = cipher.getAuthTag();

    return `${iv.toString("hex")}:${encrypted.toString("hex")}:${authTag.toString("hex")}`;
}

export function decrypt(encryptedText) {
    if (!encryptedText) {
        throw new Error("No encrypted data provided");
    }

    const parts = encryptedText.split(":");
    if (parts.length !== 3) {
        throw new Error("Invalid encrypted payload structure");
    }

    const [ivHex, encryptedHex, authTagHex] = parts;

    if (
        !isValidHex(ivHex) ||
        !isValidHex(encryptedHex) ||
        !isValidHex(authTagHex)
    ) {
        throw new Error("Encrypted payload contains invalid hex");
    }

    const iv = Buffer.from(ivHex, "hex");
    const authTag = Buffer.from(authTagHex, "hex");

    if (iv.length !== IV_LENGTH) {
        throw new Error("Invalid IV length");
    }

    if (authTag.length !== AUTH_TAG_LENGTH) {
        throw new Error("Invalid auth tag length");
    }

    try {
        const decipher = crypto.createDecipheriv(ALGORITHM, key, iv);
        decipher.setAuthTag(authTag);

        const decrypted = Buffer.concat([
            decipher.update(Buffer.from(encryptedHex, "hex")),
            decipher.final()
        ]);

        return decrypted.toString("utf8");

    } catch {
        // Guaranteed failure for tampering
        throw new Error("Decryption failed: authentication error");
    }
}
