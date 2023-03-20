const mongoose = require("mongoose")

const isPresent = function (value) {
    if (typeof value === 'undefined' || value === null) return false
    if (typeof value === 'string' && value.trim().length === 0) return false
    return true
}

const isValidName = function (name) {
    const nameRegex = /^[a-zA-Z ]{2,30}$/
    return nameRegex.test(name)
}

const isValidPhone = function (phone) {
    var re = /^((\+91)?|91)?[6-9][0-9]{9}$/;
    return re.test(phone);
}

const isValidEmail = function (email) {
    const emailRegex = /^[a-z0-9][a-z0-9-_\.]+@([a-z]|[a-z0-9]?[a-z0-9-]+[a-z0-9])\.[a-z0-9]{2,10}(?:\.[a-z]{2,10})?$/
    return emailRegex.test(email)
}

const isValidPassword = function (password) {
    var passRegex = new RegExp("^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#\$%\^&\*])(?=.{8,15})");
    return passRegex.test(password)
}

const isValidObjectId = function (id) {
    var ObjectId = mongoose.Types.ObjectId;
    return ObjectId.isValid(id)
}

const isValidDate = function (date) {
    const dateRegex = /([12]\d{3}-(0[1-9]|1[0-2])-(0[1-9]|[12]\d|3[01]))/;
    return dateRegex.test(date)
}

module.exports = {
    isValidName,
    isValidPhone,
    isValidEmail,
    isValidPassword,
    isValidObjectId,
    isPresent,
    isValidDate,
    
}