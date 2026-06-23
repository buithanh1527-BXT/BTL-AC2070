const express = require('express');
const router = express.Router();
const commentController = require('../controllers/commentController');

router.get('/book/:bookId', commentController.getCommentsByBook);
router.post('/', commentController.addComment);

module.exports = router;
