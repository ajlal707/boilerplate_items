var express = require('express');
const bcrypt = require('bcryptjs');
const saltRounds = 10;
const { revokeUserSession, createUserSession } = require('../../../services/admin_login_service');
var router = express.Router();
let { User, Employes } = require('../../../models');
const { AdminItemLedgerService } = require('../../../services');


/* GET home page. */
router.post('/login', async function (req, res, next) {

  let { email, password } = req.body;

  let employe = await Employes.findOne({
    where: {
      email: email
    }
  });

  if (!employe) return res.status(400).json({ message: 'invalid email.' })

  let match = await bcrypt.compare(password, employe.password)

  if (match) {
    try {
      await revokeUserSession(employe);
      let token = await createUserSession(employe);
      return res.status(200).send({ message: 'admin login successfully.', employe: employe, token })
    }
    catch (e) {
      return res.status(200).send({ message: e.message })
    }
  }
  else {
    return res.status(400).json({ message: 'invalid credentials' })
  }


});

router.post('/signup', async function (req, res, next) {

  let { email, password, firstName, lastName } = req.body;

  let employe = await Employes.findOne({
    where: {
      email: email
    }
  });

  if (employe) return res.status(400).json({ message: 'email already exist.' })

  let encrpt_password = await encryptPassword(password)

  let new_user = await Employes.create({
    email: email,
    password: encrpt_password,
    role: "admin",
    firstName: firstName,
    lastName: lastName,
    contactNo: "0000-0000000",
    pin: "0000"
  })
  return res.status(200).json({ message: 'success.', employe: new_user })
});


async function encryptPassword(password) {
  const salt = bcrypt.genSaltSync(saltRounds);
  return bcrypt.hashSync(password, salt);
}



module.exports = router;