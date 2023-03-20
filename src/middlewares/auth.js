const jwt = require("jsonwebtoken");
const bookModels = require("../models/bookModels");
const userModels = require("../models/sellerModels");
const { JWT_SECRET } = require('../config/keys')
const { isValidObjectId, isPresent } = require("./validations");


const authenticate = function (req, res, next) {
  try {
    let token = req.headers[`x-api-key`];
    if (!token) return res.status(400).send({ status: false, message: "Please set token in header" });
    let decodedToken = jwt.verify(token, JWT_SECRET, { ignoreExpiration: true }, function (error, done) {
      if (error) {
        return res.status(401).send({ status: false, message: "Token is Invalid" });
      }
      return done;
    })

    if (decodedToken.exp < Date.now() / 1000) return res.status(400).send({ status: false, message: "Token is Expired, Please relogin" });

    req.decodedToken = decodedToken.sellerId
    next()
  } catch (error) {
    return res.status(500).send({ status: false, message: error.message })
  }

}

const authorize = async function (req, res, next) {
  try {
    let loggedUserId = req.decodedToken
    let paramBookId = req.params.bookId

    if (!paramBookId) return res.status(400).send({ status: false, message: "Please enter bookId in params" })
    if (!isValidObjectId(paramBookId)) return res.status(400).send({ status: false, message: "bookId is not correct" });
    let checkBook = await bookModels.findById(paramBookId)
    if (!checkBook) return res.status(404).send({ status: false, message: "Book is not found" });
    if (checkBook.sellerId != loggedUserId) return res.status(400).send({ status: false, message: "Login user is not allowed to change the data of another user" });

    next()

  } catch (error) {
    return res.status(500).send({ status: false, message: error.message })
  }
}


module.exports = { authenticate, authorize }