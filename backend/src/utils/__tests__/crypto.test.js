import "dotenv/config";
import { encrypt, decrypt } from "../crypto.util.js";

describe("AES-256-GCM Encryption", () => {
    const plainText = "GOV-ID-TEST-12345";

    test("should encrypt data", () => {
        const encrypted = encrypt(plainText);
        expect(encrypted).not.toBe(plainText);
    });

    test("should decrypt encrypted data correctly", () => {
        const encrypted = encrypt(plainText);
        const decrypted = decrypt(encrypted);
        expect(decrypted).toBe(plainText);
    });

    test("should throw error for corrupted encrypted data", () => {
        const encrypted = encrypt(plainText);
        const corrupted = encrypted.slice(0, -5);

        expect(() => decrypt(corrupted)).toThrow();
    });
});
