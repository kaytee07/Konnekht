import jwt from "jsonwebtoken";

export const verifyToken = (req, res, next) => {
    try {
        const token = req.cookies.jwt;
        if (!token) return res.status(400).json({ msg: "Access Denied" });

        const verified = jwt.verify(token, process.env.JWT_SECRET);
        req.user = verified;
        next()

    } catch (err) {
        res.status(500).json({ msg: err });
    }
}