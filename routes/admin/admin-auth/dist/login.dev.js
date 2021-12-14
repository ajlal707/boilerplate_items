"use strict";

var express = require('express');

var bcrypt = require('bcryptjs');

var saltRounds = 10;

var _require = require('../../../services/admin_login_service'),
    revokeUserSession = _require.revokeUserSession,
    createUserSession = _require.createUserSession;

var router = express.Router();

var _require2 = require('../../../models'),
    User = _require2.User,
    Employes = _require2.Employes;

var _require3 = require('../../../services'),
    AdminItemLedgerService = _require3.AdminItemLedgerService;
/* GET home page. */


router.post('/login', function _callee(req, res, next) {
  var _req$body, email, password, employe, match, token;

  return regeneratorRuntime.async(function _callee$(_context) {
    while (1) {
      switch (_context.prev = _context.next) {
        case 0:
          _req$body = req.body, email = _req$body.email, password = _req$body.password;
          _context.next = 3;
          return regeneratorRuntime.awrap(Employes.findOne({
            where: {
              email: email
            }
          }));

        case 3:
          employe = _context.sent;

          if (employe) {
            _context.next = 6;
            break;
          }

          return _context.abrupt("return", res.status(400).json({
            message: 'invalid email.'
          }));

        case 6:
          _context.next = 8;
          return regeneratorRuntime.awrap(bcrypt.compare(password, employe.password));

        case 8:
          match = _context.sent;

          if (!match) {
            _context.next = 24;
            break;
          }

          _context.prev = 10;
          _context.next = 13;
          return regeneratorRuntime.awrap(revokeUserSession(employe));

        case 13:
          _context.next = 15;
          return regeneratorRuntime.awrap(createUserSession(employe));

        case 15:
          token = _context.sent;
          return _context.abrupt("return", res.status(200).send({
            message: 'admin login successfully.',
            employe: employe,
            token: token
          }));

        case 19:
          _context.prev = 19;
          _context.t0 = _context["catch"](10);
          return _context.abrupt("return", res.status(200).send({
            message: _context.t0.message
          }));

        case 22:
          _context.next = 25;
          break;

        case 24:
          return _context.abrupt("return", res.status(400).json({
            message: 'invalid credentials'
          }));

        case 25:
        case "end":
          return _context.stop();
      }
    }
  }, null, null, [[10, 19]]);
});
router.post('/signup', function _callee2(req, res, next) {
  var _req$body2, email, password, firstName, lastName, employe, encrpt_password, new_user;

  return regeneratorRuntime.async(function _callee2$(_context2) {
    while (1) {
      switch (_context2.prev = _context2.next) {
        case 0:
          _req$body2 = req.body, email = _req$body2.email, password = _req$body2.password, firstName = _req$body2.firstName, lastName = _req$body2.lastName;
          _context2.next = 3;
          return regeneratorRuntime.awrap(Employes.findOne({
            where: {
              email: email
            }
          }));

        case 3:
          employe = _context2.sent;

          if (!employe) {
            _context2.next = 6;
            break;
          }

          return _context2.abrupt("return", res.status(400).json({
            message: 'email already exist.'
          }));

        case 6:
          _context2.next = 8;
          return regeneratorRuntime.awrap(encryptPassword(password));

        case 8:
          encrpt_password = _context2.sent;
          _context2.next = 11;
          return regeneratorRuntime.awrap(Employes.create({
            email: email,
            password: encrpt_password,
            role: "admin",
            firstName: firstName,
            lastName: lastName,
            contactNo: "0000-0000000",
            pin: "0000"
          }));

        case 11:
          new_user = _context2.sent;
          return _context2.abrupt("return", res.status(200).json({
            message: 'success.',
            employe: new_user
          }));

        case 13:
        case "end":
          return _context2.stop();
      }
    }
  });
});

function encryptPassword(password) {
  var salt;
  return regeneratorRuntime.async(function encryptPassword$(_context3) {
    while (1) {
      switch (_context3.prev = _context3.next) {
        case 0:
          salt = bcrypt.genSaltSync(saltRounds);
          return _context3.abrupt("return", bcrypt.hashSync(password, salt));

        case 2:
        case "end":
          return _context3.stop();
      }
    }
  });
}

module.exports = router;