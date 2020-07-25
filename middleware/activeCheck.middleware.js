const User = require('../models/User');

module.exports = async (req, res, next) => {
    try {
        const userId = req.userId;

        const { active } = await User.findById(userId, 'active');

        if(!active){
            return res.json({notActive: true});
        }
        next();
    } catch(e) {
        console.log('Active Check Middleware Error: ', e.message);
        return res.json({message: `Active Check Middleware Error: ${e.message}`});
    }
}