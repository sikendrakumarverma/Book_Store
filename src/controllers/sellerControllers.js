const sellerModel = require("../models/sellerModels")
const { isPresent, isValidEmail, isValidPassword, isValidName, isValidPhone } = require("../middlewares/validations")
const jwt = require('jsonwebtoken');
const {JWT_SECRET} = require('../config/keys.js');
//const moment = require('moment')
const createSellers = async function (req, res) {
    try {
        let data = req.body;
        let { name, phone, email, password, address } = data;

        if (Object.keys(data).length == 0) return res.status(400).send({ status: false, message: "Data is mandatory" });

        // ----->> name validation <<-----

        if (!isPresent(name)) return res.status(400).send({ status: false, message: "Please enter name" })
        if (!isValidName(name)) return res.status(400).send({ status: false, message: "Name should be in alphabets" })
        data.name = name;

        // ----->> phone validation <<-----
        if (!isPresent(phone)) { return res.status(400).send({ status: false, message: "Please provide the phone no." }) }
        if (!isValidPhone(phone)) { return res.status(400).send({ status: false, message: "Please provide valid phone number" }) }
        let phoneNoCheck = await sellerModel.findOne({ phone: phone })
        if (phoneNoCheck) { return res.status(400).send({ status: false, message: "This phone number is already registerd" }) }
        data.phone = phone;

        // ----->> email validation <<-----
        if (!isPresent(email)) { return res.status(400).send({ status: false, message: "Please provide the email" }) }
        if (!isValidEmail(email)) { return res.status(400).send({ status: false, message: "Please provide valid email" }) }
        let emailCheck = await sellerModel.findOne({ email: email })
        if (emailCheck) { return res.status(400).send({ status: false, message: "This email is already registerd" }) }
        data.email = email;

        // ----->> password validation <<-----
        if (!isPresent(password)) { return res.status(400).send({ status: false, message: "Please provide the password" }) }
        if (!isValidPassword(password)) { return res.status(400).send({ status: false, message: "Password must have Upper Case, Lower Case, Numbers, special characters" }) }
        data.password = password;

        // ----->> address validation <<-----
        if (!isPresent(address)) return res.status(400).send({ status: false, message: "Please enter address" })
        if (!isValidName(address)) return res.status(400).send({ status: false, message: "Address should be in alphabets" })
        data.address = address;

        const createdData = await sellerModel.create(data)
        return res.status(201).send({ status: true, message: "Seller registered successfully", data: createdData })

    }
    catch (err) {
        return res.status(500).send({ message: err.message })
    }
}

const login = async function (req, res) {
    try {
        let { email, password } = req.body;
        if (Object.entries(req.body).length === 0) {
            return res.status(400).send({ status: false, message: "Please enter email and Password" })
        }
        if (!isPresent(email)) {
            return res.status(400).send({ status: false, message: "Please enter email" })
        }
        if (!isPresent(password)) {
            return res.status(400).send({ status: false, message: "Please enter Password" })
        }
        if (isValidEmail(email) == false) {
            return res.status(400).send({ status: false, message: "Please enter correct Email" })
        }
        if (!isValidPassword(password)) {
            return res.status(400).send({ status: false, message: "Please enter correct Password" })
        }
        const correctPass = await sellerModel.findOne({ password });
        if (!correctPass) {
            return res.status(400).send({ status: false, message: "invalid password" });
        }
        let seller = await sellerModel.findOne(req.body);
        if (!seller) {
            return res.status(404).send({ status: false, message: "invalid login credentials" })
        }
        //let expiration = '7d'
        let token = jwt.sign({ sellerId: seller["_id"] }, JWT_SECRET, { expiresIn: "2h" })

        //res.headers("x-api-key", token);
        // let tokenData = {
        //     token: token,
        //     userId: user._id,
        //     iat: moment(),
        //     exp: expiration
        // }
        return res.status(200).send({ status: true, message: "Login Successfull", data: {sellerId: seller._id, token: token } })
    } catch (error) {
        return res.status(500).send({ status: false, message: error.message })
    }
}
module.exports = { createSellers, login }
