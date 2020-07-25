const crypto = require('crypto');
const config = require('config');

module.exports = (req, res, next) => {
    const salt = config.get('confirmSalt');
    const email = req.body.email;

    req.confirmHash = crypto.createHmac('sha256', email+salt).digest('hex');
    next();
}