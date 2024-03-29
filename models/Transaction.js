const mongoose = require('mongoose');


//schema
const TransactionSchema = new mongoose.Schema({
    text:{
        type: String,
        trim: true,
        required: [true, 'Please add some text']
    },
    amount: {
        type: Number,
        required: [true, 'please add a positive or negative number']
    },
    createdAt:{
        type: Date,
        default: Date.now
    }
});

module.exports = mongoose.model('Transaction',TransactionSchema)