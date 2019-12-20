const mongoose = require('mongoose')
const validator = require('validator')

const tradeSchema = new mongoose.Schema({
    id: {
        type: String,
        required: true,
        unique: true
    },
    type: {
        type: String,
        required: true
    },
    user: [{
        id: {
            type: String,
            required: true
        },
        name: {
            type: String,
            required: true
        }
    }],
    symbol: {
        type: String,
        required: true
    },
    shares: {
        type: String,
        required: true
    },
    price: {
        type: Number,
        required: true
    },
    timestamp: {
        type: Date,
        default: Date.now
    }
})

const Trade = mongoose.model('Trade', tradeSchema)

module.exports = Trade