const jsonwebtoken = require("jsonwebtoken");

/**
 * @param {Request} req 
 * @param {Response} res
 * @returns 
 */
const authMiddleware = (req, res, next) => {

    if (req.method === 'OPTIONS') {
        return next();
    }

    try {
        
        const token = req.headers.authorization &&
            req.headers.authorization.split(' ')[1];

        if (!token) {
            return res.status(403).json({
                messageStatus: 'NOT_AUTH',
            });
        }

        const debounced = jsonwebtoken.verify(token, process.env.SECRET_CODE);

        req.user = debounced;

        next();
    } catch (error) {
        next(error);
    }
};

module.exports = authMiddleware;