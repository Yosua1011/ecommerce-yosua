var express = require('express');
var router = express.Router();
var transactionController = require('../controllers/transactionController')
var auth = require('../helpers/auth')

router.post('/', auth.isLogin, transactionController.addTransaction)
router.get('/', auth.isLogin, transactionController.getAllTransaction)
router.get('/:customerid', auth.isLogin, transactionController.getSpesificTransaction)
router.delete('/:id', auth.isLogin, transactionController.removeOneTransaction)

module.exports = router;
