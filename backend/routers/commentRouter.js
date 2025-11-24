const express = require('express');
const verifyToken = require('../middlewares/verifyToken');
const commentController = require('../controllers/commentController');

const router = express.Router();

// Routes
router.get('/', commentController.getAllComments);
router.get('/post/:postId', commentController.getCommentsByPostId);
router.post('/', verifyToken, commentController.createComment);
router.put('/:id', verifyToken, commentController.updateComment);
router.delete('/:id', verifyToken, commentController.deleteComment);
// router.put('/:id/like', verifyToken, commentController.toggleLikeComment);

module.exports = router;
