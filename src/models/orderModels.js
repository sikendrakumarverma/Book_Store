const mongoose = require("mongoose")
//const ObjectId = mongoose.Schema.Types.ObjectId

const orderSchema = new mongoose.Schema({

    bookName: {
        type: String,
        required: true
    },
    // orderedAt: {
    //     type: Date,
    //     required: true
    // },
    bookPrice: {
        type: Number,
        required: true
    },
    cancellable: {
        type: Boolean, 
        default: true
    },
    status: {
        type: String, 
        default: 'pending', 
        enum: ["pending", "completed", "cancled"]
    },
    isDeleted: {
        type: Boolean,
        default: false
    },
    deletedAt: {
        type: String
    }
},{timestamps:true})

module.exports = mongoose.model("Order", orderSchema)