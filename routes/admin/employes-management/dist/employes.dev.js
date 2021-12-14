"use strict";

var express = require('express');

var _require = require('../../../services'),
    AdminEmployesService = _require.AdminEmployesService,
    AdminStoresService = _require.AdminStoresService;

var router = express.Router();

var _require2 = require('../../../validations/employes'),
    validateEmployeCreateInputes = _require2.validateEmployeCreateInputes,
    validateEmployeUpdateInputes = _require2.validateEmployeUpdateInputes;

var _require3 = require('../../../config/authenticate_admin'),
    authenticateAdminToken = _require3.authenticateAdminToken;

var _require4 = require('../../../models'),
    Sequelize = _require4.Sequelize,
    Employes = _require4.Employes;

var Op = Sequelize.Op;

var bcrypt = require('bcryptjs');

router.post('/create-employe', authenticateAdminToken, function _callee(req, res, next) {
  var _req$body, firstName, lastName, email, password, contactNo, role, store_id, pin, _validateEmployeCreat, errors, isValid, employeEmail, employePin, employe_contact, store, employeObject;

  return regeneratorRuntime.async(function _callee$(_context) {
    while (1) {
      switch (_context.prev = _context.next) {
        case 0:
          _req$body = req.body, firstName = _req$body.firstName, lastName = _req$body.lastName, email = _req$body.email, password = _req$body.password, contactNo = _req$body.contactNo, role = _req$body.role, store_id = _req$body.store_id, pin = _req$body.pin;
          _validateEmployeCreat = validateEmployeCreateInputes(req.body), errors = _validateEmployeCreat.errors, isValid = _validateEmployeCreat.isValid;

          if (isValid) {
            _context.next = 4;
            break;
          }

          return _context.abrupt("return", res.status(500).json({
            errors: errors
          }));

        case 4:
          _context.next = 6;
          return regeneratorRuntime.awrap(AdminEmployesService.getEmployeByEmail(email));

        case 6:
          employeEmail = _context.sent;

          if (!employeEmail) {
            _context.next = 9;
            break;
          }

          return _context.abrupt("return", res.status(400).json({
            message: 'employe already exist with given email.'
          }));

        case 9:
          _context.next = 11;
          return regeneratorRuntime.awrap(AdminEmployesService.getEmployeByPin(pin));

        case 11:
          employePin = _context.sent;

          if (!employePin) {
            _context.next = 14;
            break;
          }

          return _context.abrupt("return", res.status(400).json({
            message: 'employe already exist with given pin code.'
          }));

        case 14:
          _context.next = 16;
          return regeneratorRuntime.awrap(AdminEmployesService.getEmployeByContact(contactNo));

        case 16:
          employe_contact = _context.sent;

          if (!employe_contact) {
            _context.next = 19;
            break;
          }

          return _context.abrupt("return", res.status(400).json({
            message: 'employe already exist with given contact.'
          }));

        case 19:
          if (!store_id) {
            _context.next = 25;
            break;
          }

          _context.next = 22;
          return regeneratorRuntime.awrap(AdminStoresService.getStoreById(store_id));

        case 22:
          store = _context.sent;

          if (store) {
            _context.next = 25;
            break;
          }

          return _context.abrupt("return", res.status(400).json({
            message: 'store not found with given id.'
          }));

        case 25:
          _context.next = 27;
          return regeneratorRuntime.awrap(AdminEmployesService.createEmploye(firstName, lastName, email, password, contactNo, role, store_id, pin, res));

        case 27:
          employeObject = _context.sent;
          return _context.abrupt("return", res.status(200).json({
            message: 'employe created successfully.',
            employe: employeObject
          }));

        case 29:
        case "end":
          return _context.stop();
      }
    }
  });
});
router.post('/update-employe', authenticateAdminToken, function _callee2(req, res, next) {
  var employe, store, _validateEmployeUpdat, errors, isValid, employeUpdated;

  return regeneratorRuntime.async(function _callee2$(_context2) {
    while (1) {
      switch (_context2.prev = _context2.next) {
        case 0:
          _context2.next = 2;
          return regeneratorRuntime.awrap(AdminEmployesService.getEmployeById(req.body.employe_id));

        case 2:
          employe = _context2.sent;

          if (employe) {
            _context2.next = 5;
            break;
          }

          return _context2.abrupt("return", res.status(400).json({
            message: 'employe not exist with given id.'
          }));

        case 5:
          if (!req.body.store_id) {
            _context2.next = 11;
            break;
          }

          _context2.next = 8;
          return regeneratorRuntime.awrap(AdminStoresService.getStoreById(req.body.store_id));

        case 8:
          store = _context2.sent;

          if (store) {
            _context2.next = 11;
            break;
          }

          return _context2.abrupt("return", res.status(400).json({
            message: 'employe not found with given id.'
          }));

        case 11:
          _validateEmployeUpdat = validateEmployeUpdateInputes(req.body), errors = _validateEmployeUpdat.errors, isValid = _validateEmployeUpdat.isValid;

          if (isValid) {
            _context2.next = 14;
            break;
          }

          return _context2.abrupt("return", res.status(500).json({
            errors: errors
          }));

        case 14:
          _context2.next = 16;
          return regeneratorRuntime.awrap(AdminEmployesService.updateEmploye(req.body, res));

        case 16:
          _context2.next = 18;
          return regeneratorRuntime.awrap(AdminEmployesService.getEmployeById(req.body.employe_id));

        case 18:
          employeUpdated = _context2.sent;
          return _context2.abrupt("return", res.status(200).json({
            message: 'employe updated successfully.',
            employe: employeUpdated
          }));

        case 20:
        case "end":
          return _context2.stop();
      }
    }
  });
});
router.post('/update-employe-pin', authenticateAdminToken, function _callee3(req, res, next) {
  var _req$body2, employe_id, pin, employe, employePin, employeUpdated;

  return regeneratorRuntime.async(function _callee3$(_context3) {
    while (1) {
      switch (_context3.prev = _context3.next) {
        case 0:
          _req$body2 = req.body, employe_id = _req$body2.employe_id, pin = _req$body2.pin;
          _context3.next = 3;
          return regeneratorRuntime.awrap(AdminEmployesService.getEmployeById(employe_id));

        case 3:
          employe = _context3.sent;

          if (employe) {
            _context3.next = 6;
            break;
          }

          return _context3.abrupt("return", res.status(400).json({
            message: 'employe not exist with given id.'
          }));

        case 6:
          _context3.next = 8;
          return regeneratorRuntime.awrap(AdminEmployesService.getEmployeByPin(pin));

        case 8:
          employePin = _context3.sent;

          if (!employePin) {
            _context3.next = 11;
            break;
          }

          return _context3.abrupt("return", res.status(400).json({
            message: 'employe already exist with given pin code.'
          }));

        case 11:
          _context3.next = 13;
          return regeneratorRuntime.awrap(AdminEmployesService.updateEmployePin(employe_id, pin, res));

        case 13:
          _context3.next = 15;
          return regeneratorRuntime.awrap(AdminEmployesService.getEmployeById(employe_id));

        case 15:
          employeUpdated = _context3.sent;
          return _context3.abrupt("return", res.status(200).json({
            message: 'employe updated successfully.',
            employe: employeUpdated
          }));

        case 17:
        case "end":
          return _context3.stop();
      }
    }
  });
});
router.post('/update-employe-password', authenticateAdminToken, function _callee4(req, res, next) {
  var _req$body3, id, password, employe, salt, encrpt_password, employeUpdated;

  return regeneratorRuntime.async(function _callee4$(_context4) {
    while (1) {
      switch (_context4.prev = _context4.next) {
        case 0:
          _req$body3 = req.body, id = _req$body3.id, password = _req$body3.password;
          _context4.next = 3;
          return regeneratorRuntime.awrap(AdminEmployesService.getEmployeById(id));

        case 3:
          employe = _context4.sent;

          if (employe) {
            _context4.next = 6;
            break;
          }

          return _context4.abrupt("return", res.status(400).json({
            message: 'employe not exist with given id.'
          }));

        case 6:
          if (password) {
            _context4.next = 8;
            break;
          }

          return _context4.abrupt("return", res.status(400).json({
            message: 'password must not be empty.'
          }));

        case 8:
          salt = bcrypt.genSaltSync(saltRounds);
          encrpt_password = bcrypt.hashSync(password, salt);
          _context4.next = 12;
          return regeneratorRuntime.awrap(Employes.update({
            password: encrpt_password
          }, {
            where: {
              id: id
            }
          }));

        case 12:
          _context4.next = 14;
          return regeneratorRuntime.awrap(AdminEmployesService.getEmployeById(id));

        case 14:
          employeUpdated = _context4.sent;
          return _context4.abrupt("return", res.status(200).json({
            message: 'password updated successfully.',
            employe: employeUpdated
          }));

        case 16:
        case "end":
          return _context4.stop();
      }
    }
  });
});
router.get('/get-by-id-employe/:id', authenticateAdminToken, function _callee5(req, res, next) {
  var employe;
  return regeneratorRuntime.async(function _callee5$(_context5) {
    while (1) {
      switch (_context5.prev = _context5.next) {
        case 0:
          _context5.next = 2;
          return regeneratorRuntime.awrap(AdminEmployesService.getEmployeById(req.params.id));

        case 2:
          employe = _context5.sent;

          if (employe) {
            _context5.next = 5;
            break;
          }

          return _context5.abrupt("return", res.status(400).json({
            message: 'employe not exist with given id.'
          }));

        case 5:
          return _context5.abrupt("return", res.status(200).json({
            message: 'success.',
            employe: employe
          }));

        case 6:
        case "end":
          return _context5.stop();
      }
    }
  });
});
router.get('/get-employes-list', authenticateAdminToken, function _callee6(req, res, next) {
  var employes;
  return regeneratorRuntime.async(function _callee6$(_context6) {
    while (1) {
      switch (_context6.prev = _context6.next) {
        case 0:
          _context6.next = 2;
          return regeneratorRuntime.awrap(AdminEmployesService.getList(req, res));

        case 2:
          employes = _context6.sent;

          if (!(employes.count == 0)) {
            _context6.next = 5;
            break;
          }

          return _context6.abrupt("return", res.status(400).json({
            message: 'employes not exist.'
          }));

        case 5:
          return _context6.abrupt("return", res.status(200).json({
            message: 'success.',
            employes: employes
          }));

        case 6:
        case "end":
          return _context6.stop();
      }
    }
  });
});
module.exports = router;