const mongoose = require("mongoose")

const sellerSchema = new mongoose.Schema(
    {
        // title: {
        //     type: String,
        //     required: true,
        //     enum: ["Mr", "Mrs", "Miss"],
        //     trim: true
        // },
        name: {
            type: String,
            required: true,
            trim: true
        },
        phone: {
            type: String,
            required: true,
            trim: true,
            unique: true
        },
        email: {
            type: String,
            required: true,
            trim: true,
            unique: true
        },
        password: {
            type: String,
            required: true,
            trim: true
        },
        address: {
            type: String,
            trim: true
        },
    }, { timestamps: true }
)

module.exports = mongoose.model("Seller", sellerSchema)