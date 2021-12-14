var express = require('express');
const { AdminEmployesService, AdminStoresService } = require('../../../services');
var router = express.Router();
let { validateEmployeCreateInputes, validateEmployeUpdateInputes } = require('../../../validations/employes');
let { authenticateAdminToken } = require('../../../config/authenticate_admin');
let { Sequelize, Employes } = require('../../../models')
const Op = Sequelize.Op;
const bcrypt = require('bcryptjs');


router.post('/create-employe', authenticateAdminToken, async function (req, res, next) {

    let { firstName, lastName, email, password, contactNo, role, store_id, pin } = req.body;

    let { errors, isValid } = validateEmployeCreateInputes(req.body);
    if (!isValid) { return res.status(500).json({ errors }) }

    let employeEmail = await AdminEmployesService.getEmployeByEmail(email);
    if (employeEmail) {
        return res.status(400).json({ message: 'employe already exist with given email.' })
    }
    let employePin = await AdminEmployesService.getEmployeByPin(pin);
    if (employePin) {
        return res.status(400).json({ message: 'employe already exist with given pin code.' })
    }
    let employe_contact = await AdminEmployesService.getEmployeByContact(contactNo);
    if (employe_contact) {
        return res.status(400).json({ message: 'employe already exist with given contact.' })
    }

    if (store_id) {
        let store = await AdminStoresService.getStoreById(store_id);
        if (!store) {
            return res.status(400).json({ message: 'store not found with given id.' })
        }
    }

    let employeObject = await AdminEmployesService.createEmploye(firstName, lastName, email, password, contactNo, role, store_id, pin, res);

    return res.status(200).json({ message: 'employe created successfully.', employe: employeObject })
});

router.post('/update-employe', authenticateAdminToken, async function (req, res, next) {

    let employe = await AdminEmployesService.getEmployeById(req.body.employe_id);

    if (!employe) return res.status(400).json({ message: 'employe not exist with given id.' })

    if (req.body.store_id) {
        let store = await AdminStoresService.getStoreById(req.body.store_id);
        if (!store) {
            return res.status(400).json({ message: 'employe not found with given id.' })
        }
    }

    let { errors, isValid } = validateEmployeUpdateInputes(req.body);
    if (!isValid) { return res.status(500).json({ errors }) }

    await AdminEmployesService.updateEmploye(req.body, res);

    let employeUpdated = await AdminEmployesService.getEmployeById(req.body.employe_id);

    return res.status(200).json({ message: 'employe updated successfully.', employe: employeUpdated })
});

router.post('/update-employe-pin', authenticateAdminToken, async function (req, res, next) {

    let { employe_id, pin } = req.body
    let employe = await AdminEmployesService.getEmployeById(employe_id);

    if (!employe) return res.status(400).json({ message: 'employe not exist with given id.' })

    let employePin = await AdminEmployesService.getEmployeByPin(pin);
    if (employePin) {
        return res.status(400).json({ message: 'employe already exist with given pin code.' })
    }

    await AdminEmployesService.updateEmployePin(employe_id, pin, res);

    let employeUpdated = await AdminEmployesService.getEmployeById(employe_id);

    return res.status(200).json({ message: 'employe updated successfully.', employe: employeUpdated })
});

router.post('/update-employe-password', authenticateAdminToken, async function (req, res, next) {

    let { id, password } = req.body
    let employe = await AdminEmployesService.getEmployeById(id);

    if (!employe) return res.status(400).json({ message: 'employe not exist with given id.' })

    if (!password) return res.status(400).json({ message: 'password must not be empty.' })

    const salt = bcrypt.genSaltSync(saltRounds);
    let encrpt_password = bcrypt.hashSync(password, salt);

    await Employes.update({
        password: encrpt_password
    }, { where: { id: id } })

    let employeUpdated = await AdminEmployesService.getEmployeById(id);

    return res.status(200).json({ message: 'password updated successfully.', employe: employeUpdated })
});

router.get('/get-by-id-employe/:id', authenticateAdminToken, async function (req, res, next) {

    let employe = await AdminEmployesService.getEmployeById(req.params.id);

    if (!employe) return res.status(400).json({ message: 'employe not exist with given id.' })

    return res.status(200).json({ message: 'success.', employe: employe })
});

router.get('/get-employes-list', authenticateAdminToken, async function (req, res, next) {

    let employes = await AdminEmployesService.getList(req, res)

    if (employes.count == 0) return res.status(400).json({ message: 'employes not exist.' })

    return res.status(200).json({ message: 'success.', employes: employes })
});


module.exports = router;