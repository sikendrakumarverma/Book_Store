// const cloudinary = require('cloudinary');
// const getDataUri= require('../aws_connection/dataUri');
const bookModels = require("../models/bookModels");
const { uploadFile } = require("../aws_connection/aws")


const { isPresent, isValidObjectId, isValidDate, isValidName } = require("../middlewares/validations");


const createBooks = async function (req, res) {
    try {
        const sellerId = req.decodedToken
        let { name, price, releasedAt } = req.body;
        const data = {};
        if (!isPresent(name)) return res.status(400).send({ status: false, message: "Please enter name" })
        if (!isValidName(name)) return res.status(400).send({ status: false, message: "Name should be in alphabets" })
        let checkName = await bookModels.findOne({ name: name })
        if (checkName) return res.status(400).send({ status: false, message: "The Same name book is already present" })
        data.name = name;

        if (!price) {
            return res.status(400).send({ status: false, message: "Please enter price" })
        }
        price = parseInt(price)

        // if (!/^[-\\+]?\s*((\d{1,3}(,\d{3})*)|\d+)(\.\d{2})?$/.test(price)) return "price should only decimal number or number "
        data.price = price

        data.sellerId = sellerId;

        if (!isPresent(releasedAt)) return res.status(400).send({ status: false, message: "Please enter release date" })
        if (!isValidDate(releasedAt)) return res.status(400).send({ status: false, message: "Date format should be in (YYYY-MM-DD)" })
        data.releasedAt = releasedAt;

        //For cloudinary Upload

        // let file = req.files
        // console.log(file)
        // if (file && file.length > 0) {
        //     const fileUri= getDataUri(file);
        //     //console.log(fileUri)

        //     let cloudUrl = await cloudinary.uploader.upload(fileUri.content, (result,err) =>{
        //         console.log(result)
        //         if(err) return res.status(400).send({ status: false, message: err });
        //         data.bookCover = result.secure_url
        //     })

        //     // cloudUrl.then((urlData) => {
        //     //     console.log(urlData);
        //     //     console.log(urlData.secure_url);
        //     //     data.bookCover = urlData.secure_url
        //     // }).catch((err) => {
        //     //     console.log(err);
        //     // });
        // }

        //For AWS Upload
        let files = req.files
        console.log(files)
        if (files && files.length > 0) {

            let uploadedFileURL = await uploadFile(files[0])
            data.bookCover = uploadedFileURL
        }
        let book = await bookModels.create(data)

        return res.status(201).send({ status: true, message: "Book added successfully", data: book })


    } catch (error) {
        return res.status(500).send({ status: false, message: error.message })
    }
}

const getBooks = async (req, res) => {
    try {
        let findData = req.query;
        //console.log(findData)
        const { name } = findData
        if (Object.keys(findData).length === 0) {
            let bookDetails = await bookModels.find({ isDeleted: false }).sort({ price: 1 })
            if (bookDetails.length == 0) return res.status(404).send({ status: false, message: "No books found" });
            return res.status(200).send({ status: true, message: "all Books list", "no. of books": bookDetails.length, data: bookDetails });
        }
        if (name === '' || name == "null") {
            return res.status(400).send({ status: false, message: "Please enter name " })
        }



        let bookDetails = await bookModels.find({ name: { $regex: name } }).sort({ price: 1 })
        if (bookDetails.length == 0) return res.status(404).send({ status: false, message: "No books found" });
        return res.status(200).send({ status: true, message: "All Books list", "totalBooks": bookDetails.length, data: bookDetails });

    } catch (err) {
        return res.status(500).send({ status: false, message: err.message });
    }
};



module.exports = { createBooks, getBooks }