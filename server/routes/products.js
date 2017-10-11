var express = require('express');
var router = express.Router();
var productController = require('../controllers/productController')
var auth = require('../helpers/auth')

/* GET users listing. */
router.get('/', productController.getAll);
router.get('/:slug', productController.getOne);
router.post('/post', auth.isLogin, productController.createNew);
router.put('/:id', auth.isLogin, productController.editOne);
router.delete('/:id', auth.isLogin, auth.isProductAuthorAuth, productController.deleteOne);
router.put('/:slug/upvote', auth.isLogin, productController.upvoteQuestion);
router.put('/:slug/downvote', auth.isLogin, productController.downvoteQuestion);

module.exports = router;
