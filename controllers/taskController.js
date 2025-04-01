const User = require('../models/userSchema')
const Task = require('../models/taskSchema')
const Wallet = require('../models/walletSchema')


const joinTwitter = async (req, res) => {
    try {
        
        const fingerPrint = req.session.fingerPrint || req.session.newFingerPrint

        let userId = await User.findOne({ userFingerPrint: fingerPrint })
        userId = userId._id;

        const findTask = await Task.findOne(
            { user: userId }, 

        )

        if (findTask.isXMember) return;

        await Task.updateOne(
            { user: userId }, 
            { $set: { isXMember: true }}
        )

        await Task.updateOne(
            { user: userId }, 
            { $inc: { taskEarnings: 2000 }}
        )

        await Wallet.updateOne(
            { user: userId },
            { $inc: { totalTokens: 2000 } }
        )

        res.status(200).json({ success: true, message: 'Succefully user joined the twitter! '})

    } catch (error) {
        console.log('Error while user joining the twitter: ', error);
    }
}


const joinTelegam = async (req, res) => {
    try {
        
        const fingerPrint = req.session.fingerPrint || req.session.newFingerPrint

        let userId = await User.findOne({ userFingerPrint: fingerPrint })
        userId = userId._id;

        const findTask = await Task.findOne(
            { user: userId }
        )
        if (findTask.isTelegramMember) return;

        await Task.updateOne(
            { user: userId }, 
            { $set: { isTelegramMember: true }}
        )

        await Task.updateOne(
            { user: userId }, 
            { $inc: { taskEarnings: 2000 }}
        )

        await Wallet.updateOne(
            { user: userId },
            { $inc: { totalTokens: 2000 } }
        )

        res.status(200).json({ success: true, message: 'Succefully user joined the telegram! '})

    } catch (error) {
        console.log('Error while user joining the twitter: ', error);
    }
}

module.exports = {
    joinTwitter,
    joinTelegam
}