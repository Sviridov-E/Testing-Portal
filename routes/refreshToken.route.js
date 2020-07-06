const jwt = require('jsonwebtoken');
const config = require('config');
const { Router } = require('express');

const router = new Router();

router.get('/', async (req, res) => {
    
    const token = req.headers.authorization.split(' ')[1];
    if(!token) {
        return res.status(500).json({message: 'Отсутсвует токен обновления'});
    }
    try {
        const { userId, isAdmin } = jwt.verify(token, config.get('refreshSecret'));
        
        const accessToken = jwt.sign(
            {
                userId,
                isAdmin
            },
            config.get('accessSecret'),
            {
                expiresIn: '6h'
            }
        );
        const refreshToken = jwt.sign(
            {
                userId,
                isAdmin
            },
            config.get('refreshSecret'),
            {
                expiresIn: '14 days'
            }
        );
        
        res.json({userId, accessToken, refreshToken, isAdmin});
        
    } catch(e) {
        if(e.message === 'jwt expired') {
            return res.json({message: e.message});
        }
        res.status(500).json({message: e.message});
    }
})

module.exports = router;