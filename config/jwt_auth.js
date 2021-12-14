const jwt = require('jsonwebtoken');
const config = require('../config/index');

function validateToken(token) {
    return new Promise((resolve, reject) => {
        jwt.verify(token, config.JWT_SECRET, (err, decoded) => {
            if (err) {
                if (err.name == 'TokenExpiredError') {
                    reject({code: messages.forbidden, message: 'The incoming token has expired.'})
                }
                reject({code: messages.forbidden, message: 'The incoming token is invalid.'})
            }
            return resolve(decoded.data);
        });
    });
}