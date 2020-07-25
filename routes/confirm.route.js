const Confirm = require('../models/Confirm');
const User = require('../models/User');
const { Router } = require('express');

const router = Router();

router.get('/:hash', async (req, res) => {
    try {
        const hash = req.params.hash;
        
        const confirm = await Confirm.findOne({hash}, 'email');
        await confirm.remove();
        await User.findOneAndUpdate({email: confirm.email}, {active: true});

        res.json({success: true});
    } catch(e) {
        console.log('Confirm error: ', e.message);
        res.json({success: false, message: e.message});
    }
})

module.exports = router;
