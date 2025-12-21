export const maskGovernmentId = (id) => {
    if (!id || id.length < 4) return "****";

    const visibleDigits = id.slice(-4);
    const maskedPart = "*".repeat(id.length - 4);

    return maskedPart + visibleDigits;
};
