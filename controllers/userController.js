const User = require("../models/userSchema");


const loadHome = async (req, res) => {
    try {

        const fingerPrint = req.session.fingerPrint || req.session.newFingerPrint;
        const userData = await User.findOne({ userFingerPrint: fingerPrint })
        .populate('wallet')
        .populate('tasks')
        .populate('referrals')

        console.log('user datas: ', userData);

        res.render('user/index', { userData })
        
    } catch (error) {
        console.log('Error while loading the home page: ', error);
    }
}

module.exports = {
    loadHome
}