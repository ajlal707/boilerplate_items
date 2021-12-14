let { Sequelize, Stores, Employes } = require('../models')
const Op = Sequelize.Op;
const bcrypt = require('bcryptjs');
const saltRounds = 10;

async function genrateEmpoyePin() {
    let pin = Math.floor(1000 + Math.random() * 9000);
    return pin;
}

async function getEmployeByPin(pin) {
    let employe = await Employes.findOne({
        where: {
            pin: pin
        }
    });
    return employe;
}
async function getEmployeByContact(contactNo) {
    let employe = await Employes.findOne({
        where: {
            contactNo: contactNo
        }
    });
    return employe;
}
async function createEmploye(firstName, lastName, email, password, contactNo, role, store_id, pin, res) {

    const salt = bcrypt.genSaltSync(saltRounds);
    let encrpt_password = bcrypt.hashSync(password, salt);

    try {
        let employeObject = await Employes.create({
            firstName: firstName,
            lastName: lastName,
            email: email,
            contactNo: contactNo,
            role: role,
            store_id: store_id,
            pin: pin,
            role: role,
            password: encrpt_password
        });

        return employeObject;
    } catch (e) {
        return res.status(400).json({ message: e.message })
    }

}

async function getEmployeByEmail(email) {
    let employe = await Employes.findOne({
        where: {
            email: email
        }
    });
    return employe;
}

async function getEmployeByEmailInUpdate(email, id) {
    console.log(id);
    let employe = await Employes.findOne({
        where: {
            [Op.and]: [{
                email: email
            },
            {
                id: { [Op.ne]: id }
            }
            ]
        }
    });
    return employe;
}
async function getEmployeById(id) {
    let employe = await Employes.findOne({
        where: {
            id: id
        },
        include: [
            {
                model: Stores,
                as: 'stores'
            }
        ]
    });
    return employe;
}



async function updateEmploye(body, res) {

    const employe = {};
    let encrpt_password = ""; 
    if (body.password) {
        const salt = bcrypt.genSaltSync(saltRounds);
        encrpt_password = bcrypt.hashSync(body.password, salt);
        employe['password'] = encrpt_password;
    }
    if (body.firstName) {
        employe['firstName'] = body.firstName;
    }
    if (body.lastName) {
        employe['lastName'] = body.lastName;
    }
    if (body.email) {
        employe['email'] = body.email;
    }
    if (body.contactNo) {
        employe['contactNo'] = body.contactNo;
    }
    if (body.role) {
        employe['role'] = body.role;
    }
    if (body.pin) {
        employe['pin'] = body.pin;
    }
    if (body.store_id) {
        employe['store_id'] = body.store_id;
    }
    if (Object.keys(employe).length > 0) {
        return await Employes.update({ ...employe }, { where: { id: body.employe_id } })

    } else {
        return res.status(400).json({ message: "provide at least one attribute." });
    }

}

async function getStoreById(id) {
    let store = await Stores.findOne({
        where: {
            id: id
        }
    });
    return store;
}
async function getList(req, res) {
    try {
        let { limit, page, search } = req.query;
        limit = parseInt(limit);
        let offset = parseInt(page - 1);
        offset = (offset * limit);

        // let whereCondition = { role: { [Op.ne]: 'admin' }, };
        // if (search) {
        //     search = parseInt(search)
        //     whereCondition = { ...whereCondition, pin: search };
        // }
        if (search) {
            // search = parseInt(search)
            // whereCondition = { ...whereCondition, pin: search };
            search = '%' + search + '%'
            let employes = await Employes.findAndCountAll({
                where: {
                    [Op.or]: [
                        {
                            firstName: {
                                [Op.like]: search
                            }
                        },
                        {
                            lastName: {
                                [Op.like]: search
                            }
                        },
                        {
                            email: {
                                [Op.like]: search
                            }
                        },
                        {
                            contactNo: {
                                [Op.like]: search
                            }
                        },
                        {
                            role: {
                                [Op.like]: search
                            }
                        }
                    ]
                },
                include: [
                    {
                        model: Stores,
                        as: 'stores'
                    }
                ],
                order: [
                    ['id', 'ASC']
                ],
                offset, limit,
                distinct: true,
            })
            return employes;
        }
        else {

            let employes = await Employes.findAndCountAll({
                include: [
                    {
                        model: Stores,
                        as: 'stores'
                    }
                ],
                order: [
                    ['id', 'ASC']
                ],
                offset, limit
            })
            return employes;
        }
    } catch (e) {
        return res.status(400).json({ message: e.message })
    }

}

async function getListOfAStore(req, res, storeId) {
    try {
        let { limit, page, search } = req.query;
        limit = parseInt(limit);
        let offset = parseInt(page - 1);
        offset = (offset * limit);

        // let whereCondition = { role: { [Op.ne]: 'admin' }, };
        // if (search) {
        //     search = parseInt(search)
        //     whereCondition = { ...whereCondition, pin: search };
        // }
        if (search) {
            // search = parseInt(search)
            // whereCondition = { ...whereCondition, pin: search };
            search = '%' + search + '%'
            let employes = await Employes.findAndCountAll({
                where: {
                    [Op.and]: [{
                        store_id: storeId
                    },
                    {
                        [Op.or]: [
                            {
                                firstName: {
                                    [Op.like]: search
                                }
                            },
                            {
                                lastName: {
                                    [Op.like]: search
                                }
                            },
                            {
                                email: {
                                    [Op.like]: search
                                }
                            },
                            {
                                contactNo: {
                                    [Op.like]: search
                                }
                            },
                            // {
                            //     role: {
                            //         [Op.like]: search
                            //     }
                            // }
                        ]
                    }]

                },
                include: [
                    {
                        model: Stores,
                        as: 'stores'
                    }
                ],
                order: [
                    ['id', 'ASC']
                ],
                offset, limit
            })
            return employes;
        }
        else {

            let employes = await Employes.findAndCountAll({
                include: [
                    {
                        model: Stores,
                        as: 'stores'
                    }
                ],
                order: [
                    ['id', 'ASC']
                ],
                offset, limit
            })
            return employes;
        }
    } catch (e) {
        return res.status(400).json({ message: e.message })
    }

}

async function updateEmployePin(employe_id, pin, res) {
    try {
        return await Employes.update({
            pin: pin
        }, {
            where: {
                id: employe_id
            }
        })
    } catch (e) {
        return res.status(400).json({ message: e.message })
    }
}
module.exports = {
    getEmployeByContact,
    genrateEmpoyePin,
    getEmployeByPin,
    getEmployeByEmail,
    createEmploye,
    getEmployeById,
    updateEmploye,
    updateEmployePin,
    getStoreById,
    getList,
    getListOfAStore,
    getEmployeByEmailInUpdate
}