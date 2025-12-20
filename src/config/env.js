if (!process.env.JWT_SECRET) {
    throw new Error("JWT_SECRET is missing");
}
  