import { decrypt } from "./crypto.util.js";

// 🔁 Replace this with copied value from pgAdmin
const encryptedValue = "3885122d2df312e7a4202484:b234dec0cdd329e31e805e4f6a:3f27e6d230b96153f9b35b0011c8cbd9";

try {
    const decrypted = decrypt(encryptedValue);
    console.log("✅ Decrypted value:", decrypted);
} catch (err) {
    console.error("❌ Decryption failed:", err.message);
}
