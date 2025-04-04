const Referral = require("../models/referralSchema");
const Wallet = require('../models/walletSchema')

const checkReferral = async (req, res, next) => {
    try {
        let referralId = req.query.referral
        if (!referralId) {
            next()
            return;
        }

        referralId = `https://indus-ten.vercel.app/?referral=${referralId}`

        console.log('ref id: ', referralId);
        
        const findUserId = await Referral.findOne({ referralLink: referralId }, { user: true })
        console.log('user id in referral: ', findUserId);
        
        if (req.session.fingerPrint) {
            next()
            return;
        }

        await Referral.updateOne(
            { user: findUserId.user },
            { $inc: { totalReferrals: 1 }})
        
        await Referral.updateOne(
                { user: findUserId.user },
                { $inc: { referralEarnings: 3000 }})
        
        await Wallet.updateOne(
            { user: findUserId.user },
            { $inc: { totalTokens: 3000 }}
        )

        next();

    } catch (error) {
        console.log('Error while checking the referral: ', error);
    }
}

module.exports = {
    checkReferral
}