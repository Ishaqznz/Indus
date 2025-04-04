const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    userFingerPrint: {
        type: String,
        required: true,
        unique: true
    },
    
    userIp: {
        type: String,
    },

    city: {
        type: String
    },

    region: {
        type: String
    },

    country: {
        type: String
    },

    continent: {
        type: String,
    },

    latitude: {
        type: String
    },

    longitude: {
        type: String
    },

    timeZone: {
        type: String
    },

    isp: {
        type: String
    },

    wallet: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Wallet'
    },
    
    tasks: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Task'
    },
    referrals: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Referral'
    }
});

const User = mongoose.model('User', userSchema);
module.exports = User;
