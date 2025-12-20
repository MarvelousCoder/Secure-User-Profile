import { jest } from "@jest/globals";

/* ------------------ MOCK JWT ------------------ */
await jest.unstable_mockModule("jsonwebtoken", () => ({
    default: {
        verify: jest.fn()
    }
}));

/* ------------------ IMPORTS ------------------ */
const jwt = (await import("jsonwebtoken")).default;
const { authMiddleware } = await import("../auth.middleware.js");

/* ------------------ HELPERS ------------------ */
const mockResponse = () => {
    const res = {};
    res.status = jest.fn().mockReturnValue(res);
    res.json = jest.fn();
    return res;
};

describe("Auth Middleware", () => {

    afterEach(() => {
        jest.clearAllMocks();
    });

    it("should allow request if token is valid", () => {

        const req = {
            headers: {
                authorization: "Bearer valid-token"
            }
        };

        const res = mockResponse();
        const next = jest.fn();

        jwt.verify.mockReturnValue({
            userId: "user-123",
            email: "test@mail.com"
        });

        authMiddleware(req, res, next);

        expect(jwt.verify).toHaveBeenCalledWith(
            "valid-token",
            process.env.JWT_SECRET
        );

        expect(req.user).toEqual({
            userId: "user-123",
            email: "test@mail.com"
        });

        expect(next).toHaveBeenCalled();
    });

    it("should return 401 if Authorization header is missing", () => {

        const req = {
            headers: {}
        };

        const res = mockResponse();
        const next = jest.fn();

        authMiddleware(req, res, next);

        expect(res.status).toHaveBeenCalledWith(401);
        expect(res.json).toHaveBeenCalledWith({
            success: false,
            message: "Unauthorized"
        });

        expect(next).not.toHaveBeenCalled();
    });

    it("should return 401 if token is invalid", () => {

        const req = {
            headers: {
                authorization: "Bearer invalid-token"
            }
        };

        const res = mockResponse();
        const next = jest.fn();

        jwt.verify.mockImplementation(() => {
            throw new Error("Invalid token");
        });

        authMiddleware(req, res, next);

        expect(res.status).toHaveBeenCalledWith(401);
        expect(res.json).toHaveBeenCalledWith({
            success: false,
            message: "Unauthorized"
        });

        expect(next).not.toHaveBeenCalled();
    });
});
