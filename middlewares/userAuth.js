const express = require('express');
const crypto = require('crypto');
const User = require('../models/userSchema');
const Wallet = require('../models/walletSchema');
const Task = require('../models/taskSchema');
const Referral = require('../models/referralSchema');

const generateFingerprint = (req) => {
    const userData = req.headers['user-agent'] + req.ip;
    return crypto.createHash('sha256').update(userData).digest('hex');
};


const generateReferralLink = () => {
    const referralCode = crypto.randomBytes(4).toString('hex');
    return `localhost:3000?referral=${referralCode}`
}

const userAuth = async (req, res, next) => {
    try {
        const fingerprint = generateFingerprint(req);

        let user = await User.findOne({ userFingerPrint: fingerprint });

        if (!user) {
            user = new User({ userFingerPrint: fingerprint });

            const wallet = new Wallet({ user: user._id });
            const task = new Task({ user: user._id });
            const referral = new Referral({ user: user._id });

            const referralLink = generateReferralLink()
            referral.referralLink = referralLink;

            await wallet.save();
            await task.save();
            await referral.save();

            user.wallet = wallet._id;
            user.tasks = task._id;
            user.referrals = referral._id;
            await user.save();

            req.session.newFingerPrint = user.userFingerPrint;

            next()
            return;

        }

        console.log('Existing user fingerprint:', user.userFingerPrint);

        req.session.fingerPrint = user.userFingerPrint;
        next();

    } catch (error) {
        console.log('Error while authenticating the user:', error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
};

module.exports = {
    userAuth
};
