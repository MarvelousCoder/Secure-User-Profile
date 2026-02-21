// export const maskGovernmentId = (id) => {
//     if (!id || id.length < 4) return "****";

//     const visibleDigits = id.slice(-4);
//     const maskedPart = "*".repeat(id.length - 4);

//     return maskedPart + visibleDigits;
// };


/**
 * Masks a sensitive string, showing only the last 4 characters.
 * Useful for Government IDs, Credit Cards, or SSNs.
 */
export const maskGovernmentId = (id) => {
    // 1. Handle null, undefined, or empty strings
    if (!id) return "•••• ••••";

    const idStr = String(id).trim();

    // 2. If the ID is too short, mask the whole thing for safety
    if (idStr.length <= 4) {
        return "••••";
    }

    // 3. Keep the last 4 digits visible
    const visiblePart = idStr.slice(-4);

    // 4. Create a consistent masked prefix
    // Using the bullet character '•' instead of '*' looks more premium in modern UIs
    const maskedPart = "•".repeat(Math.min(idStr.length - 4, 8));

    return `${maskedPart} ${visiblePart}`;
};

/**
 * Optional: A more aggressive mask that only shows the first and last character
 * Use this if you want to be even more restrictive
 */
export const aggressiveMask = (id) => {
    if (!id || id.length < 2) return "••";
    return `${id[0]}${"•".repeat(id.length - 2)}${id[id.length - 1]}`;
};