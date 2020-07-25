const { Router } = require('express');
const adminCheck = require('../middleware/adminCheck.middleware');

const router = Router();

router.get('/(:testId)?', adminCheck, async (req, res) => {
  try {
    const testId = req.params.testId;
    let calculator;
    if(!testId) {
      calculator = require('../calculator/chartDataGeneral');
    } else {
      calculator = require(`../calculator/chartData${testId}`);
    }
    const diagram = await calculator();
    res.json(diagram);
  } catch(e) {
    res.status(500).json({message: `Ошибка при получении графиков`, error: e.message});
    console.log(e);    
  }
});

module.exports = router;
