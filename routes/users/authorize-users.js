var express = require('express');
var router = express.Router();
const { UsersAuthorizationService } = require('../../services');
let { Sequelize, Employes, Stores } = require('../../models')
const Op = Sequelize.Op;
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken'); // used to create, sign, and verify tokens
const { JWT_SECRET } = require('../../config/index');

/* GET users listing. */
router.get('/authorize', async function (req, res, next) {
    const token = req.headers.authorization;
    if (!token) return res.status(400).json({ message: "token must not be empty." });

    // verifies secret and checks exp
    jwt.verify(token, JWT_SECRET, { ignoreExpiration: true }, async (err, decoded) => {
        if (err) return res.status(400).json({ message: "invalid token." });
        // if everything is good, save to request for use in other routes

        let user = await Employes.findOne({
            attributes: ['firstName', 'lastName', 'email', 'contactNo', 'role', 'store_id'],
            where: {
                id: decoded.data.id
            },
            include: [
                {
                    attributes: ['name', 'city', 'post_code', 'address', 'country'],
                    model: Stores,
                    as: 'stores'
                }
            ]
        })

        return res.status(200).json({ message: "success", user: user });
    });
});

module.exports = router;
