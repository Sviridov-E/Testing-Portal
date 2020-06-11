const jwt = require('jsonwebtoken');
const config = require('config');

module.exports = (req, res, next) => {
  if(req.method === 'OPTIONS'){
    return next();
  }
  try {
    const token = req.headers.authorization.split(' ')[1];

    if(!token) {
      return res.json({message: 'Защищенный раздел, вы не авторизованы'});
    }

    const decoded = jwt.verify(token, config.get('secret'));
    req.isAdmin = decoded.isAdmin;
    req.userId = decoded.userId;
    next();
  } catch (e) {
    res.status(401).json({message: 'Ошибка при верификации токена', addition: e.message});
  }
}