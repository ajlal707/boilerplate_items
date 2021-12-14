let Validator = require('validator');
let isEmpty = require('lodash/isEmpty');

function validateEmployeCreateInputes(data) {
    const errors = {};

    if (!data.firstName || Validator.isEmpty(data.firstName)) {
        errors.firstName = 'This field is required';
    }
    if (!data.lastName || Validator.isEmpty(data.lastName)) {
        errors.lastName = 'This field is required';
    }
    if (!data.email || Validator.isEmpty(data.email)) {
        errors.email = 'This field is required';
    }
    if (!errors.email && !Validator.isEmail(data.email)) {
        errors.email = 'Invalid email address';
    }
    if (!data.contactNo) {
        errors.contactNo = 'This field is required';
    }
    if (!errors.role && ['store manager', 'cashier', 'back office', 'admin'].indexOf(data.role) == -1) {
        errors.role = 'role value must be: store manager, cashier or back office';
    }
    if (!data.password) {
        errors.password = 'This field is required';
    }

    return {
        errors,
        isValid: isEmpty(errors),
    };
}

function validateEmployeUpdateInputes(data) {
    const errors = {};

    if (data.firstName && Validator.isEmpty(data.firstName)) {
        errors.firstName = 'firstName must not be empty.';
    }
    if (data.lastName && Validator.isEmpty(data.lastName)) {
        errors.lastName = 'lastName must not be empty.';
    }
    if (data.email && Validator.isEmpty(data.email)) {
        errors.email = 'email must not be empty.';
    }
    if (data.email && !Validator.isEmail(data.email)) {
        errors.email = 'Invalid email address';
    }
    if (data.contactNo && Validator.isEmpty(data.contactNo)) {
        errors.contactNo = 'contactNo must not be empty.';
    }
    if (data.role && ['store manager', 'cashier', 'back office'].indexOf(data.role) == -1) {
        errors.role = 'role value must be: store manager, cashier or back office';
    }
    

    return {
        errors,
        isValid: isEmpty(errors),
    };
}

module.exports = {
    validateEmployeCreateInputes,
    validateEmployeUpdateInputes
}