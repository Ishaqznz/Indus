const mongoose = require('mongoose');

const referralSchema = new mongoose.Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },

    referralEarnings: {
        type: Number,
        default: 0
    },

    totalReferrals: {
        type: Number,
        default: 0
    },
    referralLink: {
        type: String
    }
});

const Referral = mongoose.model('Referral', referralSchema);
module.exports = Referral;
