import jwt from "jsonwebtoken";

export const verifyToken = (req, res, next) => {
    const header = req.get("Authorization");

    if (!header) {
        return res.status(401).json({ message: "Token Missing" });
    }

    const token = header.split(" ")[1];

    jwt.verify(token, "secret123", (err, payload) => {
        if (err) {
            return res.status(401).json({ message: "Invalid Token" });
        }

        // store user info for next controllers
        req.user = payload;

        next();
    });
};