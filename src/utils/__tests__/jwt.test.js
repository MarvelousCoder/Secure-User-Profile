import "dotenv/config";
import { generateToken, verifyToken } from "../jwt.util.js";

describe("JWT Utility", () => {
    const payload = { userId: "test-user-id" };

    test("should generate and verify a valid token", () => {
        const token = generateToken(payload);
        const decoded = verifyToken(token);
        expect(decoded.userId).toBe(payload.userId);
    });

    test("should fail for invalid token", () => {
        expect(() => verifyToken("invalid.token.value")).toThrow();
    });

    test("should fail for expired token", () => {
        const shortToken = generateToken(payload, "1s");

        setTimeout(() => {
            expect(() => verifyToken(shortToken)).toThrow();
        }, 1500);
    });
});
