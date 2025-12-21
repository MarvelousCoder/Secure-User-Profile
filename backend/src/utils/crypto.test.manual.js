import { encrypt, decrypt } from "./crypto.util.js";

const originalId = "TEST-GOV-ID-12345";

const encrypted = encrypt(originalId);
const decrypted = decrypt(encrypted);

console.log("Original :", originalId);
console.log("Encrypted:", encrypted);
console.log("Decrypted:", decrypted);
