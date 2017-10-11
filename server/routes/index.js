var express = require('express');
var router = express.Router();
var userController = require('../controllers/userController')
var auth = require('../helpers/auth')

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

router.post('/signup', userController.signUp)
router.post('/signin', userController.signIn)
router.post('/pemecahtoken', userController.pemecahToken)
router.get('/getall', auth.isLogin, auth.isAdmin, userController.getAllUser)
router.delete('/:id', auth.isLogin, auth.isAdmin, userController.removeUser)
router.put('/editUser/:id', auth.isLogin, auth.isAdmin, userController.editUser)

module.exports = router;
