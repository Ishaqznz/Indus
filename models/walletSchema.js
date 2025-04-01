const mongoose = require('mongoose');

const walletSchema = new mongoose.Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    isWalletConnected: {
        type: Boolean,
        default: false
    },
    totalTokens: {
        type: Number,
        default: 1000
    }
});

const Wallet = mongoose.model('Wallet', walletSchema);
module.exports = Wallet;
