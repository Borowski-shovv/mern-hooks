const jwt = require("jsonwebtoken");

// nie musze sprawdzać czy istnieje user, bo skoro jest token tzn ze user jest zalogowany
const auth = (req, res, next) => {
    try {
        const token = req.header("x-auth-token");

        if(!token) {
            // 401 - odmowa dostepu
            return res.status(401).json({msg: "No authentication token, authorization denied."})
        }

        // weryfikacja tokenu, zeby sprawdzić czy id zalogowanego uzytkownika się zgadza
        const verifiedToken = jwt.verify(token, process.env.JWT_SECRET)

        if(!verifiedToken) {
            return res.status(401).json({msg: "Token verification failed, authorization denied."})
        }

        // console.log(verifiedToken.id)
        req.user = verifiedToken.id;
        next();

    } catch(err) {
        res.status(500).json({ error: err.message});
    }
}

module.exports = auth;