var express = require('express');
var router = express.Router();
var answerController = require('../controllers/answerController')
var auth = require('../helpers/auth')

/* GET users listing. */
// router.get('/', answerController.getAll);
router.get('/:answerid', answerController.getOneAnswer);
router.post('/:productid', auth.isLogin, answerController.createNewAnswer);
router.put('/:answerid/upvote', auth.isLogin, answerController.upvoteAnswer);
router.put('/:answerid/downvote', auth.isLogin, answerController.downvoteAnswer);
router.delete('/:answerid', auth.isLogin, auth.isAnswerCreatorAuth, answerController.deleteOneAnswer);

module.exports = router;
