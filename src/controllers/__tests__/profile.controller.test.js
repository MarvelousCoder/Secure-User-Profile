import { jest } from "@jest/globals";

/* ------------------ MOCKS ------------------ */
await jest.unstable_mockModule("../../config/prisma.js", () => ({
    default: {
        user: {
            findUnique: jest.fn()
        }
    }
}));

await jest.unstable_mockModule("../../utils/crypto.util.js", () => ({
    decrypt: jest.fn()
}));

/* ------------------ IMPORTS ------------------ */
const prisma = (await import("../../config/prisma.js")).default;
const { decrypt } = await import("../../utils/crypto.util.js");
const { getProfile } = await import("../profile.controllers.js");

/* ------------------ HELPERS ------------------ */
const mockResponse = () => {
    const res = {};
    res.status = jest.fn().mockReturnValue(res);
    res.json = jest.fn();
    return res;
};

describe("getProfile Controller", () => {

    afterEach(() => {
        jest.clearAllMocks();
    });

    it("should return decrypted user profile", async () => {

        const req = {
            user: { userId: "user-123" }
        };

        const res = mockResponse();

        prisma.user.findUnique.mockResolvedValue({
            id: "user-123",
            name: "Test User",
            email: "test@mail.com",
            encryptedId: "encrypted-gov-id"
        });

        decrypt.mockReturnValue("GOV-ID-123");

        await getProfile(req, res);

        expect(prisma.user.findUnique).toHaveBeenCalledWith({
            where: { id: "user-123" }
        });

        expect(decrypt).toHaveBeenCalledWith("encrypted-gov-id");

        expect(res.json).toHaveBeenCalledWith({
            id: "user-123",
            name: "Test User",
            email: "test@mail.com",
            governmentId: "GOV-ID-123"
        });
    });

    it("should return 500 if DB throws error", async () => {

        const req = {
            user: { userId: "user-123" }
        };

        const res = mockResponse();

        prisma.user.findUnique.mockRejectedValue(
            new Error("DB failure")
        );

        await getProfile(req, res);

        expect(res.status).toHaveBeenCalledWith(500);
        expect(res.json).toHaveBeenCalledWith({
            success: false,
            message: "Failed to fetch profile"
        });
    });
});
