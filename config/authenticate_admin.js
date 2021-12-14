const jwt = require('jsonwebtoken');
const { UserSession } = require('../models');
const config = require('./index');

async function authenticateAdminToken(req, res, next) {

    let token = req.headers['authorization'];

    if (!token) return res.status(403).json({ message: 'No token provided', status: 403 });

    jwt.verify(token, config.JWT_SECRET, async (err, decoded) => {
        if (err) {
            return res.status(500).json({ message: err.message })
        }

        if (decoded.data.role === 'admin' || decoded.data.role === 'back office') {

            let base_url = req.originalUrl;
            let endPoint = base_url.split("/")
            endPoint = endPoint[2]
            console.log(endPoint);
            if (endPoint === "admin") {
                let auth_user = await UserSession.findOne({ where: { userId: decoded.data.id } })
                if (!auth_user) {
                    return res.status(500).json({ message: 'please re login session not found.' })
                }
                next();
            } else {
                return res.status(500).json({ message: 'you are not an admin.' })
            }

        }
        else if (decoded.data.role === 'store manager') {
            let base_url = req.originalUrl;
            let endPoint = base_url.split("/")
            endPoint = endPoint[2]
            if (endPoint === "mobile") {
                let auth_user = await UserSession.findOne({ where: { userId: decoded.data.id } })
                if (!auth_user) {
                    return res.status(500).json({ message: 'please re login session not found.' })
                }
                next();
            } else {
                return res.status(500).json({ message: 'you are not a manager.' })
            }
        } else {
            return res.status(500).json({ message: 'unauthorized.' })
        }
    });
}

module.exports = {
    authenticateAdminToken
}