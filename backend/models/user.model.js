const { Schema, model } = require('mongoose');

const userSchema = new Schema({
    _id: String,
    username: {
        type: String,
        required: true
    },
    fiscalCode: {
        type: String,
        required: true
    },
    city: {
        type: String,
        required: true
    },
    region: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    },
    electricUsage: [{
        usage: Number,
        insertionDate: Date,
        cost: Number
    }],
    heatUsage: [{
        usage: Number,
        insertionDate: Date,
        cost: Number
    }],
    waterUsage: [{
        usage: Number,
        insertionDate: Date,
        cost: Number
    }]
});


const User = model('users', userSchema);

module.exports = User;