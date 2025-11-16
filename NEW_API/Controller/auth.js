const jwt = require("jsonwebtoken");
const JWT_SECRET = "ChaveXpto*123@";

module.exports = function auth(req, res, next) {
    const token = req.headers.authorization?.split(" ")[1];

    if (!token) {
        return res.status(401).json({ error: "Token não enviado" });
    }

    try {
        const decoded = jwt.verify(token, JWT_SECRET);
        req.user = decoded;
        next();
    } catch (err) {
        return res.status(403).json({ error: "Token inválido ou expirado" });
    }
};
