const express = require('express');
const crypto = require('crypto');
const User = require('../models/userSchema');
const Wallet = require('../models/walletSchema');
const Task = require('../models/taskSchema');
const Referral = require('../models/referralSchema');
const axios = require('axios');

const generateFingerprint = (req) => {
    const userData = req.headers['user-agent'] + req.ip;
    return crypto.createHash('sha256').update(userData).digest('hex');
};


const generateReferralLink = () => {
    const referralCode = crypto.randomBytes(4).toString('hex');
    return `https://indus-ten.vercel.app/?referral=${referralCode}`
}

const getUserLocation = async (ip) => {
  try {
    const response = await axios.get(`https://ipwho.is/${ip}`);
    if (response.data.success) {
      return response.data;
    }
    return null;
  } catch (err) {
    console.error('GeoIP lookup failed:', err);
    return null;
  }
};


const userAuth = async (req, res, next) => {
    try {
        const fingerprint = generateFingerprint(req);
        const ip = req.ip
        const locationData = await getUserLocation(ip)

        console.log('location data: ', locationData);
        
        let user = await User.findOne({ 
            userFingerPrint: fingerprint,
        });

        if (!user) {

            console.log('user ip address: ', req.ip);
            user = new User({ 
                userFingerPrint: fingerprint,
                userIp: req.ip,
                city: locationData.city,
                region: locationData.region,
                country: locationData.country,
                continent: locationData.continent,
                latitude: locationData.latitude,
                longitude: locationData.longitude,
                timezone: locationData.timezone,
                isp: locationData.connection?.isp,
            });

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
