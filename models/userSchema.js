const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    userFingerPrint: {
        type: String,
        required: true,
        unique: true
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
