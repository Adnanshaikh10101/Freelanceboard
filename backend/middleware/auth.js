const jwt = require("jsonwebtoken");

module.exports = function (req, res, next) {
    let token = req.header("Authorization");

    if (!token) {
        return res.status(401).json({ message: "Access Denied" });
    }

    try {
        // ✅ REMOVE "Bearer "
        if (token.startsWith("Bearer ")) {
            token = token.split(" ")[1];
        }

        const verified = jwt.verify(token, process.env.JWT);

        req.client = verified;
        next();

    } catch (err) {
        console.log("AUTH ERROR:", err.message);
        res.status(401).json({ error: "invalid token" });
    }
};