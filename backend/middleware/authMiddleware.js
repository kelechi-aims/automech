const jwt = require('jsonwebtoken');

const authMiddleware = (req, res, next) => {
    const token = req.cookies.jwt;

    if (token) {
        jwt.verify(token, 'AutoMech_Locator_Secret', (err, decodedToken) => {
            if (err) {
                console.log(err.message);
                return res.status(401).json({ message: 'Token is not valid'});
            } else {
                console.log(decodedToken);
                next();
            }
        });
    } else {
        return res.status(401).json({ message: 'No token, authorization denied' });
    }

}

module.exports = authMiddleware;