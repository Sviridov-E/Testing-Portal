module.exports = (req, res, next) => {
  if(!req.isAdmin) {
    return res.status(401).json({message: 'Запрещенный раздел'})
  }
  next();
}