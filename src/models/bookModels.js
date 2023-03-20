const mongoose = require("mongoose")
const ObjectId = mongoose.Schema.Types.ObjectId

const booksSchema = new mongoose.Schema(
    {
        name: {
            type: String,
            required: true,
            unique: true,
            trim: true
        },
        price: {
            type: Number,
            required: true
        },
        sellerId: {
            type: ObjectId,
            required: true,
            ref: "Seller"
        },
        reviews: {
            type: Number,
            default: 0,
        },

        isDeleted: {
            type: Boolean,
            default: false
        },

        deletedAt: {
            type: String,
        },

        releasedAt: {
            type: String,
            required: true
        },
        bookCover:{
            type:String
        }
    },
    { timestamps: true }

)
module.exports = mongoose.model("Book", booksSchema)